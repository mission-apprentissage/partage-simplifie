import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

import { DownloadTemplateFile, Page, Section, SituationOrganisme, UploadFileBlock } from "../../common/components";
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
        <Heading as="h1" color="bluefrance" marginTop="3w">
          {userNomEtablissement}, bienvenue sur votre espace.
        </Heading>
        <Text fontSize="gamma" color="grey.800" marginTop="4w">
          <strong>{PRODUCT_FULL_NAME}</strong> vous permet de partager vos données très simplement.
          <br />
          La collecte des données permet d’identifier le nombre d’ “apprentis” (avec formation et contrat), de
          stagiaires de la formation professionnelle ou “inscrits sans contrat” (inscrits en formation mais sans aucun
          contrat pour cette formation), de “rupturants” (inscrits en formation avec un contrat rompu en attente d’un
          nouveau contrat), “abandons” (ayant quitté la formation et l’employeur).
        </Text>
        <Text fontSize="gamma" color="grey.800" marginTop="4w">
          Il permet de visualiser en temps réel les effectifs d’apprentis dans les centres de formation et les
          organismes de formation, permettant aux pouvoirs publics de piloter au mieux la politique de l’apprentissage
          nationalement et localement.
        </Text>

        <SituationOrganisme
          uai="1234567X"
          siret="30540504500876"
          nomEtablissement="ISTELI Lille"
          adresse="10 rue de masure Bâtiment D 59100 Lille"
          outilsGestion="Hubspot"
          showOutilGestionNotConnected
          showSendAnomalie
        />
        <Box
          width="80%"
          borderLeft="4px solid"
          backgroundColor="#EEEEEE"
          borderLeftColor="bluefrance"
          padding="4w"
          marginTop="6w"
        >
          <Stack spacing="0.5w">
            <Text fontSize="beta" color="grey.800" fontWeight="bold" marginBottom="2w">
              En 3 étapes, transmettez vos données à l’équipe du Tableau de bord :
            </Text>
            <Text fontSize="delta" color="grey.800">
              1. Téléchargez le document de dépôt de données ci-dessous. Il inclut une ligne d’exemple.
            </Text>
            <Text fontSize="delta" color="grey.800">
              2. Remplissez-le sur votre ordinateur en respectant les champs demandés.
            </Text>
            <Text fontSize="delta" color="grey.800">
              3. Retournez sur votre compte et téléversez le fichier dûment rempli.
            </Text>
          </Stack>
        </Box>
        <DownloadTemplateFile />
        <UploadFileBlock />
      </Section>
    </Page>
  );
};

export default EspaceOrganismePage;
