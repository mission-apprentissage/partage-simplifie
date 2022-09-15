import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select, Stack, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { REGIONS } from "../../../common/constants/territoireConstants.js";

const InscriptionForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        nom: "",
        prenom: "",
        fonction: "",
        email: "",
        telephone: "",
        region: "",
        outils_gestion: [],
        is_consentement_ok: false,
      }}
      validationSchema={Yup.object().shape({
        nom: Yup.string().required("Requis"),
        prenom: Yup.string().required("Requis"),
        fonction: Yup.string().required("Requis"),
        email: Yup.string().email().required("Requis"),
        telephone: Yup.string().required("Requis"),
        is_consentement_ok: Yup.boolean()
          .required(
            "Vous devez consentir à l'utilisation de vos données dans le cadre de la mission du Tableau de bord."
          )
          .oneOf(
            [true],
            "Vous devez consentir à l'utilisation de vos données dans le cadre de la mission du Tableau de bord."
          ),
      })}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form>
            <Stack spacing="2w">
              <Field name="nom">
                {({ field, meta }) => (
                  <FormControl isRequired isInvalid={meta.error && meta.touched}>
                    <Stack spacing="1w">
                      <FormLabel color="grey.800">Nom :</FormLabel>
                      <Input {...field} id={field.name} width="50%" placeholder="" />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </Stack>
                  </FormControl>
                )}
              </Field>

              <Field name="prenom">
                {({ field, meta }) => (
                  <FormControl isRequired isInvalid={meta.error && meta.touched}>
                    <Stack spacing="1w">
                      <FormLabel color="grey.800">Prénom :</FormLabel>
                      <Input {...field} id={field.name} width="50%" placeholder="" />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </Stack>
                  </FormControl>
                )}
              </Field>

              <Field name="fonction">
                {({ field, meta }) => (
                  <FormControl isRequired isInvalid={meta.error && meta.touched}>
                    <Stack spacing="1w">
                      <FormLabel color="grey.800">Fonction :</FormLabel>
                      <Input {...field} id={field.name} width="50%" placeholder="" />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </Stack>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field, meta }) => (
                  <FormControl isRequired isInvalid={meta.error && meta.touched}>
                    <Stack spacing="1w">
                      <FormLabel color="grey.800">E-mail :</FormLabel>
                      <Input {...field} id={field.name} width="50%" placeholder="" />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </Stack>
                  </FormControl>
                )}
              </Field>

              <Field name="telephone">
                {({ field, meta }) => (
                  <FormControl isRequired isInvalid={meta.error && meta.touched}>
                    <Stack spacing="1w">
                      <FormLabel color="grey.800">Téléphone :</FormLabel>
                      <Input {...field} id={field.name} width="50%" placeholder="" />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </Stack>
                  </FormControl>
                )}
              </Field>

              <Field name="region">
                {({ field, meta }) => (
                  <FormControl isRequired isInvalid={meta.error && meta.touched}>
                    <FormLabel color="grey.800">Région :</FormLabel>
                    <Select {...field} width="50%">
                      {[{ nom: "Sélectionnez une région" }, ...REGIONS].map((region, index) => (
                        <option key={index} value={region.nom}>
                          {region.nom}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="is_consentement_ok">
                {({ meta }) => (
                  <FormControl isRequired isInvalid={meta.error && meta.touched}>
                    <HStack marginLeft="1w" marginTop="2w">
                      <Field
                        style={{
                          transform: "scale(2)",
                        }}
                        type="checkbox"
                        name="is_consentement_ok"
                      />
                      <Text>
                        Je consens à ce que mes données soient utilisées dans le cadre de la mission du Tableau de bord.
                      </Text>
                    </HStack>
                    <Text fontSize="omega" marginTop="4w">
                      Le Tableau de bord de l’apprentissage collecte les données des organismes de formation selon le
                      principe de minimisation des données. Pour en savoir plus, veuillez consulter la page d’aide du
                      Tableau de bord.
                    </Text>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <FormLabel color="grey.800"></FormLabel>

              <Button variant="primary" type="submit" width="30%" marginTop="2w">
                Valider le compte
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

InscriptionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default InscriptionForm;
