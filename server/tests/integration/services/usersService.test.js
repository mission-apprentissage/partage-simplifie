import { strict as assert } from "assert";
import { ROLES } from "../../../src/common/constants/roles.js";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import usersService from "../../../src/services/usersService.js";
import { differenceInCalendarDays, differenceInHours, subMinutes } from "date-fns";

describe("Service Users", () => {
  describe("createUser", () => {
    it("Permet de créer un utilisateur avec les champs obligatoires et un username", async () => {
      const { createUser } = await usersService();

      const insertedId = await createUser({
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
      const { createUser } = await usersService();

      const insertedId = await createUser({
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
      const { createUser } = await usersService();

      const insertedId = await createUser({
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
      const { createUser } = await usersService();

      const insertedId = await createUser({
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
      const { createUser } = await usersService();

      const testUsername = "user";
      const testEmail = "user@email.fr";
      const testRole = ROLES.ADMINISTRATOR;
      const testNom = "nom";
      const testPrenom = "prenom";
      const testFonction = "fonction";
      const testTelephone = "telephone";
      const testOutilsGestion = ["outil1", "outil2"];
      const testNom_etablissement = "nom_etablissement";

      const insertedId = await createUser({
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

  describe("generatePasswordUpdateToken", () => {
    it("Génère un token avec expiration à +48h", async () => {
      const { createUser, generatePasswordUpdateToken } = await usersService();

      const testUserEmail = "user@test.fr";
      const testUsername = "user";

      // Création du user
      const insertedId = await createUser({
        email: testUserEmail,
        username: testUsername,
        role: ROLES.CFA,
      });

      // Génération du token et récupération du user en bdd
      const token = await generatePasswordUpdateToken(testUsername);
      const found = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      assert.equal(found.password_update_token, token);
      // password token should expire in 48h
      assert.equal(differenceInHours(found.password_update_token_expiry, new Date()), 47);
      assert.equal(differenceInCalendarDays(found.password_update_token_expiry, new Date()), 2);
    });

    it("Renvoie une erreur quand le user n'est pas trouvé", async () => {
      const { createUser, generatePasswordUpdateToken } = await usersService();

      // create user
      await createUser({ email: "KO@test.Fr", username: "KO", role: ROLES.CFA });

      await assert.rejects(
        () => generatePasswordUpdateToken("user"),
        (err) => {
          assert.equal(err.message, "User not found");
          return true;
        }
      );
    });
  });

  describe("updatePassword", () => {
    it("modifie le mot de passe d'un user et invalide le token d'update", async () => {
      const { createUser, updatePassword, generatePasswordUpdateToken } = await usersService();

      // Création du user
      const insertedId = await createUser({
        email: "user@test.fr",
        username: "user",
        role: ROLES.CFA,
      });

      const foundBeforeUpdate = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      // generate update token
      const token = await generatePasswordUpdateToken("user");
      await updatePassword(token, "new-password-strong");

      const foundAfterUpdate = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      assert.notEqual(foundAfterUpdate.password, foundBeforeUpdate.password);
      assert.equal(foundAfterUpdate.password_update_token, null);
      assert.equal(foundAfterUpdate.password_update_token_expiry, null);
    });

    it("renvoie une erreur quand le token passé ne permet pas de retrouver le user", async () => {
      const { createUser, updatePassword, generatePasswordUpdateToken } = await usersService();

      // Création du user
      await createUser({
        email: "user@test.fr",
        username: "user",
        role: ROLES.CFA,
      });

      // generate update token
      await generatePasswordUpdateToken("user");

      await assert.rejects(
        () => updatePassword("wrong token", "new-password-strong"),
        (err) => {
          assert.equal(err.message, "User not found");
          return true;
        }
      );
    });

    it("renvoie une erreur lorsque le nouveau mot de passe est trop court", async () => {
      const { createUser, updatePassword, generatePasswordUpdateToken } = await usersService();

      // Création du user
      await createUser({
        email: "user@test.fr",
        username: "user",
        role: ROLES.CFA,
      });

      // generate update token
      const token = await generatePasswordUpdateToken("user");

      const shortPassword = "hello-world";

      await assert.rejects(
        () => updatePassword(token, shortPassword),
        (err) => {
          assert.equal(err.message, "Password must be valid (at least 16 characters)");
          return true;
        }
      );
    });

    it("renvoie une erreur lorsque l'update est fait plus de 24h après la création du token", async () => {
      const { createUser, updatePassword, generatePasswordUpdateToken } = await usersService();

      // Création du user
      await createUser({
        email: "user@test.fr",
        username: "user",
        role: ROLES.CFA,
      });

      // generate update token
      const token = await generatePasswordUpdateToken("user");

      // force password_update_token_expiry to 10 minutes ago
      await dbCollection(COLLECTIONS_NAMES.Users).findOneAndUpdate(
        { username: "user" },
        { $set: { password_update_token_expiry: subMinutes(new Date(), 10) } },
        { new: true }
      );

      await assert.rejects(
        () => updatePassword(token, "super-long-strong-password"),
        (err) => {
          assert.equal(err.message, "Password update token has expired");
          return true;
        }
      );
    });

    it("renvoie une erreur lorsque l'update est tenté avec un token null", async () => {
      const { createUser, updatePassword } = await usersService();

      // Création du user
      await createUser({
        email: "user@test.fr",
        username: "user",
        role: ROLES.CFA,
      });

      await assert.rejects(
        () => updatePassword(null, "super-long-strong-password"),
        (err) => {
          assert.equal(err.message, "User not found");
          return true;
        }
      );
    });

    it("renvoie une erreur lorsque l'update a déjà été fait", async () => {
      const { createUser, updatePassword, generatePasswordUpdateToken } = await usersService();

      // Création du user
      await createUser({
        email: "user@test.fr",
        username: "user",
        role: ROLES.CFA,
      });

      // generate update token
      const token = await generatePasswordUpdateToken("user");

      // update password first time
      await updatePassword(token, "new-password-strong");

      // try again
      await assert.rejects(
        () => updatePassword(token, "super-long-strong-password"),
        (err) => {
          assert.equal(err.message, "User not found");
          return true;
        }
      );
    });
  });
});
