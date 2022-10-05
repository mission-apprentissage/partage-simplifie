import { config } from "../../../config/index.js";
import {
  healthcheck,
  loginAndGetBearerToken,
  postDossierApprenants,
  testAuthDossierApprenants,
} from "../../common/apis/apiTdbMna.js";
import { logger } from "../../common/logger/logger.js";

export const runSendDossiersApprenantsToTdb = async () => {
  logger.info("Envoi des données apprenants sous forme de dossiersApprenants à l'API TDB");

  // Check API & Log User
  await checkApiAvailable();
  const bearerToken = await logApiUser();

  // TODO ForEachDonneesByUser
  // TODO Transform
  // TODO Split by 100 & Post + UserEvent
  const postResponse = await postDossierApprenants({ bearerToken, dossiersApprenants: [] });
  logger.info(postResponse);
};

/**
 * Vérification de la disponibilité de l'API
 */
const checkApiAvailable = async () => {
  const testHealthcheck = await healthcheck();
  if (!testHealthcheck) throw new Error("API Tdb Indisponible");
};

/**
 * Authentification de l'utilisateur & vérification des droits
 * @returns
 */
const logApiUser = async () => {
  const bearerToken = await loginAndGetBearerToken({
    username: config.api.mnaTdb.userName,
    password: config.api.mnaTdb.userPassword,
  });
  if (!bearerToken) throw new Error("Impossible de s'authentifier à l'API");

  const testAuthPostDossiersApprenants = await testAuthDossierApprenants(bearerToken);
  if (!testAuthPostDossiersApprenants)
    throw new Error("Impossible de s'authentifier à la route d'envoi des dossiersApprenants");

  return bearerToken;
};
