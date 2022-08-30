import { strict as assert } from "assert";
import { ROLES } from "../../../src/common/constants/roles.js";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import usersService from "../../../src/services/usersService.js";
import { differenceInCalendarDays, differenceInHours, subMinutes } from "date-fns";
import { ObjectId } from "mongodb";

describe("Service Users", () => {
  describe("createUser", () => {
    it("Permet de créer un utilisateur avec les champs obligatoires et un username", async () => {
      const { createUser } = usersService();

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
      const { createUser } = usersService();

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
      const { createUser } = usersService();

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
      const { createUser } = usersService();

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
      const { createUser } = usersService();

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
      const { createUser, generatePasswordUpdateToken } = usersService();

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
      assert.equal(differenceInHours(found.password_update_token_expiry, new Date()), 48);
      assert.equal(differenceInCalendarDays(found.password_update_token_expiry, new Date()), 2);
    });

    it("Renvoie une erreur quand le user n'est pas trouvé", async () => {
      const { createUser, generatePasswordUpdateToken } = usersService();

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
      const { createUser, updatePassword, generatePasswordUpdateToken } = usersService();

      // Création du user
      const insertedId = await createUser({
        email: "user@test.fr",
        username: "user@test.fr",
        role: ROLES.CFA,
      });

      const foundBeforeUpdate = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      // generate update token
      const token = await generatePasswordUpdateToken("user@test.fr");
      const updatedUser = await updatePassword(token, "new-password-strong");

      assert.equal(updatedUser.email, "user@test.fr");
      assert.equal(updatedUser.username, "user@test.fr");
      assert.equal(updatedUser.role, ROLES.CFA);
      assert.equal(updatedUser.password_update_token, null);
      assert.equal(updatedUser.password_update_token_expiry, null);

      const foundAfterUpdate = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      assert.notEqual(foundAfterUpdate.password, foundBeforeUpdate.password);
      assert.equal(foundAfterUpdate.password_update_token, null);
      assert.equal(foundAfterUpdate.password_update_token_expiry, null);
    });

    it("renvoie une erreur quand le token passé ne permet pas de retrouver le user", async () => {
      const { createUser, updatePassword, generatePasswordUpdateToken } = usersService();

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
      const { createUser, updatePassword, generatePasswordUpdateToken } = usersService();

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
      const { createUser, updatePassword, generatePasswordUpdateToken } = usersService();

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
        { $set: { password_update_token_expiry: subMinutes(new Date(), 10) } }
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
      const { createUser, updatePassword } = usersService();

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
      const { createUser, updatePassword, generatePasswordUpdateToken } = usersService();

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

  describe("authenticate", () => {
    it("Vérifie que le mot de passe est valide", async () => {
      const { createUser, authenticate } = await usersService();

      // Création du user
      await createUser({
        email: "user@test.fr",
        username: "user",
        password: "password",
        role: ROLES.CFA,
      });

      const user = await authenticate("user", "password");
      assert.equal(user.username === "user", true);
    });

    it("Vérifie que le mot de passe est invalide", async () => {
      const { createUser, authenticate } = await usersService();

      // Création du user
      await createUser({
        email: "user@test.fr",
        username: "user",
        password: "password",
        role: ROLES.CFA,
      });

      const user = await authenticate("user", "INVALID");
      assert.equal(user, null);
    });
  });

  describe("getUser", () => {
    it("renvoie le bon utilisateur quand le username fourni est valide", async () => {
      const { createUser, getUser } = await usersService();

      const usernameTest = "userTest";

      // Création du user
      const insertedId = await createUser({
        email: "user@test.fr",
        username: usernameTest,
        role: ROLES.CFA,
      });

      // find user
      const found = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });
      assert.equal(found.username === usernameTest, true);
      assert.equal(found.role === ROLES.CFA, true);
      assert.equal(found._id !== null, true);

      // get user
      const gettedUser = await getUser(found.username);
      assert.equal(gettedUser.username === found.username, true);
      assert.equal(gettedUser.role === ROLES.CFA, true);
      assert.equal(gettedUser._id !== null, true);
    });

    it("ne renvoie pas le bon utilisateur quand le username fourni n'est pas valide", async () => {
      const { createUser, getUser } = await usersService();

      const usernameTest = "userTest";

      // Création du user
      const insertedId = await createUser({
        email: "user@test.fr",
        username: usernameTest,
        role: ROLES.CFA,
      });

      // find user
      const found = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });
      assert.equal(found.username === usernameTest, true);
      assert.equal(found.role === ROLES.CFA, true);
      assert.equal(found._id !== null, true);

      // get user
      await assert.rejects(getUser("basUser"), { message: "Unable to find user" });
    });
  });

  describe("getUserById", () => {
    it("renvoie le bon utilisateur quand l'id fourni est valide", async () => {
      const { createUser, getUserById } = await usersService();

      const usernameTest = "userTest";

      // Création du user
      const insertedId = await createUser({
        email: "user@test.fr",
        username: usernameTest,
        role: ROLES.CFA,
      });

      // find user
      const found = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });
      assert.equal(found.username === usernameTest, true);
      assert.equal(found.role === ROLES.CFA, true);
      assert.equal(found._id !== null, true);

      // get user
      const gettedUser = await getUserById(found._id);
      assert.equal(gettedUser.username === found.username, true);
      assert.equal(gettedUser.role === ROLES.CFA, true);
      assert.equal(gettedUser._id !== null, true);
    });

    it("ne renvoie pas le bon utilisateur quand l'id fourni n'est pas valide", async () => {
      const { createUser, getUserById } = await usersService();

      const usernameTest = "userTest";

      // Création du user
      const insertedId = await createUser({
        email: "user@test.fr",
        username: usernameTest,
        role: ROLES.CFA,
      });

      // find user
      const found = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });
      assert.equal(found.username === usernameTest, true);
      assert.equal(found.role === ROLES.CFA, true);
      assert.equal(found._id !== null, true);

      // get user
      const objectId = new ObjectId();
      await assert.rejects(getUserById(objectId), { message: "Unable to find user" });
    });
  });

  describe("getAllUsers", () => {
    it("renvoie une liste d'utilisateurs", async () => {
      const { createUser, getAllUsers } = usersService();

      await createUser({
        email: "test1@mail.com",
        role: ROLES.CFA,
        nom: "NOM1",
        prenom: "PRENOM1",
        fonction: "FONCTION1",
        telephone: "TELEPHONE1",
        outils_gestion: ["test1", "test2"],
        nom_etablissement: "ETABLISSEMENT1",
      });

      await createUser({
        email: "test2@mail.com",
        role: ROLES.CFA,
        nom: "NOM2",
        prenom: "PRENOM2",
        fonction: "FONCTION2",
        telephone: "TELEPHONE2",
        outils_gestion: ["test1", "test2", "test3"],
        nom_etablissement: "ETABLISSEMENT2",
      });

      const allUsers = await getAllUsers();
      assert.equal(allUsers.length, 2);

      // Utilisateur 1
      assert.ok(allUsers[0]._id);
      assert.equal(allUsers[0].username, "test1@mail.com");
      assert.equal(allUsers[0].email, "test1@mail.com");
      assert.equal(allUsers[0].role, ROLES.CFA);
      assert.equal(allUsers[0].nom, "NOM1");
      assert.equal(allUsers[0].prenom, "PRENOM1");
      assert.equal(allUsers[0].fonction, "FONCTION1");
      assert.equal(allUsers[0].telephone, "TELEPHONE1");
      assert.deepEqual(allUsers[0].outils_gestion, ["test1", "test2"]);
      assert.equal(allUsers[0].nom_etablissement, "ETABLISSEMENT1");

      // Utilisateur 2
      assert.ok(allUsers[1]._id);
      assert.equal(allUsers[1].username, "test2@mail.com");
      assert.equal(allUsers[1].email, "test2@mail.com");
      assert.equal(allUsers[1].role, ROLES.CFA);
      assert.equal(allUsers[1].nom, "NOM2");
      assert.equal(allUsers[1].prenom, "PRENOM2");
      assert.equal(allUsers[1].fonction, "FONCTION2");
      assert.equal(allUsers[1].telephone, "TELEPHONE2");
      assert.deepEqual(allUsers[1].outils_gestion, ["test1", "test2", "test3"]);
      assert.equal(allUsers[1].nom_etablissement, "ETABLISSEMENT2");
    });
  });
});
