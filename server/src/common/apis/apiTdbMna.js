import axios from "axios";
import { logger } from "../logger/logger.js";
import { config } from "../../../config/index.js";

const API_ENDPOINT = config.api.mnaTdb.endPoint;

/**
 * Méthode de healthcheck sur l'API
 * @param {*} uai
 * @returns
 */
export const healthcheck = async () => {
  const url = `${API_ENDPOINT}/healthcheck`;
  try {
    const { data } = await axios.get(url, { insecureHTTPParser: true });
    return data;
  } catch (err) {
    logger.error(`API TDB healthcheck: something went wrong`, err.response.data);
    throw new Error(`An error occurred while getting TdbApiHealthcheck`);
  }
};

/**
 * Méthode d'authentification via usename & password
 * @param {*} username & password
 * @returns
 */
export const loginAndGetBearerToken = async ({ username, password }) => {
  const url = `${API_ENDPOINT}/login`;
  try {
    const { data } = await axios.post(url, { username, password }, { insecureHTTPParser: true });
    return {
      Authorization: "Bearer " + data.access_token,
    };
  } catch (err) {
    logger.error(`API TDB loginAndGetBearerToken: something went wrong`, err.response.data);
    throw new Error(`An error occurred while login`);
  }
};

/**
 * Méthode de test d'authentification à la route de post des dossiersApprenants
 * @param {*} bearerToken
 * @returns
 */
export const testAuthDossierApprenants = async (bearerToken) => {
  const url = `${API_ENDPOINT}/dossiers-apprenants/test`;
  try {
    const { data } = await axios.post(url, {}, { headers: bearerToken, insecureHTTPParser: true });
    return data;
  } catch (err) {
    logger.error(`API TDB testAuthDossierApprenants: something went wrong`, err.response.data);
    throw new Error(`An error occurred while testing TDB API testAuthDossierApprenants`);
  }
};

/**
 * Méthode d'envoi d'une liste de dossiersApprenants
 * @param {*} bearerToken
 * @param {*} dossiersApprenants
 * @returns
 */
export const postDossierApprenants = async ({ bearerToken, dossiersApprenants }) => {
  const url = `${API_ENDPOINT}/dossiers-apprenants`;
  try {
    const { data } = await axios.post(url, dossiersApprenants, { headers: bearerToken, insecureHTTPParser: true });
    return data;
  } catch (err) {
    logger.error(`API TDB postDossierApprenants: something went wrong`, err.response.data);
    throw new Error(`An error occurred while posting dossiersApprenants`);
  }
};
