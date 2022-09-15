import React from "react";
import { Redirect } from "react-router-dom";

import { ROLES } from "../../common/auth/roles.js";
import { Page, ProductHeader, Section } from "../../common/components";
import { NAVIGATION_PAGES } from "../../common/constants/navigationPages.js";
import useAuth from "../../common/hooks/useAuth.js";
import RechercherOrganismeParUai from "./identifier-organisme/RechercherOrganismeParUai.js";

const HomePage = () => {
  const [auth] = useAuth();

  if (auth?.sub && auth?.role === ROLES.ADMINISTRATOR)
    return <Redirect to={NAVIGATION_PAGES.GestionUtilisateurs.path} />;

  if (auth?.sub && auth?.role === ROLES.OF) return <Redirect to={NAVIGATION_PAGES.EspaceOrganisme.path} />;

  return (
    <Page>
      <Section withShadow paddingY="4w" color="grey.800">
        <ProductHeader />
        <RechercherOrganismeParUai />
      </Section>
    </Page>
  );
};

export default HomePage;
