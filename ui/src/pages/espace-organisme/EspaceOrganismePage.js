import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

import { Page, Section } from "../../common/components";
import { PRODUCT_FULL_NAME, PRODUCT_NAME } from "../../common/constants/product";
import useAuth from "../../common/hooks/useAuth.js";
import { FranceLocalization } from "../../theme/components/icons/FranceLocalization.js";

const EspaceOrganismePage = () => {
  const [auth] = useAuth();
  const userNomEtablissement = auth.nom_etablissement || "NC";

  return (
    <Page>
      <Section withShadow paddingY="4w">
        <Box>
          <Flex>
            <Box flex="1">
              <Heading fontSize="40px" marginTop="3w">
                Bienvenue sur {PRODUCT_NAME}, <br />
                l’outil de partage de vos effectifs.
              </Heading>
            </Box>
            <Box>
              <FranceLocalization width="152px" height="152px" />
            </Box>
          </Flex>
        </Box>
        <Heading as="h1" color="bluemarianne" marginTop="3w">
          {userNomEtablissement}, bienvenue sur votre espace.
        </Heading>
        <Text fontSize="gamma" color="black" marginTop="4w">
          <strong>{PRODUCT_FULL_NAME}</strong> vous permet de partager vos données très simplement.
          <br />
          La collecte des données permet d’identifier le nombre d’ “apprentis” (avec formation et contrat), de
          stagiaires de la formation professionnelle ou “inscrits sans contrat” (inscrits en formation mais sans aucun
          contrat pour cette formation), de “rupturants” (inscrits en formation avec un contrat rompu en attente d’un
          nouveau contrat), “abandons” (ayant quitté la formation et l’employeur).
        </Text>
        <Text fontSize="gamma" color="black" marginTop="4w">
          Il permet de visualiser en temps réel les effectifs d’apprentis dans les centres de formation et les
          organismes de formation, permettant aux pouvoirs publics de piloter au mieux la politique de l’apprentissage
          nationalement et localement.
        </Text>
      </Section>
    </Page>
  );
};

export default EspaceOrganismePage;
