import { useState } from "react";

import { INSCRIPTION_FORM_STATE } from "./InscriptionFormStates.js";

const useSubmitInscription = () => {
  const [formState, setFormState] = useState(INSCRIPTION_FORM_STATE.INITIAL);

  const submitInscription = async (formData) => {
    try {
      // Cas outil de gestion = Autre
      if (formData.outils_gestion.includes("Autre")) {
        formData.outils_gestion[formData.outils_gestion.indexOf("Autre")] = formData.autre_outil_gestion;
        delete formData.autre_outil_gestion;
      }

      // TODO Call Api
      console.log(JSON.stringify(formData));

      setFormState(INSCRIPTION_FORM_STATE.SUCCESS);
    } catch (err) {
      setFormState(INSCRIPTION_FORM_STATE.ERROR);
    }
  };

  return { formState, submitInscription };
};

export default useSubmitInscription;
