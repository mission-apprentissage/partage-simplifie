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
        const organismesFound = await organismes.getOrganismesFromReferentiel(req.query.uai);
        // TODO choisir règle de gestion pour récupération depuis référentiel
        const organismeForUai = organismesFound?.length > 0 ? organismesFound[0] : null;

        return res.json({ organisme: organismeForUai });
      } catch (err) {
        return res.json({ organisme: null });
      }
    })
  );

  return router;
};
