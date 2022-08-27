import server from "./http/server.js";
import { logger } from "./common/logger/logger.js";
import { config } from "../config/index.js";
import { createServices } from "./services/services.js";
import { connectToMongodb, getDatabase } from "./model/db/mongodbClient.js";
import { configureMongoDb } from "./model/db/mongodbUtils.js";

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
