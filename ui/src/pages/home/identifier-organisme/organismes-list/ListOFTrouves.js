import { Box, Button, Link, Stack, Text, Tooltip } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";

import AlertOFNotIdentified from "./AlertOFNotIdentified.js";
import InfoPlusieursOFTrouves from "./InfoPlusieursOFTrouves.js";
import InfoUniqueOFTrouve from "./InfoUniqueOFTrouve.js";

const ListOFTrouves = ({ searchUai, organismes }) => {
  const [showOFNotIdentified, setShowOFNotIdentified] = useState(false);

  return (
    <>
      {showOFNotIdentified === false && (
        <Stack spacing="4w">
          {organismes.length === 1 && <InfoUniqueOFTrouve uai={searchUai} />}
          {organismes.length > 1 && <InfoPlusieursOFTrouves uai={searchUai} />}
          {organismes.map(
            ({ uai, siret, siren, nature, nom_etablissement, reseaux, adresse, region, academie }, index) => (
              <Stack key={index}>
                <Box width="100%" backgroundColor="grey.100" padding="2w">
                  <Text fontSize="gamma">
                    <strong>{nom_etablissement}</strong> - UAI : {uai} - SIRET {siret}
                  </Text>
                </Box>
                <Stack spacing="1v">
                  <Text>
                    UAI : <strong>{uai}</strong>
                    <Tooltip
                      background="bluefrance"
                      color="white"
                      label={
                        <Box padding="1w">
                          <Text marginBottom="2w">
                            <strong>UAI</strong>
                          </Text>
                          <Text>La donnée `Organisme` est récupérée dans le Référentiel de l&apos;apprentissage.</Text>
                        </Box>
                      }
                      aria-label="La donnée `Organisme` est récupérée dans le Référentiel de l'apprentissage."
                    >
                      <Box
                        as="i"
                        className="ri-information-line"
                        fontSize="epsilon"
                        color="grey.500"
                        marginLeft="1w"
                        verticalAlign="middle"
                      />
                    </Tooltip>
                  </Text>
                  <Text>
                    Nature : <strong>{nature}</strong>
                    <Tooltip
                      background="bluefrance"
                      color="white"
                      label={
                        <Box padding="1w">
                          <Text marginBottom="2w">
                            <strong>Nature</strong>
                          </Text>
                          <Text>
                            La donnée `Nature` est déduite des relations entre les différents organismes (base des
                            Carif-Oref).
                          </Text>
                        </Box>
                      }
                      aria-label="La donnée “Nature” est déduite des relations entre les différents organismes (base des
                      Carif-Oref)."
                    >
                      <Box
                        as="i"
                        className="ri-information-line"
                        fontSize="epsilon"
                        color="grey.500"
                        marginLeft="1w"
                        verticalAlign="middle"
                      />
                    </Tooltip>
                  </Text>
                  <Text>
                    SIREN : <strong>{siren}</strong>
                    <Tooltip
                      background="bluefrance"
                      color="white"
                      label={
                        <Box padding="1w">
                          <Text marginBottom="2w">
                            <strong>SIREN</strong>
                          </Text>
                          <Text>
                            La donnée `SIREN` provient de l’INSEE. Si cette donnée est erronée, merci de leur signaler.
                          </Text>
                        </Box>
                      }
                      aria-label="La donnée “SIREN” provient de l’INSEE. Si cette donnée est erronée, merci de leur signaler. "
                    >
                      <Box
                        as="i"
                        className="ri-information-line"
                        fontSize="epsilon"
                        color="grey.500"
                        marginLeft="1w"
                        verticalAlign="middle"
                      />
                    </Tooltip>
                  </Text>
                  <Text>
                    SIRET : <strong>{siret}</strong>
                    <Tooltip
                      background="bluefrance"
                      color="white"
                      label={
                        <Box padding="1w">
                          <Text marginBottom="2w">
                            <strong>SIRET</strong>
                          </Text>
                          <Text>
                            La donnée `SIRET` et l’état administratif de l’organisme `en activité` ou `fermé` provient
                            de l’INSEE. Si cette information est erronée, merci de leur signaler.
                          </Text>
                        </Box>
                      }
                      aria-label="La donnée `SIRET` et l’état administratif de l’organisme `en activité` ou `fermé` provient de
                      l’INSEE. Si cette information est erronée, merci de leur signaler."
                    >
                      <Box
                        as="i"
                        className="ri-information-line"
                        fontSize="epsilon"
                        color="grey.500"
                        marginLeft="1w"
                        verticalAlign="middle"
                      />
                    </Tooltip>
                  </Text>
                  <Text>
                    Raison sociale : <strong>{nom_etablissement}</strong>
                    <Tooltip
                      background="bluefrance"
                      color="white"
                      label={
                        <Box padding="1w">
                          <Text marginBottom="2w">
                            <strong>Raison sociale</strong>
                          </Text>
                          <Text>
                            La donnée `Raison sociale` provient de l’INSEE. Si cette information est erronée, merci de
                            leur signaler.
                          </Text>
                        </Box>
                      }
                      aria-label="La donnée `Raison sociale` provient de l’INSEE. Si cette information est erronée, merci de leur
                      signaler."
                    >
                      <Box
                        as="i"
                        className="ri-information-line"
                        fontSize="epsilon"
                        color="grey.500"
                        marginLeft="1w"
                        verticalAlign="middle"
                      />
                    </Tooltip>
                  </Text>
                  <Text>
                    Réseaux : <strong>{reseaux.join(", ")}</strong>
                    <Tooltip
                      background="bluefrance"
                      color="white"
                      label={
                        <Box padding="1w">
                          <Text marginBottom="2w">
                            <strong>Réseau</strong>
                          </Text>
                          <Text>
                            La donnée `Réseau` provient des Réseaux qui ont transmis leur liste d’organismes au Tableau
                            de bord.
                          </Text>
                        </Box>
                      }
                      aria-label="La donnée `Réseau` provient des Réseaux qui ont transmis leur liste d’organismes au Tableau de
                      bord."
                    >
                      <Box
                        as="i"
                        className="ri-information-line"
                        fontSize="epsilon"
                        color="grey.500"
                        marginLeft="1w"
                        verticalAlign="middle"
                      />
                    </Tooltip>
                  </Text>
                  <Text>
                    Adresse : <strong>{adresse}</strong>
                    <Tooltip
                      background="bluefrance"
                      color="white"
                      label={
                        <Box padding="1w">
                          <Text marginBottom="2w">
                            <strong>Adresse</strong>
                          </Text>
                          <Text>
                            La donnée `Adresse` provient de l’INSEE. Si cette information est erronée, merci de leur
                            signaler.
                          </Text>
                        </Box>
                      }
                      aria-label="La donnée `Adresse` provient de l’INSEE. Si cette information est erronée, merci de leur signaler."
                    >
                      <Box
                        as="i"
                        className="ri-information-line"
                        fontSize="epsilon"
                        color="grey.500"
                        marginLeft="1w"
                        verticalAlign="middle"
                      />
                    </Tooltip>
                  </Text>
                  <Text>
                    Région : <strong>{region}</strong>
                    <Tooltip
                      background="bluefrance"
                      color="white"
                      label={
                        <Box padding="1w">
                          <Text marginBottom="2w">
                            <strong>Région</strong>
                          </Text>
                          <Text>La donnée `Région` est déduite de la donnée `Adresse`.</Text>
                        </Box>
                      }
                      aria-label="La donnée `Région` est déduite de la donnée `Adresse`."
                    >
                      <Box
                        as="i"
                        className="ri-information-line"
                        fontSize="epsilon"
                        color="grey.500"
                        marginLeft="1w"
                        verticalAlign="middle"
                      />
                    </Tooltip>
                  </Text>
                  <Text>
                    Académie : <strong>{academie}</strong>
                    <Tooltip
                      background="bluefrance"
                      color="white"
                      label={
                        <Box padding="1w">
                          <Text marginBottom="2w">
                            <strong>Académie</strong>
                          </Text>
                          <Text>La donnée `Académie` est déduite de la donnée `Adresse`.</Text>
                        </Box>
                      }
                      aria-label="test"
                    >
                      <Box
                        as="i"
                        className="ri-information-line"
                        fontSize="epsilon"
                        color="grey.500"
                        marginLeft="1w"
                        verticalAlign="middle"
                      />
                    </Tooltip>
                  </Text>
                </Stack>
                <Stack spacing="2w">
                  <Button marginTop="4w" width="20%" variant="secondary">
                    Ceci est mon organisme
                  </Button>
                  <Link onClick={() => setShowOFNotIdentified(true)} color="bluefrance" textDecoration="underline">
                    Je ne connais pas mon UAI
                  </Link>
                </Stack>
              </Stack>
            )
          )}
        </Stack>
      )}

      {showOFNotIdentified === true && <AlertOFNotIdentified uai={searchUai} />}
    </>
  );
};

ListOFTrouves.propTypes = {
  searchUai: PropTypes.string.isRequired,
  organismes: PropTypes.arrayOf(
    PropTypes.shape({
      uai: PropTypes.string.isRequired,
      siren: PropTypes.string.isRequired,
      siret: PropTypes.string.isRequired,
      nature: PropTypes.string.isRequired,
      nom_etablissement: PropTypes.string.isRequired,
      reseaux: PropTypes.arrayOf(PropTypes.string).isRequired,
      adresse: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      academie: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ListOFTrouves;
