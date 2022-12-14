import Joi from "joi";
import { BaseFactory } from "./baseFactory.js";

export class SignalementAnomalieFactory extends BaseFactory {
  /**
   * Crée un message de signalement d'anomalie entité à partir de props
   * @param {*} props
   * @returns
   */
  static create(props) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      message: Joi.string().required(),
    });

    const { error } = schema.validate(props);
    if (error) return null;

    return {
      ...props,
      created_at: new Date(),
      updated_at: null,
    };
  }
}

export default { SignalementAnomalieFactory };
