import { fetchOrganismesWithUai } from "../common/apis/apiReferentielMna.js";
import { toOrganismes } from "../model/api/referentielOrganismesMapper.js";

/**
 * Méthode de vérification de la présence de l'établissement dans le référentiel par son uai
 * @param {*} uai
 * @returns
 */
const getOrganismesFromReferentiel = async (uai) => {
  try {
    const organismesFromUai = await fetchOrganismesWithUai(uai);
    const atLeastOneFound = organismesFromUai.pagination?.total > 0 || false;
    if (atLeastOneFound) return organismesFromUai?.organismes?.map((item) => toOrganismes(item));

    return [];
  } catch (err) {
    return [];
  }
};

export default () => ({ getOrganismesFromReferentiel });
