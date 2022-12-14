import { Box, HStack, Link, Stack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { CONTACT_ADDRESS, REFERENTIEL_URL } from "../../../../common/constants/product.js";

const AlerteOFUniqueCompteExistant = ({ uai }) => (
  <Box width="70%" border="1px solid" borderColor="bluefrance" padding="4w" marginTop="6w">
    <Stack>
      <HStack>
        <Box as="i" color="bluefrance" fontSize="alpha" className="ri-account-circle-fill" marginRight="2w" />
        <Text fontSize="beta" color="grey.800" fontWeight="bold" marginTop="2w">
          N° UAI de votre Organisme : {uai}
        </Text>
      </HStack>
      <HStack>
        <Box as="i" color="#B60000" fontSize="alpha" className="ri-close-circle-fill" marginRight="2w" />
        <Stack fontSize="delta" color="#B60000" fontWeight="bold" spacing="2w">
          <Text marginTop="2w">
            Nous avons pu identifier votre UAI dans le{" "}
            <Link target="_blank" rel="noopener noreferrer" href={REFERENTIEL_URL} fontWeight="700" color="bluefrance">
              référentiel des organismes de formation
            </Link>
            . Cependant, votre numéro UAI semble déjà associé à un compte existant.
          </Text>
          <Text marginTop="2w">
            Veuillez contacter le support via{" "}
            <Link href={`mailto:${CONTACT_ADDRESS}`} color="bluefrance">
              {CONTACT_ADDRESS}
            </Link>
          </Text>
        </Stack>
      </HStack>
    </Stack>
  </Box>
);

AlerteOFUniqueCompteExistant.propTypes = {
  uai: PropTypes.string.isRequired,
};

export default AlerteOFUniqueCompteExistant;
