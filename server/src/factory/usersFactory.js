import { logger } from "../common/logger/logger.js";
import Joi from "joi";
import { ROLES } from "../common/constants/roles.js";
import { BaseFactory } from "./baseFactory.js";

export class UsersFactory extends BaseFactory {
  /**
   * Crée une entité User à partir de props
   * @param {*} props
   * @returns
   */
  static create(props) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string()
        .valid(...Object.values(ROLES))
        .required(),
      nom: Joi.string().allow("", null),
      prenom: Joi.string().allow("", null),
      fonction: Joi.string().allow("", null),
      telephone: Joi.string().allow("", null),
      outils_gestion: Joi.array().items(Joi.string()).allow(null),
      nom_etablissement: Joi.string().allow("", null),
    });

    const { error } = schema.validate(props);

    if (error) {
      logger.error(error);
      return null;
    }

    return {
      ...props,
      created_at: new Date(),
      updated_at: null,
    };
  }
}

export default { UsersFactory };
