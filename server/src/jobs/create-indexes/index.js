import { logger } from "../../common/logger/logger.js";
import { createIndexes, dropIndexes } from "../../model/indexes/index.js";

export const runCreateIndexes = async () => {
  logger.info("Drop all existing indexes...");
  await dropIndexes();

  logger.info("Create all indexes...");
  await createIndexes();

  logger.info("All indexes successfully created !");
};
