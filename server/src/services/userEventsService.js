import { UserEventsFactory } from "../factory/userEventsFactory.js";
import { COLLECTIONS_NAMES } from "../model/collections/index.js";
import { dbCollection } from "../model/db/mongodbClient.js";

const create = async ({ username, type, data }) => {
  const userEventEntity = UserEventsFactory.create({ username, type, data });
  await dbCollection(COLLECTIONS_NAMES.UserEvents).insertOne(userEventEntity);
  return;
};

export default () => ({ create });
