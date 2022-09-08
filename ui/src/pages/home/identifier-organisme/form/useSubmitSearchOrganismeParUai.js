import { useState } from "react";

import { getExistingUserByUaiSiret, getOrganismesInReferentielByUai } from "../../../../common/api/api.js";
import {
  RECHERCHER_ORGANISME_FORM_STATE,
  RECHERCHER_ORGANISME_SUBMIT_STATE,
} from "./RechercherOrganismeParUaiFormStates.js";

const useSubmitSearchOrganismeParUai = () => {
  const [searchUai, setSearchUai] = useState("");
  const [submitState, setSubmitState] = useState(RECHERCHER_ORGANISME_SUBMIT_STATE.WAITING);
  const [formState, setFormState] = useState(RECHERCHER_ORGANISME_FORM_STATE.INITIAL);

  const submitSearchOrganismeParUai = async (formData) => {
    try {
      if (formData.uai) setSearchUai(formData.uai);

      // Récupère la liste des organismes dans le référentiel depuis cet uai
      const { organismes } = await getOrganismesInReferentielByUai(formData.uai);
      if (!organismes) throw new Error("Can't get organismes from API");

      // Cas ou aucun OF n'est trouvé
      if (organismes?.length === 0) setFormState(RECHERCHER_ORGANISME_FORM_STATE.UAI_NOT_FOUND);

      // Cas ou un seul OF est trouvé, on vérifie si un compte utilisateur existe déja
      if (organismes?.length === 1) {
        // On vérifie s'il existe un compte pour le couple UAI - SIRET de cet unique OF trouvé
        const { uai, siret } = organismes[0];
        const { found } = await getExistingUserByUaiSiret({ uai, siret });

        if (found === true) {
          setFormState(RECHERCHER_ORGANISME_FORM_STATE.ONE_OR_MANY_ORGANISMES_FOUND);
        } else {
          setFormState(RECHERCHER_ORGANISME_FORM_STATE.ONE_ORGANISME_FOUND_ALREADY_REGISTERED);
        }
      }

      // Cas ou plusieurs OFs sont trouvés
      if (organismes?.length > 1) setFormState(RECHERCHER_ORGANISME_FORM_STATE.ONE_OR_MANY_ORGANISMES_FOUND);

      setSubmitState(RECHERCHER_ORGANISME_SUBMIT_STATE.SUCCESS);
    } catch (err) {
      setFormState(RECHERCHER_ORGANISME_FORM_STATE.ERROR);
      setSubmitState(RECHERCHER_ORGANISME_SUBMIT_STATE.FAIL);
    }
  };

  return { searchUai, submitState, formState, setFormState, submitSearchOrganismeParUai };
};

export default useSubmitSearchOrganismeParUai;
