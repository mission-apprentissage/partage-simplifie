import express from "express";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import Joi from "joi";
import { validateRequestParams } from "../middlewares/validateRequestParams.js";
import { schema as uaiSchema } from "../../domain/uai.js";

export default ({ organismes }) => {
  const router = express.Router();

  router.get(
    "/:uai",
    validateRequestParams(Joi.object({ uai: uaiSchema.required() })),
    tryCatch(async (req, res) => {
      try {
        const organismesFound = await organismes.getOrganismesFromReferentiel(req.parmas.uai);
        return res.json({ organismes: organismesFound });
      } catch (err) {
        return res.json({ organismes: [], error: err });
      }
    })
  );

  return router;
};
