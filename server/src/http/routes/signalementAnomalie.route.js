import express from "express";
import Joi from "joi";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import { validateRequestBody } from "../middlewares/validateRequestBody.js";

export default ({ signalementAnomalie }) => {
  const router = express.Router();

  router.post(
    "/",
    validateRequestBody(Joi.object({ email: Joi.string().email().required(), message: Joi.string().required() })),
    tryCatch(async (req, res) => {
      const { email, message } = req.body;
      const createdId = await signalementAnomalie.createSignalementAnomalie(email, message);
      return res.json({ createdId });
    })
  );

  return router;
};
