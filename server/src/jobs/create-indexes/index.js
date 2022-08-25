const logger = require("../../common/logger");
const { createIndexes, dropIndexes } = require("../../model/indexes/index");

module.exports.runCreateIndexes = async () => {
  logger.info("Drop all existing indexes...");
  await dropIndexes();

  logger.info("Create all indexes...");
  await createIndexes();

  logger.info("All indexes successfully created !");
};
