import { Box, Button, Input, Link, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

import { Highlight } from "../../../common/components/index.js";
import AlerteUaiNonConnu from "./AlerteUaiNonConnu.js";

const RechercherOrganismeParUai = () => {
  const [showUaiNotFound, setShowUaiNotFound] = useState(false);

  return (
    <>
      <Box width="70%" backgroundColor="#E3E3FD" marginTop="6w" padding="4w">
        <Text fontSize="epsilon" color="gray.800">
          Rechercher l’organisme par UAI :
        </Text>
        <Text fontSize="omega" color="gray.600">
          Format valide d’une UAI : 7 chiffres et 1 lettre
        </Text>
        <Box marginTop="2w">
          <Input backgroundColor="white" placeholder="Ex : 1234567A" width="60%" />
        </Box>
        <Stack marginTop="3w" spacing="2w">
          <Button variant="primary" width="20%">
            Vérifier
          </Button>
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
    </>
  );
};

export default RechercherOrganismeParUai;
