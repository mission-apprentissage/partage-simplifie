import express from "express";
import { USER_EVENTS_TYPES, USER_EVENTS_ACTIONS } from "../../common/constants/userEventsConstants.js";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import { toUserApiOutput } from "../../model/api/userApiMapper.js";

export default ({ users, userEvents }) => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const { user } = req;

      const allUsers = await users.getAllUsers();
      const usersMapped = allUsers.map(toUserApiOutput);

      await userEvents.createUserEvent({
        username: user.username,
        type: USER_EVENTS_TYPES.GET,
        action: USER_EVENTS_ACTIONS.USERS.GET_ALL,
      });

      return res.json(usersMapped);
    })
  );

  return router;
};
