// eslint-disable-next-line node/no-unpublished-require
const { MongoMemoryServer } = require("mongodb-memory-server");
const { connectToMongodb, getDatabase } = require("../../src/model/db/mongodbClient");
const { configureValidation, clearAllCollections } = require("../../src/model/db/mongodbUtils");

const { createIndexes } = require("../../src/model/indexes");

let mongodHolder;

/**
 * Démarrage de la mongodb en mémoire
 * On ne démarre pas l'initialisation de la collection logs capped car inutile pour les tests
 */
const startMongodb = async () => {
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
const stopMongodb = () => {
  return mongodHolder.stop();
};

/**
 * Clear de la mongodb en mémoire
 * Vu qu'on ne capped pas la collection logs, on peut tout clear sans pb
 */
const clearMongodb = async () => {
  await clearAllCollections();
};

module.exports = {
  startMongodb,
  stopMongodb,
  clearMongodb,
};
