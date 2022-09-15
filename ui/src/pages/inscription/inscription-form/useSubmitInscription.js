import { useState } from "react";

import { INSCRIPTION_FORM_STATE } from "./InscriptionFormStates.js";

const useSubmitInscription = () => {
  const [formState, setFormState] = useState(INSCRIPTION_FORM_STATE.INITIAL);

  const submitInscription = async (formData) => {
    try {
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
