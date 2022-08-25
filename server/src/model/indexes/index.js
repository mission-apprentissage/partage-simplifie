const { COLLECTIONS_NAMES, COLLECTIONS_INDEXS } = require("../collections");
const { BaseIndexer } = require("./baseIndexer");

const createIndexes = async () => {
  await new BaseIndexer(COLLECTIONS_NAMES.UserEvents, COLLECTIONS_INDEXS.UserEvents).createIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.JobEvents, COLLECTIONS_INDEXS.JobEvents).createIndexs();
};

const dropIndexes = async () => {
  await new BaseIndexer(COLLECTIONS_NAMES.UserEvents, COLLECTIONS_INDEXS.UserEvents).dropIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.JobEvents, COLLECTIONS_INDEXS.JobEvents).dropIndexs();
};

module.exports = { createIndexes, dropIndexes };
