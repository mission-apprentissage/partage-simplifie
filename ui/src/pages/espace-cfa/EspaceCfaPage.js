import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

import { Page, Section } from "../../common/components";
import { PRODUCT_NAME } from "../../common/constants/product";

const EspaceCfaPage = () => {
  return (
    <Page>
      <Section withShadow paddingY="4w">
        <Box>
          <Flex>
            <Box flex="1">
              <Heading as="h1" fontSize="40px">
                Le {PRODUCT_NAME}
              </Heading>
              <Text fontSize="beta" color="grey.800" marginTop="4w">
                Page CFA
              </Text>
            </Box>
          </Flex>
        </Box>
      </Section>
    </Page>
  );
};

export default EspaceCfaPage;
