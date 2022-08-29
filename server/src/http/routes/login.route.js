import express from "express";
import { logger } from "../../common/logger/logger.js";
import { config } from "../../../config/index.js";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import { packageJson } from "../../common/utils/esmUtils.js";
import { dbCollection } from "../../model/db/mongodbClient.js";
import { COLLECTIONS_NAMES } from "../../model/collections/index.js";

export default ({ users, userEvents }) => {
  const router = express.Router(); // eslint-disable-line new-cap

  router.post(
    "/",
    tryCatch(async (req, res) => {
      const { username, password } = req.body;
      const authenticatedUser = await users.authenticate(username, password);

      if (!authenticatedUser) return res.status(401).send();

      const token = createUserToken(authenticatedUser);

      await userEvents.create({ username, type: USER_EVENTS_TYPES.POST, action: USER_EVENTS_ACTIONS.LOGIN });
      return res.json({ access_token: token });
    })
  );

  return router;
};
