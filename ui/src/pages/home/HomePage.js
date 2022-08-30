import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Redirect } from "react-router-dom";

import { ROLES } from "../../common/auth/roles.js";
import { Page, Section } from "../../common/components";
import { NAVIGATION_PAGES } from "../../common/constants/navigationPages.js";
import { PRODUCT_NAME } from "../../common/constants/product";
import useAuth from "../../common/hooks/useAuth.js";

const HomePage = () => {
  const [auth] = useAuth();

  if (auth?.sub && auth?.role === ROLES.ADMINISTRATOR) {
    return <Redirect to={NAVIGATION_PAGES.GestionUtilisateurs.path} />;
  }

  if (auth?.sub && auth?.role === ROLES.CFA) {
    return <Redirect to={NAVIGATION_PAGES.EspaceCfa.path} />;
  }

  return (
    <Page>
      <Section withShadow paddingY="4w">
        <Box>
          <Flex>
            <Box flex="1">
              <Heading as="h1" fontSize="40px">
                Le {PRODUCT_NAME}
              </Heading>
              <Text fontSize="beta" color="grey.800" marginTop="4w">
                Mettre à disposition des <strong>différents acteurs</strong> <br />
                les <strong>données clés</strong> de l&apos;apprentissage en <strong>temps réel</strong>
              </Text>
            </Box>
          </Flex>
        </Box>
      </Section>
    </Page>
  );
};

export default HomePage;
