import { Button, Input, Stack, Text } from "@chakra-ui/react";

const RechercherOrganismeParUaiForm = () => {
  return (
    <Stack spacing="4w">
      <Stack spacing="1w">
        <Text fontSize="epsilon" color="gray.800">
          Rechercher l’organisme par UAI :
        </Text>
        <Text fontSize="omega" color="gray.600">
          Format valide d’une UAI : 7 chiffres et 1 lettre
        </Text>
        <Input backgroundColor="white" placeholder="Ex : 1234567A" width="60%" />
      </Stack>
      <Button variant="primary" width="20%">
        Vérifier
      </Button>
    </Stack>
  );
};

export default RechercherOrganismeParUaiForm;
