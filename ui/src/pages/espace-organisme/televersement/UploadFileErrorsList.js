import { Box, HStack, Stack, Text, Tooltip } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { donneesApprenantsFields } from "../../../common/domain/donneesApprenants.js";

const UploadFileErrorsList = ({ uploadErrors, originalUploadLength }) => {
  return (
    <Stack marginTop="2w" spacing="2w">
      {uploadErrors.map((item, index) => {
        const fieldLabel = donneesApprenantsFields[item.errorField].label;
        const fieldFormat = donneesApprenantsFields[item.errorField].format;
        const fieldTooltip = donneesApprenantsFields[item.errorField].tooltip;

        const badFormatErrors = item.errorsForField.filter((error) => error?.type.includes(".base"));
        const requiredErrors = item.errorsForField.filter((error) => error?.type.includes(".required"));

        return (
          <>
            <Box key={index} backgroundColor="grey.100" padding="2w">
              <HStack fontSize="gamma">
                <Text fontWeight="bold" color="#FF2424">
                  {item.errorsForField.length} erreurs
                </Text>
                <Text color="black">
                  sur la colonne {fieldLabel} sur {originalUploadLength} lignes complétées
                </Text>
              </HStack>
            </Box>

            {badFormatErrors.length > 0 && (
              <Text size="epsilon" color="black">
                Le champ {fieldLabel} est <strong>erroné</strong> sur {badFormatErrors.length} lignes. Veuillez les
                corriger en respectant le format attendu : <strong>{fieldFormat}</strong>{" "}
                <Tooltip
                  background="bluefrance"
                  color="white"
                  label={
                    <Box padding="1w">
                      <Text>
                        <strong>{fieldTooltip.title}</strong>
                      </Text>
                      <Text style={{ whiteSpace: "pre-wrap" }}>{fieldTooltip.text}</Text>
                    </Box>
                  }
                  aria-label={fieldLabel}
                >
                  <Box
                    as="i"
                    className="ri-information-line"
                    fontSize="epsilon"
                    color="bluefrance"
                    marginLeft="1w"
                    verticalAlign="middle"
                  />
                </Tooltip>
              </Text>
            )}

            {requiredErrors.length > 0 && (
              <Text size="epsilon" color="black">
                Le champ {fieldLabel} est <strong>manquant</strong> sur {requiredErrors.length} lignes. Ce champ est
                obligatoire. Veuillez compléter en respectant le format attendu.
              </Text>
            )}
          </>
        );
      })}
    </Stack>
  );
};

UploadFileErrorsList.propTypes = {
  uploadErrors: PropTypes.arrayOf(
    PropTypes.shape({
      errorField: PropTypes.string.isRequired,
      errorsForField: PropTypes.object.isRequired,
    })
  ),
  originalUploadLength: PropTypes.string.isRequired,
};

export default UploadFileErrorsList;
