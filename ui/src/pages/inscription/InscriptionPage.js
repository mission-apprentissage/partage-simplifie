import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

import { Page, Section } from "../../common/components";
import { FranceLocalization } from "../../theme/components/icons/FranceLocalization.js";

const InscriptionPage = () => {
  return (
    <Page>
      <Section withShadow paddingY="4w" color="grey.800">
        <Flex>
          <Box flex="1">
            <Stack>
              <Heading fontSize="28px" marginTop="3w">
                Veuillez compléter les informations suivantes pour créer votre compte :
              </Heading>
              <Text marginTop="3w">Page en cours de développement</Text>
            </Stack>
          </Box>
          <Box>
            <FranceLocalization width="152px" height="152px" />
          </Box>
        </Flex>
      </Section>
    </Page>
  );
};

export default InscriptionPage;
