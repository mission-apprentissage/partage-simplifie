import { strict as assert } from "assert";
import {
  getValidationResultFromList,
  getValidationResult,
  getFormattedErrors,
  DONNEES_APPRENANT_XLSX_FIELDS,
} from "../../../src/domain/donneesApprenants.js";
import { toDonneesApprenantsFromXlsx } from "../../../src/model/api/donneesApprenantsXlsxMapper.js";
import { createRandomXlsxDonneesApprenant } from "../../utils/data/createRandomDonneesApprenants.js";

describe("Domain DonneesApprenants", () => {
  describe("validate", () => {
    it("Vérifie qu'une donnée apprenant de valeur null est invalide", () => {
      const input = null;
      const result = getValidationResult(input);
      assert.ok(result.error);
    });

    it("Vérifie qu'une donnée apprenant de valeur undefined est invalide", () => {
      const input = undefined;
      const result = getValidationResult(input);
      assert.ok(result.error);
    });

    it("Vérifie qu'une donnée apprenant de valeur objet vide est invalide", () => {
      const input = {};
      const result = getValidationResult(input);
      assert.ok(result.error);
    });

    it("Vérifie qu'une donnée apprenant random mappée sans données du user est invalide", () => {
      const input = createRandomXlsxDonneesApprenant();
      const mappedInput = toDonneesApprenantsFromXlsx(input);
      const result = getValidationResult(mappedInput);
      assert.ok(result.error);
    });

    it("Vérifie qu'une donnée apprenant random mappée avec données du user est valide", () => {
      const input = createRandomXlsxDonneesApprenant();
      const mappedInput = toDonneesApprenantsFromXlsx(input);
      const userFields = {
        user_email: "test@test.fr",
        user_uai: "0000001X",
        user_siret: "00000000000002",
        user_nom_etablissement: "Super Etablissement",
      };
      const mappedInputWithUserFields = { ...mappedInput, ...userFields };
      const result = getValidationResult(mappedInputWithUserFields);
      assert.ok(!result.error);
    });

    it("Vérifie qu'une donnée apprenant random mappée avec données du user mais sans CFD est invalide", () => {
      const input = createRandomXlsxDonneesApprenant();
      const mappedInput = toDonneesApprenantsFromXlsx(input);
      const mappedInputWithoutCfd = { ...mappedInput, cfd: undefined };
      const userFields = {
        user_email: "test@test.fr",
        user_uai: "0000001X",
        user_siret: "00000000000002",
        user_nom_etablissement: "Super Etablissement",
      };
      const mappedInputWithUserFields = { ...mappedInputWithoutCfd, ...userFields };
      const result = getValidationResult(mappedInputWithUserFields);
      assert.ok(result.error);
    });

    it("Vérifie qu'une donnée apprenant random mappée avec données du user mais avec date de naissance invalide est invalide", () => {
      const paramWithDateDeNaissanceInvalid = {};
      paramWithDateDeNaissanceInvalid[DONNEES_APPRENANT_XLSX_FIELDS.DateDeNaissanceApprenant] = "2004-01-10";
      const input = createRandomXlsxDonneesApprenant(paramWithDateDeNaissanceInvalid);

      const userFields = {
        user_email: "test@test.fr",
        user_uai: "0000001X",
        user_siret: "00000000000002",
        user_nom_etablissement: "Super Etablissement",
      };
      const mappedInputWithUserFields = { ...toDonneesApprenantsFromXlsx(input), ...userFields };
      const result = getValidationResult(mappedInputWithUserFields);
      assert.ok(result.error);
    });

    it("Vérifie qu'une donnée apprenant random mappée avec données du user est valide", () => {
      const input = createRandomXlsxDonneesApprenant();
      const mappedInput = toDonneesApprenantsFromXlsx(input);
      const userFields = {
        user_email: "test@test.fr",
        user_uai: "0000001X",
        user_siret: "00000000000002",
        user_nom_etablissement: "Super Etablissement",
      };
      const mappedInputWithUserFields = { ...mappedInput, ...userFields };
      const result = getValidationResult(mappedInputWithUserFields);
      assert.ok(!result.error);
    });
  });

  describe("getValidationResultFromList", () => {
    it("Vérifie qu'une liste contenant une donnée apprenants de valeur null est invalide", () => {
      const randomDonneeApprenant = createRandomXlsxDonneesApprenant();
      const input = [null, randomDonneeApprenant];
      const result = getValidationResultFromList(input);
      assert.ok(result.error);
    });

    it("Vérifie qu'une liste 10 données apprenants contenant des données apprenants sans cfd est invalide", () => {
      const randomList = [];

      for (let index = 0; index < 2; index++) {
        const mappedInput = toDonneesApprenantsFromXlsx(createRandomXlsxDonneesApprenant());
        const userFields = {
          user_email: "test@test.fr",
          user_uai: "0000001X",
          user_siret: "00000000000002",
          user_nom_etablissement: "Super Etablissement",
        };
        const mappedInputWithUserFieldsAndBadCfd = { ...mappedInput, ...userFields, cfd: undefined };
        randomList.push(mappedInputWithUserFieldsAndBadCfd);
      }

      for (let index = 0; index < 8; index++) {
        const mappedInput = toDonneesApprenantsFromXlsx(createRandomXlsxDonneesApprenant());
        const userFields = {
          user_email: "test@test.fr",
          user_uai: "0000001X",
          user_siret: "00000000000002",
          user_nom_etablissement: "Super Etablissement",
        };
        const mappedInputWithUserFields = { ...mappedInput, ...userFields };
        randomList.push(mappedInputWithUserFields);
      }

      const result = getValidationResultFromList(randomList);

      assert.ok(result.error);
      assert.ok(result.error.details.length === 2, true);
      assert.ok(result.error.details[0]?.context?.key === "cfd", true);
      assert.ok(result.error.details[1]?.context?.key === "cfd", true);
    });

    it("Vérifie qu'une liste de données apprenants au bon format est valide", () => {
      const randomList = [];

      for (let index = 0; index < 10; index++) {
        const mappedInput = toDonneesApprenantsFromXlsx(createRandomXlsxDonneesApprenant());
        const userFields = {
          user_email: "test@test.fr",
          user_uai: "0000001X",
          user_siret: "00000000000002",
          user_nom_etablissement: "Super Etablissement",
        };
        const mappedInputWithUserFields = { ...mappedInput, ...userFields };
        randomList.push(mappedInputWithUserFields);
      }

      const result = getValidationResultFromList(randomList);
      assert.ok(!result.error);
    });
  });

  describe("getFormattedErrors", () => {
    it("Vérifie qu'une liste de données apprenants contenant des données apprenants avec cfd au mauvais format est invalide", () => {
      const randomList = [];

      for (let index = 0; index < 2; index++) {
        const mappedInput = toDonneesApprenantsFromXlsx(createRandomXlsxDonneesApprenant());
        const userFields = {
          user_email: "test@test.fr",
          user_uai: "0000001X",
          user_siret: "00000000000002",
          user_nom_etablissement: "Super Etablissement",
        };
        const mappedInputWithUserFieldsAndBadCfd = {
          ...mappedInput,
          ...userFields,
          cfd: 123,
        };
        randomList.push(mappedInputWithUserFieldsAndBadCfd);
      }

      for (let index = 0; index < 8; index++) {
        const mappedInput = toDonneesApprenantsFromXlsx(createRandomXlsxDonneesApprenant());
        const userFields = {
          user_email: "test@test.fr",
          user_uai: "0000001X",
          user_siret: "00000000000002",
          user_nom_etablissement: "Super Etablissement",
        };
        const mappedInputWithUserFields = { ...mappedInput, ...userFields };
        randomList.push(mappedInputWithUserFields);
      }

      const result = getValidationResultFromList(randomList);
      assert.ok(result.error);

      const errorsFormattedList = getFormattedErrors(result.error);
      assert.ok(errorsFormattedList.length === 2, true);
      assert.ok(errorsFormattedList[0].lineNumber === 1, true);
      assert.ok(errorsFormattedList[0].errors.length === 1, true);
      assert.ok(errorsFormattedList[0]?.errors[0]?.errorField === "cfd", true);
      assert.ok(errorsFormattedList[0]?.errors[0]?.errorType === "string.base", true);

      assert.ok(errorsFormattedList[1].lineNumber === 2, true);
      assert.ok(errorsFormattedList[1].errors.length === 1, true);
      assert.ok(errorsFormattedList[1]?.errors[0]?.errorField === "cfd", true);
      assert.ok(errorsFormattedList[1]?.errors[0]?.errorType === "string.base", true);
    });

    it("Vérifie qu'une liste de données apprenants contenant des données apprenants sans cfd et avec date de naissance au mauvais format est invalide", () => {
      const randomList = [];

      for (let index = 0; index < 2; index++) {
        const mappedInput = toDonneesApprenantsFromXlsx(createRandomXlsxDonneesApprenant());
        const userFields = {
          user_email: "test@test.fr",
          user_uai: "0000001X",
          user_siret: "00000000000002",
          user_nom_etablissement: "Super Etablissement",
        };
        const mappedInputWithUserFieldsAndBadCfdAndBadBirthDate = {
          ...mappedInput,
          ...userFields,
          cfd: undefined,
          date_de_naissance_apprenant: 123,
        };
        randomList.push(mappedInputWithUserFieldsAndBadCfdAndBadBirthDate);
      }

      for (let index = 0; index < 8; index++) {
        const mappedInput = toDonneesApprenantsFromXlsx(createRandomXlsxDonneesApprenant());
        const userFields = {
          user_email: "test@test.fr",
          user_uai: "0000001X",
          user_siret: "00000000000002",
          user_nom_etablissement: "Super Etablissement",
        };
        const mappedInputWithUserFields = { ...mappedInput, ...userFields };
        randomList.push(mappedInputWithUserFields);
      }

      const result = getValidationResultFromList(randomList);
      assert.ok(result.error);

      const errorsFormattedList = getFormattedErrors(result.error);
      assert.ok(errorsFormattedList.length === 2, true);
      assert.ok(errorsFormattedList[0].lineNumber === 1, true);
      assert.ok(errorsFormattedList[0].errors.length === 2, true);
      assert.ok(errorsFormattedList[0]?.errors[0]?.errorField === "cfd", true);
      assert.ok(errorsFormattedList[0]?.errors[0]?.errorType === "any.required", true);
      assert.ok(errorsFormattedList[0]?.errors[1]?.errorField === "date_de_naissance_apprenant", true);
      assert.ok(errorsFormattedList[0]?.errors[1]?.errorType === "date.base", true);

      assert.ok(errorsFormattedList[1].lineNumber === 2, true);
      assert.ok(errorsFormattedList[1].errors.length === 2, true);
      assert.ok(errorsFormattedList[1]?.errors[0]?.errorField === "cfd", true);
      assert.ok(errorsFormattedList[1]?.errors[0]?.errorType === "any.required", true);
      assert.ok(errorsFormattedList[1]?.errors[1]?.errorField === "date_de_naissance_apprenant", true);
      assert.ok(errorsFormattedList[1]?.errors[1]?.errorType === "date.base", true);
    });
  });
});
