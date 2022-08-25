const { UserEventsFactory } = require("../factory/userEventsFactory");
const { COLLECTIONS_NAMES } = require("../model/collections");
const { dbCollection } = require("../model/db/mongodbClient");

const create = async ({ username, type, data }) => {
  const userEventEntity = UserEventsFactory.create({ username, type, data });
  await dbCollection(COLLECTIONS_NAMES.UserEvents).insertOne(userEventEntity);
  return;
};

module.exports = () => ({ create });
