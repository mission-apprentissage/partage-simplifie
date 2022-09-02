import express from "express";
import { USER_EVENTS_TYPES, USER_EVENTS_ACTIONS } from "../../common/constants/userEventsConstants.js";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import { createUserToken } from "../../common/utils/jwtUtils.js";

export default ({ users, userEvents }) => {
  const router = express.Router();

  router.post(
    "/",
    tryCatch(async (req, res) => {
      const { email, password } = req.body;
      const authenticatedUser = await users.authenticate(email, password);

      if (!authenticatedUser) {
        await userEvents.createUserEvent({
          username: email,
          type: USER_EVENTS_TYPES.POST,
          action: USER_EVENTS_ACTIONS.LOGIN.FAIL,
        });
        return res.status(401).send();
      }

      const token = createUserToken(authenticatedUser);
      await userEvents.createUserEvent({
        username: email,
        type: USER_EVENTS_TYPES.POST,
        action: USER_EVENTS_ACTIONS.LOGIN.SUCCESS,
      });

      return res.json({ access_token: token });
    })
  );

  return router;
};
