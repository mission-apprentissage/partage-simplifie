import { COLLECTIONS_NAMES, COLLECTIONS_INDEXS } from "../collections/index.js";
import { BaseIndexer } from "./baseIndexer.js";

export const createIndexes = async () => {
  await new BaseIndexer(COLLECTIONS_NAMES.UserEvents, COLLECTIONS_INDEXS.UserEvents).createIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.JobEvents, COLLECTIONS_INDEXS.JobEvents).createIndexs();
};

export const dropIndexes = async () => {
  await new BaseIndexer(COLLECTIONS_NAMES.UserEvents, COLLECTIONS_INDEXS.UserEvents).dropIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.JobEvents, COLLECTIONS_INDEXS.JobEvents).dropIndexs();
};
