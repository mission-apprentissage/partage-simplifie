import { config } from "../../../config/index.js";
import { logger } from "../../common/logger/logger.js";
import { COLLECTIONS_SCHEMAS, COLLECTIONS_NAMES } from "../collections/index.js";
import { getDatabase, ensureInitialization } from "./mongodbClient.js";

/**
 * Création d'une collection si elle n'existe pas
 * @param {*} name
 */
const createCollectionIfNeeded = async (name) => {
  let db = getDatabase();
  let collections = await db.listCollections().toArray();

  if (!collections.find((c) => c.name === name)) {
    await db.createCollection(name).catch(() => {});
  }
};

/**
 * Clear de toutes les collections
 * @returns
 */
export const clearAllCollections = async () => {
  let collections = await getDatabase().collections();
  return Promise.all(collections.map((c) => c.deleteMany({})));
};

/**
 * Vérification de l'existence d'une collection
 * @param {*} name
 */
export const doesCollectionExistInDb = async (name) => {
  let db = getDatabase();
  let collections = await db.listCollections().toArray();
  return collections.some((c) => c.name === name);
};

/***
 * Configuration de la validation des collections
 */
export const configureValidation = async () => {
  await ensureInitialization();

  await Promise.all(
    COLLECTIONS_SCHEMAS.map(async ({ name, schema }) => {
      await createCollectionIfNeeded(name);

      if (!schema) {
        return;
      }

      logger.debug(`Configuring validation for collection ${name}...`);
      let db = getDatabase();
      await db.command({
        collMod: name,
        validationLevel: "strict",
        validationAction: "warn",
        validator: {
          $jsonSchema: schema(),
        },
      });
    })
  );
};

/**
 * Initialisation de la collection logs capped (limité en taille)
 * cf.https://www.mongodb.com/docs/manual/core/capped-collections/
 */
const configureLogsCappedCollection = async () => {
  let db = getDatabase();
  let collections = await db.listCollections().toArray();

  /**
   * En fonction de l'existence de la collection logs, on la crée capped ou on la converti en capped
   */
  if (!collections.find((c) => c.name === COLLECTIONS_NAMES.Logs)) {
    await db.createCollection(COLLECTIONS_NAMES.Logs, {
      capped: true,
      size: config.log.mongodbCapped.size,
      max: config.log.mongodbCapped.max,
    });
  } else {
    await db.command({
      convertToCapped: COLLECTIONS_NAMES.Logs,
      size: config.log.mongodbCapped.size,
      max: config.log.mongodbCapped.max,
    });
  }

  logger.debug(`Logs collection capped successfully...`);
};

/**
 * Configuration de la mongodb, lance toute les étapes nécessaires pour l'initialisation de la base
 */
export const configureMongoDb = async () => {
  await configureLogsCappedCollection();
  await configureValidation();
};
