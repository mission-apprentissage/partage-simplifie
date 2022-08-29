import { strict as assert } from "assert";
import { ROLES } from "../../../src/common/constants/roles.js";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import usersService from "../../../src/services/usersService.js";

describe("Service Users", () => {
  describe("create", () => {
    it("Permet de créer un utilisateur avec les champs obligatoires et un username", async () => {
      const { create } = await usersService();

      const insertedId = await create({
        email: "user@test.fr",
        username: "user",
        password: "password",
        role: ROLES.CFA,
      });

      const found = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      assert.equal(found.email, "user@test.fr");
      assert.equal(found.username, "user");
      assert.equal(found.password.startsWith("$6$rounds="), true);
      assert.equal(found.role, ROLES.CFA);
    });

    it("Permet de créer un utilisateur avec les champs obligatoires sans username", async () => {
      const { create } = await usersService();

      const insertedId = await create({
        email: "user@test.fr",
        password: "password",
        role: ROLES.CFA,
      });

      const found = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      assert.equal(found.email, "user@test.fr");
      assert.equal(found.username, "user@test.fr");
      assert.equal(found.password.startsWith("$6$rounds="), true);
      assert.equal(found.role, ROLES.CFA);
    });

    it("Permet de créer un utilisateur avec mot de passe random quand pas de mot de passe fourni", async () => {
      const { create } = await usersService();

      const insertedId = await create({
        email: "user@test.fr",
        role: ROLES.CFA,
      });

      const found = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      assert.equal(found.email, "user@test.fr");
      assert.equal(found.username, "user@test.fr");
      assert.equal(found.password.startsWith("$6$rounds="), true);
      assert.equal(found.role, ROLES.CFA);
    });

    it("Permet de créer un utilisateur avec le role administrateur", async () => {
      const { create } = await usersService();

      const insertedId = await create({
        email: "user@test.fr",
        role: ROLES.ADMINISTRATOR,
      });

      const found = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      assert.equal(found.email, "user@test.fr");
      assert.equal(found.username, "user@test.fr");
      assert.equal(found.password.startsWith("$6$rounds="), true);
      assert.equal(found.role, ROLES.ADMINISTRATOR);
    });

    it("Permet de créer un utilisateur avec tous les champs optionnels", async () => {
      const { create } = await usersService();

      const testUsername = "user";
      const testEmail = "user@email.fr";
      const testRole = ROLES.ADMINISTRATOR;
      const testNom = "nom";
      const testPrenom = "prenom";
      const testFonction = "fonction";
      const testTelephone = "telephone";
      const testOutilsGestion = ["outil1", "outil2"];
      const testNom_etablissement = "nom_etablissement";

      const insertedId = await create({
        email: testEmail,
        username: testUsername,
        role: testRole,
        nom: testNom,
        prenom: testPrenom,
        fonction: testFonction,
        telephone: testTelephone,
        outils_gestion: testOutilsGestion,
        nom_etablissement: testNom_etablissement,
      });

      const found = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      assert.equal(found.email, testEmail);
      assert.equal(found.username, testUsername);
      assert.equal(found.password.startsWith("$6$rounds="), true);
      assert.equal(found.role, testRole);
      assert.equal(found.nom, testNom);
      assert.equal(found.prenom, testPrenom);
      assert.equal(found.fonction, testFonction);
      assert.equal(found.telephone, testTelephone);
      assert.deepEqual(found.outils_gestion, testOutilsGestion);
      assert.deepEqual(found.nom_etablissement, testNom_etablissement);
    });
  });
});
