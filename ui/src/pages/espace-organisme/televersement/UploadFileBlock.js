import { Box, Button, HStack, Input, Link, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

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
      // TODO Waiting API Simulation
      await new Promise((r) => setTimeout(r, 3000));
      // TODO Log file & comment
      console.log(file);
      console.log(`Comment : ${comment}`);
      // TODO Sample Error
      throw new Error("test erreur");
      // setUploadModalConfirmState(UPLOAD_STATES.SUCCESS);
    } catch (err) {
      setUploadModalConfirmState(UPLOAD_STATES.ERROR);
      // TODO Sample errors list
      setUploadErrors([
        { field: "champTest", message: "Le champ est vide" },
        { field: "champTest2", message: "Le champ n'est pas valide" },
      ]);
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
          Important : Taille maximale du fichier : xx Mo. Formats supportés : .csv uniquement.
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

      <Box marginTop="4w">
        <input type="file" name="file" accept=".csv" onChange={handleFileInput} />
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

      <Button
        type="submit"
        onClick={() => {
          setUploadModalConfirmState(UPLOAD_STATES.INITIAL);
          onOpen();
        }}
        variant="primary"
        marginTop="4w"
      >
        Valider
      </Button>

      <TeleversementConfirmModal
        file={file}
        isOpen={isOpen}
        onClose={onClose}
        formState={uploadModalConfirmState}
        submitUpload={submitUpload}
      />
    </Box>
  );
};

export default UploadFileBlock;