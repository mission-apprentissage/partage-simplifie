import { Link, Text } from "@chakra-ui/react";

import AlertBlock from "../../../../common/components/AlertBlock/AlertBlock.js";
import { CONTACT_ADDRESS } from "../../../../common/constants/product.js";

const AlerteErreur = () => (
  <AlertBlock width="70%" marginTop="4w" variant="error">
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
);

export default AlerteErreur;
