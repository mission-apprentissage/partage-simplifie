import express from "express";
import { logger } from "../../common/logger/logger.js";
import { config } from "../../../config/index.js";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import { packageJson } from "../../common/utils/esmUtils.js";
import { dbCollection } from "../../model/db/mongodbClient.js";
import { COLLECTIONS_NAMES } from "../../model/collections/index.js";

export default () => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      let mongodbStatus;
      await dbCollection(COLLECTIONS_NAMES.UserEvents)
        .stats()
        .then(() => {
          mongodbStatus = true;
        })
        .catch((e) => {
          mongodbStatus = false;
          logger.error("Healthcheck failed", e);
        });

      return res.json({
        name: `Serveur MNA - ${config.appName}`,
        version: packageJson.version,
        env: config.env,
        healthcheck: {
          mongodb: mongodbStatus,
        },
      });
    })
  );

  return router;
};
