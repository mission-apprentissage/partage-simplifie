import { SignalementAnomalieFactory } from "../factory/signalementAnomalieFactory.js";
import { COLLECTIONS_NAMES } from "../model/collections/index.js";
import { dbCollection } from "../model/db/mongodbClient.js";

/**
 * Création d'un message de signalement d'anomalie
 * @param {*} param0
 * @returns
 */
const createSignalementAnomalie = async (email, message) => {
  const entity = SignalementAnomalieFactory.create({ email, message });
  if (entity === null) return null;

  const { insertedId } = await dbCollection(COLLECTIONS_NAMES.SignalementAnomalie).insertOne(entity);
  return insertedId;
};

export default () => ({ createSignalementAnomalie });
