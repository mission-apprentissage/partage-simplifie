import { Box, Center, Heading, Image, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";

import { Page, Section } from "../../common/components";
import { NAVIGATION_PAGES } from "../../common/constants/navigationPages";
import outline2 from "./outline_II.svg";

const Page404 = () => {
  return (
    <Page>
      <Section withShadow color="grey.800" paddingY="4w">
        <Center>
          <Box width="769px" border="1px solid" borderColor="#E3E3FD" padding="4w" marginTop="6w">
            <Stack alignItems="center" spacing="4w">
              <Image src={outline2} alt="Page non trouvée" width="189px" />
              <Heading fontSize="28px" fontWeight="bold">
                Page non trouvée
              </Heading>
              <Text color="grey.800" fontSize="zeta" marginBottom="2w">
                La page que vous recherchez n’existe pas ou a été déplacée
              </Text>

              <Link
                href={NAVIGATION_PAGES.Accueil.path}
                _hover={{ textDecoration: "none", color: "grey.800", bg: "galt" }}
                color="bluefrance"
              >
                <Box as="i" className="ri-arrow-left-line" marginRight="1w" verticalAlign="middle" />
                <Box as="span" verticalAlign="middle">
                  Retourner à la page d&apos;accueil
                </Box>
              </Link>
            </Stack>
          </Box>
        </Center>
      </Section>
    </Page>
  );
};

export default Page404;
