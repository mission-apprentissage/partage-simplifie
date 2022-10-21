import axios from "axios";
import { logger } from "../../common/logger/logger.js";
import { config } from "../../../config/index.js";

// Cf Documentation : https://referentiel.apprentissage.beta.gouv.fr/api/v1/doc/#/
const API_ENDPOINT = config.api.mnaReferentielApiEndpoint;

/**
 * Méthode d'appel à l'API et récupération des organismes pour un uai donné
 * @param {*} uai
 * @returns
 */
export const fetchOrganismesWithUai = async (uai) => {
  const url = `${API_ENDPOINT}/organismes`;
  try {
    const { data } = await axios.get(url, { params: { uais: uai } });
    return data;
  } catch (err) {
    logger.error(`API REFERENTIEL fetchOrganismesWithUai: something went wrong`, err.response.data);
    throw new Error(`An error occurred while fetching UAI ${uai}`);
  }
};
