import { SignalerAnomalieFactory } from "../factory/signalerAnomalieFactory.js";
import { COLLECTIONS_NAMES } from "../model/collections/index.js";
import { dbCollection } from "../model/db/mongodbClient.js";

/**
 * Création d'une demande d'activation de compte
 * @param {*} param0
 * @returns
 */
const createSignalerAnomalie = async (email, message) => {
  const entity = SignalerAnomalieFactory.create({ email, message });
  if (entity === null) return null;

  const { insertedId } = await dbCollection(COLLECTIONS_NAMES.SignalerAnomalie).insertOne(entity);
  return insertedId;
};

export default () => ({ createSignalerAnomalie });
