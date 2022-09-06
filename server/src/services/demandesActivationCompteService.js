import { DemandesActivationCompteFactory } from "../factory/demandesActivationCompteFactory.js";
import { COLLECTIONS_NAMES } from "../model/collections/index.js";
import { dbCollection } from "../model/db/mongodbClient.js";

/**
 * Création d'une demande d'activation de compte
 * @param {*} param0
 * @returns
 */
const createDemandeActivationCompte = async (email) => {
  const entity = DemandesActivationCompteFactory.create({ email });
  if (entity === null) return null;

  const { insertedId } = await dbCollection(COLLECTIONS_NAMES.DemandesActivationCompte).insertOne(entity);
  return insertedId;
};

export default () => ({ createDemandeActivationCompte });
