import { BaseFactory } from "./baseFactory.js";
import { schema } from "../domain/donneesApprenants.js";

export class DonneesApprenantsFactory extends BaseFactory {
  /**
   * Crée une entité donnée apprenant à partir de props
   * @param {*} props
   * @returns
   */
  static create(props) {
    const { error } = schema.validate(props);
    if (error) return null;

    return {
      ...props,
      created_at: new Date(),
      updated_at: null,
    };
  }
}

export default { DonneesApprenantsFactory };
