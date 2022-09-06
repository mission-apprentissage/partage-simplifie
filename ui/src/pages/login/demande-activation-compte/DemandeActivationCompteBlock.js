import { Box, Text } from "@chakra-ui/react";
import React from "react";

import AlertBlock from "../../../common/components/AlertBlock/AlertBlock.js";
import DemandeActivationCompteForm from "./DemandeActivationCompteForm.js";
import useSubmitDemandeActivationCompte, { SUBMIT_STATE } from "./useSubmitDemandeActivationCompte.js";

const DemandeActivationCompteBlock = () => {
  const { submitState, submitDemandeActivationCompte } = useSubmitDemandeActivationCompte();

  if (submitState === SUBMIT_STATE.success) {
    return (
      <AlertBlock variant="success">
        <Text>
          <strong>Merci.</strong>
        </Text>
        <Text>
          L’équipe Partage Simplifié fera le nécessaire rapidement pour vous envoyer un lien vous permettant de définir
          un nouveau mot de passe et activer (ou réactiver) votre compte.
        </Text>
      </AlertBlock>
    );
  }

  if (submitState === SUBMIT_STATE.fail) {
    return (
      <AlertBlock variant="error">
        <Text>
          <strong>Erreur.</strong>
        </Text>
        <Text>Une erreur s&apos;est produite, merci de réitérer votre demande plus tard.</Text>
      </AlertBlock>
    );
  }

  return (
    <Box padding="4w" background="white" borderColor="bluefrance" border="1px solid" minWidth="420px">
      <DemandeActivationCompteForm onSubmit={submitDemandeActivationCompte} />
    </Box>
  );
};

DemandeActivationCompteBlock.propTypes = {};

export default DemandeActivationCompteBlock;
