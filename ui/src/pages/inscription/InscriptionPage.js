import { Stack } from "@chakra-ui/react";
import React from "react";
import { Redirect } from "react-router-dom";

import { DownloadExplanationFile, Page, ProductHeader, Section } from "../../common/components";
import { NAVIGATION_PAGES } from "../../common/constants/navigationPages.js";
import { SESSION_STORAGE_ORGANISME } from "../../common/constants/sessionStorageConstants.js";
import InscriptionFormBlock from "./inscription-form/InscriptionFormBlock.js";

const InscriptionPage = () => {
  if (!sessionStorage.getItem(SESSION_STORAGE_ORGANISME)) return <Redirect to={NAVIGATION_PAGES.Accueil.path} />;
  const organisme = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_ORGANISME)) || null;

  return (
    <Page>
      <Section withShadow paddingY="4w" color="grey.800">
        <Stack spacing="4w">
          <ProductHeader />
          <InscriptionFormBlock organisme={organisme} />
          <DownloadExplanationFile />
        </Stack>
      </Section>
    </Page>
  );
};

export default InscriptionPage;
