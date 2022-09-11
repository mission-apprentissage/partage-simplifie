import { useState } from "react";
import { useHistory } from "react-router-dom";

import { getExistingUserByUaiSiret } from "../../../../../common/api/api.js";
import { NAVIGATION_PAGES } from "../../../../../common/constants/navigationPages.js";

export const VERIFY_UAI_SIRET_EXISTING_STATE = {
  INITIAL: "INITIAL",
  ACCOUNT_EXISTANT: "ACCOUNT_EXISTANT",
  ACCOUNT_INEXISTANT: "ACCOUNT_INEXISTANT",
  ERROR: "ERROR",
};

const useSubmitVerifyUaiSiretExisting = () => {
  const [formState, setFormState] = useState(VERIFY_UAI_SIRET_EXISTING_STATE.INITIAL);
  const history = useHistory();

  const submitVerifyUaiSiretExisting = async ({ uai, siret }) => {
    try {
      const { found } = await getExistingUserByUaiSiret({ uai, siret });

      if (found === true) {
        setFormState(VERIFY_UAI_SIRET_EXISTING_STATE.ACCOUNT_EXISTANT);
      } else {
        history.push(`${NAVIGATION_PAGES.Inscription.path}?uai=${uai}&siret=${siret}`);
      }
    } catch (err) {
      setFormState(VERIFY_UAI_SIRET_EXISTING_STATE.ERROR);
    }
  };

  return { formState, submitVerifyUaiSiretExisting };
};

export default useSubmitVerifyUaiSiretExisting;
