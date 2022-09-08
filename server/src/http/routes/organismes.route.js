import express from "express";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import Joi from "joi";
import { validateRequestQuery } from "../middlewares/validateRequestQuery.js";
import { schema as uaiSchema } from "../../domain/uai.js";

export default ({ organismes }) => {
  const router = express.Router();

  router.get(
    "/",
    validateRequestQuery(Joi.object({ uai: uaiSchema.required() })),
    tryCatch(async (req, res) => {
      try {
        const organismesFound = await organismes.getOrganismesFromReferentiel(req.params.uai);
        return res.json({ organismes: organismesFound });
      } catch (err) {
        return res.json({ organismes: [], error: err });
      }
    })
  );

  return router;
};
