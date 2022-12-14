import { logger } from "../common/logger/logger.js";
import Joi from "joi";
import { ROLES } from "../common/constants/roles.js";
import { BaseFactory } from "./baseFactory.js";
import { schema as uaiSchema } from "../domain/uai.js";
import { schema as siretSchema } from "../domain/siret.js";
import { schema as passwordSchema } from "../domain/password.js";

export class UsersFactory extends BaseFactory {
  /**
   * Crée une entité User à partir de props
   * @param {*} props
   * @returns
   */
  static create(props) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: passwordSchema.required(),
      role: Joi.string()
        .valid(...Object.values(ROLES))
        .required(),
      uai: uaiSchema.allow("", null),
      siret: siretSchema.allow("", null),
      nom: Joi.string().allow("", null),
      prenom: Joi.string().allow("", null),
      fonction: Joi.string().allow("", null),
      telephone: Joi.string().allow("", null),
      region: Joi.string().allow("", null),
      outils_gestion: Joi.array().items(Joi.string()).allow(null),
      nom_etablissement: Joi.string().allow("", null),
      adresse_etablissement: Joi.string().allow("", null),
    });

    const { error } = schema.validate(props);

    if (error) {
      logger.error(error);
      throw new Error(`Can't create user, schema not valid : ${error}`);
    }

    return {
      ...props,
      created_at: new Date(),
      updated_at: null,
    };
  }
}

export default { UsersFactory };
