import express from "express";
import { USER_EVENTS_TYPES, USER_EVENTS_ACTIONS } from "../../common/constants/userEventsConstants.js";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import Joi from "joi";
import { validateRequestBody } from "../middlewares/validateRequestBody.js";

export default ({ users, userEvents }) => {
  const router = express.Router();

  router.post(
    "/",
    validateRequestBody(
      Joi.object({
        token: Joi.string().required(),
        newPassword: Joi.string().min(16).required(),
      })
    ),
    tryCatch(async (req, res) => {
      try {
        const updatedUser = await users.updatePassword(req.body.token, req.body.newPassword);

        await userEvents.createUserEvent({
          username: updatedUser.email,
          type: USER_EVENTS_TYPES.POST,
          action: USER_EVENTS_ACTIONS.UPDATE_PASSWORD,
        });
        return res.json({ message: "success" });
      } catch (err) {
        return res.status(500).json({ message: "Could not update password" });
      }
    })
  );

  return router;
};
