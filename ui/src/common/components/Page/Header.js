import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";

import { PRODUCT_NAME } from "../../constants/product";
import useAuth from "../../hooks/useAuth.js";
import LoginButton from "../LoginButton/LoginButton";
import Logo from "../Logo/Logo";
import LogoutButton from "../LogoutButton/LogoutButton";
import Section from "../Section/Section";

const Header = () => {
  const [auth] = useAuth();
  const isLoggedIn = Boolean(auth?.sub);

  return (
    <Section as="header">
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Logo />
          <Box marginLeft="5w">
            <Heading as="h1" variant="h1" fontSize="gamma">
              Le {PRODUCT_NAME}{" "}
            </Heading>
            <Text fontFamily="Marianne" color="grey.700" fontSize="zeta">
              Mettre à disposition des différents acteurs les données clés de l&apos;apprentissage en temps réel
            </Text>
          </Box>
        </Flex>
        <HStack justifyContent="space-between">{isLoggedIn === true ? <LogoutButton /> : <LoginButton />}</HStack>
      </Flex>
    </Section>
  );
};

Header.propTypes = {};

export default Header;
