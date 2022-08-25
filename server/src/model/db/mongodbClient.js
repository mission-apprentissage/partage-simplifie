const config = require("../../../config");
const { MongoClient } = require("mongodb");

let clientHolder;

/**
 * Vérification de la connexion mongodb
 */
const ensureInitialization = () => {
  if (!clientHolder) {
    throw new Error("Database connection does not exist. Please call connectToMongodb before.");
  }
};

/**
 * Connexion à la MongoDb
 * @param {*} uri
 * @returns
 */
const connectToMongodb = async (uri = config.mongodb.uri) => {
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
const closeMongodbConnection = () => {
  ensureInitialization();
  return clientHolder.close();
};

/**
 * Récupère la db depuis la connexion mongodb
 * @returns
 */
const getDatabase = () => {
  ensureInitialization();
  return clientHolder.db();
};

/**
 * Retourne la collection avec le nom spécifié
 * @param {*} name
 * @returns
 */
const dbCollection = (name) => {
  ensureInitialization();
  return clientHolder.db().collection(name);
};

module.exports = {
  connectToMongodb,
  closeMongodbConnection,
  dbCollection,
  getDatabase,
  ensureInitialization,
};
