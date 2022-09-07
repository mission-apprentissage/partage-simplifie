import { Box, Button, HStack, Input, Link, Stack, Text } from "@chakra-ui/react";

import { CONTACT_ADDRESS } from "../../constants/product.js";

const UploadFileBlock = () => {
  return (
    <Box width="70%" backgroundColor="#E3E3FD" marginTop="6w" padding="4w">
      <Text fontSize="gamma" fontWeight="bold" color="bluefrance">
        Transmettre le document de dépôt de vos données
      </Text>

      <HStack marginTop="4w">
        <Box as="i" color="bluefrance" fontSize="alpha" className="ri-alert-fill" marginRight="2w" />
        <Text fontSize="delta" color="bluefrance" fontWeight="bold" marginTop="2w">
          Important : cette première version de l’outil ne permet pas encore l’archivage. Tout fichier téléversé écrase
          la précédente.
        </Text>
      </HStack>

      <Stack>
        <Text fontSize="zeta" color="gray.600" marginTop="2w">
          Important : Taille maximale du fichier : xx Mo. Formats supportés : .csv uniquement.
        </Text>
        <Text fontSize="zeta" color="gray.600" marginTop="2w">
          Un seul fichier possible.
        </Text>
        <Text fontSize="zeta" color="gray.600" marginTop="2w">
          Le traitement des données est assuré par la Mission Nationale de l’Apprentissage. Pour toute information sur
          la protection des données, consultez la FAQ ou demandez l’AIPD à{" "}
          <Link href={`mailto:${CONTACT_ADDRESS}`} color="bluefrance" whiteSpace="nowrap">
            {CONTACT_ADDRESS}
          </Link>
        </Text>
      </Stack>

      <Box marginTop="4w">
        <input backgroundColor="white" type="file" id="dataFile" name="dataFile" accept=".csv"></input>
      </Box>

      <Box marginTop="4w">
        <Text marginBottom="8px">Si besoin laissez un commentaire : </Text>
        <Input backgroundColor="white" placeholder="" size="sm" />
      </Box>

      <Button variant="primary" marginTop="4w">
        Valider
      </Button>
    </Box>
  );
};

export default UploadFileBlock;
