import { COLLECTIONS_NAMES, COLLECTIONS_INDEXS } from "../collections/index.js";
import { BaseIndexer } from "./baseIndexer.js";

export const createIndexes = async () => {
  await new BaseIndexer(COLLECTIONS_NAMES.UserEvents, COLLECTIONS_INDEXS.UserEvents).createIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.JobEvents, COLLECTIONS_INDEXS.JobEvents).createIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.Users, COLLECTIONS_INDEXS.Users).createIndexs();
  await new BaseIndexer(
    COLLECTIONS_NAMES.DemandesActivationCompte,
    COLLECTIONS_INDEXS.DemandesActivationCompte
  ).createIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.DonneesApprenants, COLLECTIONS_INDEXS.DonneesApprenants).createIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.SignalementAnomalie, COLLECTIONS_INDEXS.SignalementAnomalie).createIndexs();
};

export const dropIndexes = async () => {
  await new BaseIndexer(COLLECTIONS_NAMES.UserEvents, COLLECTIONS_INDEXS.UserEvents).dropIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.JobEvents, COLLECTIONS_INDEXS.JobEvents).dropIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.Users, COLLECTIONS_INDEXS.Users).dropIndexs();
  await new BaseIndexer(
    COLLECTIONS_NAMES.DemandesActivationCompte,
    COLLECTIONS_INDEXS.DemandesActivationCompte
  ).dropIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.DonneesApprenants, COLLECTIONS_INDEXS.DonneesApprenants).dropIndexs();
  await new BaseIndexer(COLLECTIONS_NAMES.SignalementAnomalie, COLLECTIONS_INDEXS.SignalementAnomalie).dropIndexs();
};
