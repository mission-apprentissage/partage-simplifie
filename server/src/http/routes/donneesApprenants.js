import express from "express";
import { USER_EVENTS_TYPES, USER_EVENTS_ACTIONS } from "../../common/constants/userEventsConstants.js";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import multer from "multer";
import path from "path";

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

      let uploadStatus = USER_EVENTS_ACTIONS.UPLOAD.INIT;
      let errors = [];

      try {
        let { uploadStatus, errors } = await donneesApprenantsService.importDonneesApprenantsFromXlsxBuffer(
          file?.buffer
        );
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
