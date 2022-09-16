import express from "express";
import { USER_EVENTS_TYPES, USER_EVENTS_ACTIONS } from "../../common/constants/userEventsConstants.js";
import { tryCatch } from "../middlewares/tryCatchMiddleware.js";
import { ROLES } from "../../common/constants/roles.js";
import { validateRequestBody } from "../middlewares/validateRequestBody.js";
import Joi from "joi";
import { schema as uaiSchema } from "../../domain/uai.js";
import { schema as siretSchema } from "../../domain/siret.js";

export default ({ users, userEvents }) => {
  const router = express.Router();

  router.post(
    "/",
    validateRequestBody(
      Joi.object({
        email: Joi.string().email().required(),
        uai: uaiSchema.required(),
        siret: siretSchema.required(),
        nom: Joi.string().required(),
        nom_etablissement: Joi.string().allow("", null),
        prenom: Joi.string().required(),
        fonction: Joi.string().required(),
        region: Joi.string().allow(null, ""),
        telephone: Joi.string().allow(null, ""),
        outils_gestion: Joi.array().items(Joi.string()).allow(null),
      })
    ),
    tryCatch(async (req, res) => {
      const { email, ...props } = req.body;

      await users.createUser({ ...props, role: ROLES.OF, email });

      await userEvents.createUserEvent({
        user_email: email,
        type: USER_EVENTS_TYPES.POST,
        action: USER_EVENTS_ACTIONS.REGISTER,
      });

      return res.json({ message: "success" });
    })
  );

  return router;
};
