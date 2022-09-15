import React from "react";
import { Redirect } from "react-router-dom";

import { DownloadExplanationFile, Page, ProductHeader, Section } from "../../common/components";
import { NAVIGATION_PAGES } from "../../common/constants/navigationPages.js";
import { SESSION_STORAGE_ORGANISME } from "../../common/constants/sessionStorageConstants.js";
import SituationOrganismeInscription from "./SituationOrganismeInscription.js";

const InscriptionPage = () => {
  if (!sessionStorage.getItem(SESSION_STORAGE_ORGANISME)) return <Redirect to={NAVIGATION_PAGES.Accueil.path} />;
  const { uai, siret, siren, nom_etablissement, nature, adresse, reseaux, academie, region } =
    JSON.parse(sessionStorage.getItem(SESSION_STORAGE_ORGANISME)) || null;

  return (
    <Page>
      <Section withShadow paddingY="4w" color="grey.800">
        <ProductHeader />
        <SituationOrganismeInscription
          uai={uai}
          siret={siret}
          siren={siren}
          nom_etablissement={nom_etablissement}
          nature={nature}
          adresse={adresse}
          reseaux={reseaux}
          academie={academie}
          region={region}
        />
        <DownloadExplanationFile />
      </Section>
    </Page>
  );
};

export default InscriptionPage;
