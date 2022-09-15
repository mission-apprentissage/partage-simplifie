import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Redirect } from "react-router-dom";

import { Page, Section } from "../../common/components";
import { NAVIGATION_PAGES } from "../../common/constants/navigationPages.js";
import { SESSION_STORAGE_ORGANISME } from "../../common/constants/sessionStorageConstants.js";
import { FranceLocalization } from "../../theme/components/icons/FranceLocalization.js";

const InscriptionPage = () => {
  if (!sessionStorage.getItem(SESSION_STORAGE_ORGANISME)) return <Redirect to={NAVIGATION_PAGES.Accueil.path} />;
  const { uai, siret, siren, nature } = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_ORGANISME)) || null;

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
              <Text>{uai}</Text>
              <Text>{siret}</Text>
              <Text>{siren}</Text>
              <Text>{nature}</Text>
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
