import { Alert, Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

import { ROLES } from "../../auth/roles.js";
import useAuth from "../../hooks/useAuth.js";
import { Footer } from "..";
import ContactSection from "../ContactSection/ContactSection";
import Header from "./Header";
import NavBar from "./NavBar.js";

const Page = ({ children }) => {
  const IS_ENV_RECETTE = process.env.REACT_APP_ENV === "recette";
  const [auth] = useAuth();
  const isAdministrator = auth?.role === ROLES.ADMINISTRATOR;
  return (
    <>
      {IS_ENV_RECETTE === true && (
        <Alert status="warning" justifyContent="center">
          <Box as="i" className="ri-error-warning-fill" fontSize="gamma" marginRight="2w" />
          Environnement de recette
        </Alert>
      )}
      <Header />
      {isAdministrator === true && <NavBar />}
      {children}
      <ContactSection />
      <Footer />
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Page;
