import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { TEMPLATE_FILE_EXTENSION, TEMPLATE_FILE_SIZE } from "../../constants/product.js";

const DownloadTemplateFile = () => {
  return (
    <Box width="40%" border="1px solid" borderColor="#DDDDDD" padding="4w" marginTop="6w">
      <Heading fontSize="22px" as="h2">
        Comprendre les données récoltées
      </Heading>
      <Text fontSize="zeta" marginTop="2w">
        Téléchargez ce document explicatif pour comprendre les futurs champs à remplir par vos soins et les raisons pour
        lesquelles ils sont récoltés par l’équipe du Tableau de bord.
      </Text>
      <Flex marginTop="4w">
        <Text marginTop="1w" fontSize="omega" color="#666666" textDecoration="underline" flex="1">
          {TEMPLATE_FILE_EXTENSION} – {TEMPLATE_FILE_SIZE} Ko
        </Text>
        <Box as="i" color="bluefrance" fontSize="beta" className="ri-download-line" />
      </Flex>
    </Box>
  );
};

export default DownloadTemplateFile;
