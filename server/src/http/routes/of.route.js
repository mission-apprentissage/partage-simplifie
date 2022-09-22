import express from "express";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";

export default ({ userEvents }) => {
  const router = express.Router();

  router.get(
    "/upload-history",
    tryCatch(async (req, res) => {
      try {
        const { user } = req;

        const uploadHistoryList = await userEvents.getUploadHistoryList({ user_email: user?.email });
        return res.json({ uploadHistoryList });
      } catch (err) {
        return res.json({ uploadHistoryList: [], error: err.message });
      }
    })
  );

  return router;
};
