import express from "express";
import { USER_EVENTS_TYPES, USER_EVENTS_ACTIONS } from "../../common/constants/userEventsConstants.js";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import Joi from "joi";
import { validateRequestQuery } from "../middlewares/validateRequestQuery.js";
import { validateRequestBody } from "../middlewares/validateRequestBody.js";
export default ({ users, userEvents }) => {
  const router = express.Router();

  router.post(
    "/update-password",
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

  router.get(
    "/exist",
    validateRequestQuery(Joi.object({ email: Joi.string().email().required() })),
    tryCatch(async (req, res) => {
      try {
        const foundUser = await users.getUser(req.query.email);
        return res.json({ found: foundUser !== null });
      } catch (err) {
        return res.json({ found: false });
      }
    })
  );

  return router;
};
