import { Box, Button, Link, Stack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";

import { Highlight } from "../../../common/components/index.js";
import AlerteErreur from "./alerts/AlerteErreur.js";
import AlerteOFUniqueCompteExistant from "./alerts/AlerteOFUniqueCompteExistant.js";
import AlerteUaiNonConnu from "./alerts/AlerteUaiNonConnu.js";
import AlerteUaiNonTrouve from "./alerts/AlerteUaiNonTrouve.js";
import RechercherOrganismeParUaiForm from "./form/RechercherOrganismeParUaiForm.js";
import { RECHERCHER_ORGANISME_FORM_STATE } from "./form/RechercherOrganismeParUaiFormStates.js";
import useSubmitSearchOrganismeParUai from "./form/useSubmitSearchOrganismeParUai.js";

const RechercherOrganismeParUai = () => {
  const { searchUai, formState, setFormState, submitSearchOrganismeParUai } = useSubmitSearchOrganismeParUai();
  const [showRechercheOrganismeParUai, setShowRechercheOrganismeParUai] = useState(false);

  return (
    <>
      {formState === RECHERCHER_ORGANISME_FORM_STATE.INITIAL && (
        <Button variant="primary" onClick={() => setShowRechercheOrganismeParUai(true)} marginTop="4w">
          Je crée mon compte
        </Button>
      )}

      {showRechercheOrganismeParUai === true && (
        <>
          {formState === RECHERCHER_ORGANISME_FORM_STATE.INITIAL && (
            <RechercherOrganismeParUaiBlock
              submitSearchOrganismeParUai={submitSearchOrganismeParUai}
              setFormState={setFormState}
            />
          )}
          {formState === RECHERCHER_ORGANISME_FORM_STATE.ERROR && <AlerteErreur />}
          {formState === RECHERCHER_ORGANISME_FORM_STATE.UAI_UNKNOWN && <AlerteUaiNonConnu />}
          {formState === RECHERCHER_ORGANISME_FORM_STATE.UAI_NOT_FOUND && <AlerteUaiNonTrouve uai={searchUai} />}
          {formState === RECHERCHER_ORGANISME_FORM_STATE.ONE_ORGANISME_FOUND_ALREADY_REGISTERED && (
            <AlerteOFUniqueCompteExistant uai={searchUai} />
          )}
          {formState === RECHERCHER_ORGANISME_FORM_STATE.ONE_OR_MANY_ORGANISMES_FOUND && (
            <Box backgroundColor="green">Un ou plusieurs OF trouvé !</Box>
          )}
        </>
      )}
    </>
  );
};

export default RechercherOrganismeParUai;

const RechercherOrganismeParUaiBlock = ({ submitSearchOrganismeParUai, setFormState }) => {
  return (
    <>
      <Box width="70%" backgroundColor="#E3E3FD" marginTop="6w" padding="4w">
        <Stack spacing="4w">
          <RechercherOrganismeParUaiForm onSubmit={submitSearchOrganismeParUai} />
          <Link
            onClick={() => setFormState(RECHERCHER_ORGANISME_FORM_STATE.UAI_UNKNOWN)}
            color="bluefrance"
            textDecoration="underline"
          >
            Je ne connais pas mon UAI
          </Link>
        </Stack>
      </Box>

      <Highlight width="65%" marginTop="4w">
        <Text fontSize="delta" as="span">
          <strong>Numéro UAI (Unité Administrative Immatriculée) :</strong> il s’obtient auprès des services du rectorat
          de l’académie où se situe le CFA. Pour vous aider à rechercher votre numéro UAI, vous pouvez consulter le site
          :{" "}
          <Link href="https://education.gouv.fr/acce" target="_blank" rel="noopener noreferrer" color="bluefrance">
            https://education.gouv.fr/acce
          </Link>
        </Text>
      </Highlight>
    </>
  );
};

RechercherOrganismeParUaiBlock.propTypes = {
  submitSearchOrganismeParUai: PropTypes.func.isRequired,
  setFormState: PropTypes.func.isRequired,
};
