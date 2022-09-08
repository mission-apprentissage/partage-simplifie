import { Box, Link, Text } from "@chakra-ui/react";

import AlertBlock from "../../../../common/components/AlertBlock/AlertBlock.js";
import { CONTACT_ADDRESS } from "../../../../common/constants/product.js";

const AlerteErreur = () => (
  <Box marginTop="4w">
    <AlertBlock mar variant="error">
      <Text>
        <strong>Erreur.</strong>
      </Text>
      <Text>Une erreur s&apos;est produite.</Text>
      <Text>
        Veuillez vous rapprocher du support du Tableau de bord en écrivant à{" "}
        <Link href={`mailto:${CONTACT_ADDRESS}`} color="bluefrance">
          {CONTACT_ADDRESS}
        </Link>
      </Text>
    </AlertBlock>
  </Box>
);

export default AlerteErreur;
