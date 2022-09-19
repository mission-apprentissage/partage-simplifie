import { Stack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

import AlertBlock from "../../../common/components/AlertBlock/AlertBlock.js";

const UploadFileErrors = ({ uploadErrors }) => {
  return (
    <Stack marginTop="2w" spacing="2w">
      <AlertBlock variant="error">
        <Text>
          <strong>Erreurs dans le fichier.</strong>
        </Text>
        <Text marginBottom="2w">
          Veuillez corriger les champs sur votre ordinateur et téléversez à nouveau votre fichier.
        </Text>
        {uploadErrors.map((item, index) => (
          <Text key={index}>
            Erreur sur le champ{" "}
            <strong>
              {item.field} : <u>{item.message}</u>
            </strong>
          </Text>
        ))}
      </AlertBlock>
    </Stack>
  );
};

UploadFileErrors.propTypes = {
  uploadErrors: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ),
};
export default UploadFileErrors;
