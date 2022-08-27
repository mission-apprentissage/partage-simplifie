import { MongoMemoryServer } from "mongodb-memory-server";

import { connectToMongodb, getDatabase } from "../../src/model/db/mongodbClient.js";
import { configureValidation, clearAllCollections } from "../../src/model/db/mongodbUtils.js";
import { createIndexes } from "../../src/model/indexes/index.js";

let mongodHolder;

/**
 * Démarrage de la mongodb en mémoire
 * On ne démarre pas l'initialisation de la collection logs capped car inutile pour les tests
 */
export const startMongodb = async () => {
  mongodHolder = await MongoMemoryServer.create({ binary: { version: "5.0.2" } });
  let uri = mongodHolder.getUri();
  let client = await connectToMongodb(uri);

  await configureValidation();
  await createIndexes(getDatabase());
  return client;
};

/*
 * Arrêt de la mongodb
 */
export const stopMongodb = () => {
  return mongodHolder.stop();
};

/**
 * Clear de la mongodb en mémoire
 * Vu qu'on ne capped pas la collection logs, on peut tout clear sans pb
 */
export const clearMongodb = async () => {
  await clearAllCollections();
};
