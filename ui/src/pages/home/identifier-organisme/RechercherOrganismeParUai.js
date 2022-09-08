import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

import { Highlight } from "../../../common/components/index.js";
import AlerteUaiNonConnu from "./alertes/AlerteUaiNonConnu.js";
import AlerteUaiNonTrouve from "./alertes/AlerteUaiNonTrouve.js";
import RechercherOrganismeParUaiForm from "./RechercherOrganismeParUaiForm.js";

const RechercherOrganismeParUai = () => {
  const [showUaiNotFound, setShowUaiNotFound] = useState(false);

  return (
    <>
      <Box width="70%" backgroundColor="#E3E3FD" marginTop="6w" padding="4w">
        <Stack spacing="4w">
          <RechercherOrganismeParUaiForm />
          <Link
            onClick={() => setShowUaiNotFound(true)}
            color="bluefrance"
            textDecoration="underline"
            whiteSpace="nowrap"
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
          <Link
            href="https://education.gouv.fr/acce"
            target="_blank"
            rel="noopener noreferrer"
            color="bluefrance"
            whiteSpace="nowrap"
          >
            https://education.gouv.fr/acce
          </Link>
        </Text>
      </Highlight>

      {showUaiNotFound === true && <AlerteUaiNonConnu />}

      {/* TODO Update */}
      {showUaiNotFound === true && <AlerteUaiNonTrouve uai="1234567X" />}
    </>
  );
};

export default RechercherOrganismeParUai;
