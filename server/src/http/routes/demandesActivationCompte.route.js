import express from "express";
import Joi from "joi";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import { validateRequestBody } from "../middlewares/validateRequestBody.js";

export default ({ demandesActivationCompte }) => {
  const router = express.Router();

  router.post(
    "/",
    validateRequestBody(Joi.object({ email: Joi.string().email().required() })),
    tryCatch(async (req, res) => {
      const createdId = await demandesActivationCompte.createDemandeActivationCompte(req.body?.email);
      return res.json({ createdId });
    })
  );

  return router;
};
