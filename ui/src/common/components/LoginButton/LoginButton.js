import { Box, Link, useDisclosure } from "@chakra-ui/react";
import React from "react";

import LoginModal from "../../../pages/login/LoginModal.js";
import { Padlock } from "../../../theme/components/icons";

const LoginButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Link variant="link" onClick={onOpen}>
        <Padlock verticalAlign="middle" color="bluefrance" h="12px" w="12px" marginRight="1w" />
        <Box as="span" verticalAlign="middle">
          Connexion
        </Box>
      </Link>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default LoginButton;
