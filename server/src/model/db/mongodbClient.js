import { config } from "../../../config/index.js";
import { MongoClient } from "mongodb";

let clientHolder;

/**
 * Vérification de la connexion mongodb
 */
export const ensureInitialization = () => {
  if (!clientHolder) {
    throw new Error("Database connection does not exist. Please call connectToMongodb before.");
  }
};

/**
 * Connexion à la MongoDb
 * @param {*} uri
 * @returns
 */
export const connectToMongodb = async (uri = config.mongodb.uri) => {
  let client = await new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  clientHolder = client;
  return client;
};

/**
 * Fermeture de la connexion mongodb
 * @returns
 */
export const closeMongodbConnection = () => {
  ensureInitialization();
  return clientHolder.close();
};

/**
 * Récupère la db depuis la connexion mongodb
 * @returns
 */
export const getDatabase = () => {
  ensureInitialization();
  return clientHolder.db();
};

/**
 * Retourne la collection avec le nom spécifié
 * @param {*} name
 * @returns
 */
export const dbCollection = (name) => {
  ensureInitialization();
  return clientHolder.db().collection(name);
};
