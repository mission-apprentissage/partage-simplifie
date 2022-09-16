import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

import { Page, Section } from "../../common/components";
import { PRODUCT_NAME } from "../../common/constants/product";

const AdminHomePage = () => {
  return (
    <Page>
      <Section withShadow paddingY="4w">
        <Box>
          <Flex>
            <Box flex="1">
              <Heading as="h1" variant="h1">
                Le {PRODUCT_NAME}
              </Heading>
              <Text fontSize="beta" color="grey.800" marginTop="4w">
                Page Admin
              </Text>
            </Box>
          </Flex>
        </Box>
      </Section>
    </Page>
  );
};

export default AdminHomePage;
