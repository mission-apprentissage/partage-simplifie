import { useState } from "react";

import { getOrganismesInReferentielByUai } from "../../../../common/api/api.js";
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

      const { organismes } = await getOrganismesInReferentielByUai(formData.uai);
      if (!organismes) throw new Error("Can't get organismes from API");

      if (organismes?.length === 0) setFormState(RECHERCHER_ORGANISME_FORM_STATE.UAI_NOT_FOUND);
      if (organismes?.length === 1) setFormState(RECHERCHER_ORGANISME_FORM_STATE.ONE_ORGANISME_FOUND);
      if (organismes?.length > 1) setFormState(RECHERCHER_ORGANISME_FORM_STATE.MANY_ORGANISMES_FOUND);

      setSubmitState(RECHERCHER_ORGANISME_SUBMIT_STATE.SUCCESS);
    } catch (err) {
      setFormState(RECHERCHER_ORGANISME_FORM_STATE.ERROR);
      setSubmitState(RECHERCHER_ORGANISME_SUBMIT_STATE.FAIL);
    }
  };

  return { searchUai, submitState, formState, setFormState, submitSearchOrganismeParUai };
};

export default useSubmitSearchOrganismeParUai;
