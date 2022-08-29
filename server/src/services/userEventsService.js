import { UserEventsFactory } from "../factory/userEventsFactory.js";
import { COLLECTIONS_NAMES } from "../model/collections/index.js";
import { dbCollection } from "../model/db/mongodbClient.js";

/**
 * Création d'un UserEvent
 * @param {*} param0
 * @returns
 */
const createUserEvent = async ({ username, type, data }) => {
  const userEventEntity = UserEventsFactory.create({ username, type, data });
  await dbCollection(COLLECTIONS_NAMES.UserEvents).insertOne(userEventEntity);
  return;
};

export default () => ({ createUserEvent });
