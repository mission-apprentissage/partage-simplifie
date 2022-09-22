import express from "express";
import { USER_EVENTS_TYPES, USER_EVENTS_ACTIONS } from "../../common/constants/userEventsConstants.js";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import multer from "multer";
import path from "path";

export default ({ userEvents }) => {
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

      let uploadStatus = USER_EVENTS_ACTIONS.UPLOAD.INIT;
      let errorMessages;

      try {
        // TODO REPLACE RANDOM INT FOR TESTS
        const getRandomInt = (max) => Math.floor(Math.random() * max);
        const randomInt = getRandomInt(2);

        if (randomInt > 0) {
          uploadStatus = USER_EVENTS_ACTIONS.UPLOAD.SUCCESS;
        } else {
          uploadStatus = USER_EVENTS_ACTIONS.UPLOAD.ERROR;
          errorMessages = ["erreur1", "erreur2"];
        }

        // TODO Handle XLSX Data
        return res.json({ message: uploadStatus });
      } catch (err) {
        return res.status(500).json({ message: "Could not upload file !" });
      } finally {
        await userEvents.createUserEvent({
          user_email: user.email,
          type: USER_EVENTS_TYPES.POST,
          action: uploadStatus,
          data: { ...file, buffer: file.buffer.toString(), errorMessages }, // ajout de toString au buffer pour stockage du fichier dans la base
        });
      }
    })
  );

  return router;
};
