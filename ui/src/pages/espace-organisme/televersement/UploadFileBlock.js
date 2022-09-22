import { Box, Button, HStack, Input, Link, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import { uploadDonneesApprenantsFile } from "../../../common/api/api.js";
import { CONTACT_ADDRESS } from "../../../common/constants/product.js";
import TeleversementConfirmModal from "./TeleversementConfirmModal.js";
import UploadFileErrors from "./UploadFileErrors.js";
import UploadFileSuccess from "./UploadFileSuccess.js";
import { UPLOAD_STATES } from "./UploadStates.js";

const UploadFileBlock = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [file, setFile] = useState();
  const [comment, setComment] = useState(null);
  const [uploadModalConfirmState, setUploadModalConfirmState] = useState(UPLOAD_STATES.INITIAL);
  const [uploadErrors, setUploadErrors] = useState([]);

  const handleFileInput = (e) => setFile(e.target.files[0]);

  const submitUpload = async () => {
    setUploadModalConfirmState(UPLOAD_STATES.LOADING);

    try {
      const { errors } = await uploadDonneesApprenantsFile(file, comment);
      if (errors.length > 0) {
        setUploadErrors(errors);
        setUploadModalConfirmState(UPLOAD_STATES.ERROR);
      } else {
        setUploadModalConfirmState(UPLOAD_STATES.SUCCESS);
      }
    } catch (err) {
      setUploadModalConfirmState(UPLOAD_STATES.ERROR);
    } finally {
      onClose();
    }
  };

  return (
    <Box width="70%" background="#E3E3FD" marginTop="6w" padding="4w">
      <Text fontSize="gamma" fontWeight="bold" color="bluefrance">
        Transmettre le document de dépôt de vos données
      </Text>

      <HStack marginTop="4w">
        <Box as="i" color="bluefrance" fontSize="alpha" className="ri-alert-fill" marginRight="2w" />
        <Text fontSize="delta" color="bluefrance" fontWeight="bold" marginTop="2w">
          Important : cette première version de l’outil ne permet pas encore l’archivage. Tout fichier téléversé écrase
          la précédente.
        </Text>
      </HStack>

      {uploadModalConfirmState === UPLOAD_STATES.SUCCESS && <UploadFileSuccess />}
      {uploadModalConfirmState === UPLOAD_STATES.ERROR && <UploadFileErrors uploadErrors={uploadErrors} />}

      <Stack>
        <Text fontSize="zeta" color="gray.600" marginTop="2w">
          Important : Taille maximale du fichier : xx Mo. Formats supportés : .xlsx uniquement.
        </Text>
        <Text fontSize="zeta" color="gray.600" marginTop="2w">
          Un seul fichier possible.
        </Text>
        <Text fontSize="zeta" color="gray.600" marginTop="2w">
          Le traitement des données est assuré par la Mission Nationale de l’Apprentissage. Pour toute information sur
          la protection des données, consultez la FAQ ou demandez l’AIPD à{" "}
          <Link href={`mailto:${CONTACT_ADDRESS}`} color="bluefrance">
            {CONTACT_ADDRESS}
          </Link>
        </Text>
      </Stack>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setUploadModalConfirmState(UPLOAD_STATES.INITIAL);
          onOpen();
        }}
      >
        <Box marginTop="4w">
          <input required type="file" name="file" accept=".xlsx" onChange={handleFileInput} />
        </Box>

        <Box marginTop="4w">
          <Text marginBottom="8px">Si besoin laissez un commentaire : </Text>
          <Input
            id="commentaire"
            name="commentaire"
            background="white"
            placeholder=""
            size="sm"
            onInput={(e) => setComment(e.target.value)}
          />
        </Box>

        <Button type="submit" variant="primary" marginTop="4w">
          Valider
        </Button>

        <TeleversementConfirmModal
          file={file}
          isOpen={isOpen}
          onClose={onClose}
          formState={uploadModalConfirmState}
          submitUpload={submitUpload}
        />
      </form>
    </Box>
  );
};

export default UploadFileBlock;
