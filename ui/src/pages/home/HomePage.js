import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Redirect } from "react-router-dom";

import { ROLES } from "../../common/auth/roles.js";
import { DownloadExplanationFile, Highlight, Page, Section } from "../../common/components";
import { NAVIGATION_PAGES } from "../../common/constants/navigationPages.js";
import { CONTACT_ADDRESS, PRODUCT_FULL_NAME, PRODUCT_NAME } from "../../common/constants/product";
import useAuth from "../../common/hooks/useAuth.js";
import { FranceLocalization } from "../../theme/components/icons/FranceLocalization.js";
import RechercherOrganismeParUai from "./identifier-organisme/RechercherOrganismeParUai.js";

const HomePage = () => {
  const [auth] = useAuth();

  if (auth?.sub && auth?.role === ROLES.ADMINISTRATOR)
    return <Redirect to={NAVIGATION_PAGES.GestionUtilisateurs.path} />;

  if (auth?.sub && auth?.role === ROLES.CFA) return <Redirect to={NAVIGATION_PAGES.EspaceOrganisme.path} />;

  return (
    <Page>
      <Section withShadow paddingY="4w" color="grey.800">
        <Flex>
          <Box flex="1">
            <Heading as="h1" fontSize="40px" marginTop="3w">
              Bienvenue sur {PRODUCT_NAME}, <br />
              l’outil de partage de vos effectifs.
            </Heading>
          </Box>
          <Box>
            <FranceLocalization width="152px" height="152px" />
          </Box>
        </Flex>
        <Box>
          <Text fontSize="gamma" marginTop="4w">
            Votre organisme de formation ne peut pas encore transmettre automatiquement vos données via l’API du Tableau
            de bord de l’apprentissage ? <strong>{PRODUCT_FULL_NAME}</strong> est une plateforme développée pour vous
            permettre de partager vos données très rapidement. Laissez-vous guider...
          </Text>
        </Box>
        <Highlight marginTop="4w">
          {PRODUCT_NAME} est un nouveau service du{" "}
          <Text as="span" textDecoration="underline" fontWeight="500">
            Tableau de bord
          </Text>{" "}
          en cours de <br /> développement. Pour faire évoluer ce service, aidez-nous à l’améliorer en <br /> nous
          contactant à{" "}
          <Link href={`mailto:${CONTACT_ADDRESS}`} color="#000091" whiteSpace="nowrap">
            {CONTACT_ADDRESS}
          </Link>
        </Highlight>
        <RechercherOrganismeParUai />
        <DownloadExplanationFile />
      </Section>
    </Page>
  );
};

export default HomePage;
