import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const InfoPlusieursOFTrouves = ({ uai }) => (
  <Box width="70%" border="1px solid" borderColor="bluefrance" padding="4w" marginTop="6w">
    <Stack spacing="2w">
      <HStack>
        <Box as="i" color="bluefrance" fontSize="alpha" className="ri-account-circle-fill" marginRight="2w" />
        <Text fontSize="beta" color="grey.800" fontWeight="bold" marginTop="2w">
          N° UAI de votre organisme : {uai}
        </Text>
      </HStack>
      <HStack>
        <Box as="i" color="#0D6635" fontSize="alpha" className="ri-checkbox-circle-fill" marginRight="2w" />
        <Text fontSize="delta" color="#0D6635" fontWeight="bold" marginTop="2w">
          Nous avons pu identifier votre UAI dans le référentiel des organismes de formation. Cependant, votre numéro
          UAI semble correspondre avec plusieurs SIRET. Pourriez-vous confirmer votre établissement parmi cette liste ?
        </Text>
      </HStack>
    </Stack>
  </Box>
);

InfoPlusieursOFTrouves.propTypes = {
  uai: PropTypes.string.isRequired,
};

export default InfoPlusieursOFTrouves;