import { Alert, Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

import { Footer } from "..";
import ContactSection from "../ContactSection/ContactSection";
import Header from "./Header";

const Page = ({ children }) => {
  const IS_ENV_RECETTE = process.env.REACT_APP_ENV === "recette";

  return (
    <>
      {IS_ENV_RECETTE === true && (
        <Alert status="warning" justifyContent="center">
          <Box as="i" className="ri-error-warning-fill" fontSize="gamma" marginRight="2w" />
          Environnement de recette
        </Alert>
      )}
      <Header />
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