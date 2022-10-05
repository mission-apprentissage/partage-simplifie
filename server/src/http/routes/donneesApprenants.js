import express from "express";
import { USER_EVENTS_TYPES, USER_EVENTS_ACTIONS } from "../../common/constants/userEventsConstants.js";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import multer from "multer";
import path from "path";
import { toDonneesApprenantsFromXlsx } from "../../model/api/donneesApprenantsXlsxMapper.js";
import { getFormattedErrors, getValidationResultFromList } from "../../domain/donneesApprenants.js";

export default ({ userEvents, donneesApprenantsService }) => {
  const router = express.Router();
  const ALLOWED_FILE_EXTENSION = ".xlsx";

  // Initialisation de multer et filtre sur l'extension
  const upload = multer({
    fileFilter: function (req, file, callback) {
      if (path.extname(file.originalname) !== ALLOWED_FILE_EXTENSION) {
        return callback(new Error("Only XLSX files are allowed"));
      }
      callback(null, true);
    },
  });

  router.post(
    "/upload",
    upload.single("donneesApprenantsFile"),
    tryCatch(async (req, res) => {
      const { user, file } = req;
      const { comment } = req.body;
      const userFields = {
        user_email: user?.email,
        user_uai: user?.uai,
        user_siret: user?.siret,
        user_nom_etablissement: user?.nom_etablissement,
      };

      let uploadStatus = USER_EVENTS_ACTIONS.UPLOAD.INIT;
      let errors = [];

      try {
        // Lecture & mapping des données du XLSX
        const donneesApprenantsXlsx = donneesApprenantsService.readDonneesApprenantsFromXlsxBuffer(file?.buffer);

        const donneesApprenants = donneesApprenantsXlsx.map((item) => ({
          ...toDonneesApprenantsFromXlsx(item),
          ...userFields,
        }));

        // Validation des données
        const validationResult = getValidationResultFromList(donneesApprenants);

        if (validationResult.error) {
          errors = getFormattedErrors(validationResult.error);
          uploadStatus = USER_EVENTS_ACTIONS.UPLOAD.ERROR;
        } else {
          // Si les données sont valides on écrase les données du user par celles ci
          await donneesApprenantsService.clearDonneesApprenantsForUserEmail(user?.email);
          await donneesApprenantsService.importDonneesApprenants(donneesApprenants);

          // On trace l'import et la liste des donneesApprenants importés
          await userEvents.createUserEvent({
            user_email: user.email,
            type: USER_EVENTS_TYPES.POST,
            action: USER_EVENTS_ACTIONS.UPLOAD.IMPORT,
            data: { donneesApprenants },
          });

          uploadStatus = USER_EVENTS_ACTIONS.UPLOAD.SUCCESS;
        }

        return res.json({ message: uploadStatus, errors });
      } catch (err) {
        uploadStatus = USER_EVENTS_ACTIONS.UPLOAD.ERROR;
        return res.status(500).json({ message: "Could not upload file !", errors });
      } finally {
        await userEvents.createUserEvent({
          user_email: user.email,
          type: USER_EVENTS_TYPES.POST,
          action: uploadStatus,
          data: { ...file, comment, buffer: file?.buffer?.toString(), errors }, // ajout de toString au buffer pour stockage du fichier dans la base
        });
      }
    })
  );

  return router;
};
