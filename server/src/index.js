const server = require("./http/server");
const logger = require("./common/logger");
const config = require("../config");
const createServices = require("./services/services");
const { connectToMongodb, getDatabase } = require("./model/db/mongodbClient");
const { configureMongoDb } = require("./model/db/mongodbUtils");

process.on("unhandledRejection", (e) => logger.error("An unexpected error occurred", e));
process.on("uncaughtException", (e) => logger.error("An unexpected error occurred", e));

(async function () {
  // Connection à la DB et injection des services
  await connectToMongodb();
  await configureMongoDb();
  const db = getDatabase();
  const services = await createServices({ db });

  // Démarrage du serveur
  const http = await server(services);
  http.listen(5000, () => logger.info(`${config.appName} - Server ready and listening on port ${5000}`));
})();
