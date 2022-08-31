import { strict as assert } from "assert";
import { ROLES } from "../../../src/common/constants/roles.js";
import { generateRandomAlphanumericPhrase } from "../../../src/common/utils/cryptoUtils.js";
import { UsersFactory } from "../../../src/factory/usersFactory.js";

describe("Factory Users", () => {
  describe("create", () => {
    it("Vérifie la création d'user via sa factory avec uniquement les champs obligatoires fournis", async () => {
      const testEmail = "user@email.fr";
      const testPassword = generateRandomAlphanumericPhrase(80);
      const testRole = ROLES.CFA;

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
        role: testRole,
      });

      assert.equal(entity.email === testEmail, true);
      assert.equal(entity.role === testRole, true);
      assert.equal(entity.created_at !== null, true);
      assert.equal(entity.updated_at === null, true);
    });

    it("Vérifie la création d'user via sa factory avec tous les champs obligatoires et optionnels fournis", async () => {
      const testEmail = "user@email.fr";
      const testPassword = generateRandomAlphanumericPhrase(80);
      const testRole = ROLES.CFA;
      const testNom = "nom";
      const testPrenom = "prenom";
      const testFonction = "fonction";
      const testTelephone = "telephone";
      const testOutilsGestion = ["outil1", "outil2"];
      const testNom_etablissement = "nom_etablissement";

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
        role: testRole,
        nom: testNom,
        prenom: testPrenom,
        fonction: testFonction,
        telephone: testTelephone,
        outils_gestion: testOutilsGestion,
        nom_etablissement: testNom_etablissement,
      });

      assert.equal(entity.email === testEmail, true);
      assert.equal(entity.role === testRole, true);
      assert.equal(entity.nom === testNom, true);
      assert.equal(entity.prenom === testPrenom, true);
      assert.equal(entity.fonction === testFonction, true);
      assert.equal(entity.telephone === testTelephone, true);
      assert.deepEqual(entity.outils_gestion, testOutilsGestion);
      assert.equal(entity.nom_etablissement === testNom_etablissement, true);
      assert.equal(entity.created_at !== null, true);
      assert.equal(entity.updated_at === null, true);
    });

    it("Vérifie la non création d'user via sa factory si aucun email fourni", async () => {
      const testPassword = generateRandomAlphanumericPhrase(80);
      const testRole = ROLES.CFA;

      const entity = await UsersFactory.create({
        password: testPassword,
        role: testRole,
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'user via sa factory si aucun password fourni", async () => {
      const testEmail = "user@email.fr";
      const testRole = ROLES.CFA;

      const entity = await UsersFactory.create({
        email: testEmail,
        role: testRole,
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'user via sa factory si aucun role fourni", async () => {
      const testEmail = "user@email.fr";
      const testPassword = generateRandomAlphanumericPhrase(80);

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'user via sa factory si un email au mauvais format est fourni", async () => {
      const testEmail = "useremail.fr";
      const testRole = ROLES.CFA;
      const testPassword = generateRandomAlphanumericPhrase(80);

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
        role: testRole,
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'user via sa factory si un password au mauvais format est fourni", async () => {
      const testEmail = "useremail.fr";
      const testRole = ROLES.CFA;
      const testPassword = 123;

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
        role: testRole,
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'user via sa factory si un mauvais role fourni", async () => {
      const testEmail = "user@email.fr";
      const mauvaisRole = "mauvaisRole";
      const testPassword = generateRandomAlphanumericPhrase(80);

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
        role: mauvaisRole,
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'user via sa factory si un nom au mauvais format est fourni", async () => {
      const testEmail = "user@email.fr";
      const testPassword = generateRandomAlphanumericPhrase(80);
      const testRole = ROLES.CFA;

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
        role: testRole,
        nom: 123,
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'user via sa factory si un prenom au mauvais format est fourni", async () => {
      const testEmail = "user@email.fr";
      const testPassword = generateRandomAlphanumericPhrase(80);
      const testRole = ROLES.CFA;

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
        role: testRole,
        prenom: 123,
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'user via sa factory si une fonction au mauvais format est fournie", async () => {
      const testEmail = "user@email.fr";
      const testPassword = generateRandomAlphanumericPhrase(80);
      const testRole = ROLES.CFA;

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
        role: testRole,
        fonction: 123,
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'user via sa factory si un telephone au mauvais format est fourni", async () => {
      const testEmail = "user@email.fr";
      const testPassword = generateRandomAlphanumericPhrase(80);
      const testRole = ROLES.CFA;

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
        role: testRole,
        telephone: 123,
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'user via sa factory si une liste d'outils_gestion au mauvais format est fournie", async () => {
      const testEmail = "user@email.fr";
      const testPassword = generateRandomAlphanumericPhrase(80);
      const testRole = ROLES.CFA;

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
        role: testRole,
        outils_gestion: 123,
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'user via sa factory si un nom_etablissement au mauvais format est fourni", async () => {
      const testEmail = "user@email.fr";
      const testPassword = generateRandomAlphanumericPhrase(80);
      const testRole = ROLES.CFA;

      const entity = await UsersFactory.create({
        email: testEmail,
        password: testPassword,
        role: testRole,
        nom_etablissement: 123,
      });

      assert.equal(entity === null, true);
    });
  });
});
