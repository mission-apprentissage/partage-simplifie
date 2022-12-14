import { strict as assert } from "assert";
import { differenceInCalendarDays } from "date-fns";
import { config } from "../../../config/index.js";
import { ROLES } from "../../../src/common/constants/roles.js";
import { startServer } from "../../utils/testUtils.js";

describe("API Route Users", () => {
  describe("GET /users", () => {
    it("renvoie une erreur HTTP 401 lorsque l'utilisateur n'est pas connecté", async () => {
      const { httpClient } = await startServer();
      const response = await httpClient.get("/api/users", {});

      assert.equal(response.status, 401);
    });

    it("renvoie une erreur HTTP 403 lorsque l'utilisateur n'est pas admin", async () => {
      const { httpClient, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("user@test.fr", "password", ROLES.OF);
      const response = await httpClient.get("/api/users", { headers: bearerToken });

      assert.equal(response.status, 403);
    });

    it("renvoie un code HTTP 200 lorsque l'utilisateur est admin avec une liste d'utilisateurs", async () => {
      const { httpClient, services, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("user@test.fr", "password", ROLES.ADMINISTRATOR);

      await services.users.createUser({
        email: "test1@mail.com",
        role: ROLES.OF,
        nom: "NOM1",
        prenom: "PRENOM1",
        fonction: "FONCTION1",
        telephone: "TELEPHONE1",
        outils_gestion: ["test1", "test2"],
        nom_etablissement: "ETABLISSEMENT1",
        adresse_etablissement: "ADRESSE ETABLISSEMENT1",
      });

      await services.users.createUser({
        email: "test2@mail.com",
        role: ROLES.OF,
        nom: "NOM2",
        prenom: "PRENOM2",
        fonction: "FONCTION2",
        telephone: "TELEPHONE2",
        outils_gestion: ["test1", "test2", "test3"],
        nom_etablissement: "ETABLISSEMENT2",
        adresse_etablissement: "ADRESSE ETABLISSEMENT2",
      });

      const response = await httpClient.get("/api/users", { headers: bearerToken });

      assert.equal(response.status, 200);
      assert.equal(response.data.length, 3);

      // Premier utilisateur : celui connecté
      assert.ok(response.data[0].id);
      assert.equal(response.data[0].password, undefined);
      assert.equal(response.data[0].email, "user@test.fr");
      assert.equal(response.data[0].role, ROLES.ADMINISTRATOR);

      // Utilisateur 1
      assert.ok(response.data[1].id);
      assert.equal(response.data[1].password, undefined);
      assert.equal(response.data[1].email, "test1@mail.com");
      assert.equal(response.data[1].role, ROLES.OF);
      assert.equal(response.data[1].nom, "NOM1");
      assert.equal(response.data[1].prenom, "PRENOM1");
      assert.equal(response.data[1].fonction, "FONCTION1");
      assert.equal(response.data[1].telephone, "TELEPHONE1");
      assert.deepEqual(response.data[1].outils_gestion, ["test1", "test2"]);
      assert.equal(response.data[1].nom_etablissement, "ETABLISSEMENT1");
      assert.equal(response.data[1].adresse_etablissement, "ADRESSE ETABLISSEMENT1");

      // Utilisateur 1
      assert.ok(response.data[2].id);
      assert.equal(response.data[2].password, undefined);
      assert.equal(response.data[2].email, "test2@mail.com");
      assert.equal(response.data[2].role, ROLES.OF);
      assert.equal(response.data[2].nom, "NOM2");
      assert.equal(response.data[2].prenom, "PRENOM2");
      assert.equal(response.data[2].fonction, "FONCTION2");
      assert.equal(response.data[2].telephone, "TELEPHONE2");
      assert.deepEqual(response.data[2].outils_gestion, ["test1", "test2", "test3"]);
      assert.equal(response.data[2].nom_etablissement, "ETABLISSEMENT2");
      assert.equal(response.data[2].adresse_etablissement, "ADRESSE ETABLISSEMENT2");
    });
  });

  describe("POST /users/generate-update-password-url", () => {
    it("sends a 401 HTTP response when user is not authenticated", async () => {
      const { httpClient } = await startServer();
      const response = await httpClient.post("/api/users/generate-update-password-url");

      assert.equal(response.status, 401);
    });

    it("sends a 403 HTTP response when user is not admin", async () => {
      const { httpClient, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("admin@test.fr", "password", ROLES.OF);

      const response = await httpClient.post(
        "/api/users/generate-update-password-url",
        { email: "admin@test.fr" },
        { headers: bearerToken }
      );

      assert.equal(response.status, 403);
    });

    it("sends a 200 HTTP response with password update url", async () => {
      const { httpClient, createAndLogUser, services } = await startServer();
      const bearerToken = await createAndLogUser("admin@test.fr", "password", ROLES.ADMINISTRATOR);

      // Création du user
      await services.users.createUser({
        email: "user@test.fr",
        role: ROLES.ADMINISTRATOR,
      });

      const response = await httpClient.post(
        "/api/users/generate-update-password-url",
        { email: "user@test.fr" },
        { headers: bearerToken }
      );

      assert.equal(response.status, 200);
      assert.ok(response.data.passwordUpdateUrl);
      assert.equal(response.data.passwordUpdateUrl.startsWith(`${config.publicUrl}/modifier-mot-de-passe`), true);

      const updatedUser = await services.users.getUser("user@test.fr");
      assert.ok(updatedUser.password_update_token);
      // password token should expire in 48h
      const expiryDate = updatedUser.password_update_token_expiry;
      assert.equal(differenceInCalendarDays(expiryDate, new Date()), 2);
    });
  });

  describe("POST /users/search", () => {
    it("sends a 401 HTTP response when user is not authenticated", async () => {
      const { httpClient } = await startServer();
      const response = await httpClient.post("/api/users/search");

      assert.equal(response.status, 401);
    });

    it("sends a 403 HTTP response when user is not admin", async () => {
      const { httpClient, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("admin@test.fr", "password", ROLES.OF);
      const response = await httpClient.post("/api/users/search", { searchTerm: "blabla" }, { headers: bearerToken });

      assert.equal(response.status, 403);
    });

    it("sends a 200 HTTP empty response when no match", async () => {
      const { httpClient, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("admin@test.fr", "password", ROLES.ADMINISTRATOR);
      const response = await httpClient.post("/api/users/search", { searchTerm: "blabla" }, { headers: bearerToken });

      assert.equal(response.status, 200);
      assert.deepEqual(response.data, []);
    });

    it("sends a 200 HTTP response with results when match on email", async () => {
      const { httpClient, services, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("user1@test.fr", "password", ROLES.ADMINISTRATOR);

      await services.users.createUser({
        email: "user2@test.fr",
        password: "password",
        nom_etablissement: "nom2",
        role: ROLES.OF,
      });

      await services.users.createUser({
        email: "user3@test.fr",
        password: "password",
        nom_etablissement: "nom3",
        role: ROLES.OF,
      });

      const response = await httpClient.post("/api/users/search", { searchTerm: "test.fr" }, { headers: bearerToken });

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.length, 3);
      assert.deepEqual(response.data[0].email, "user1@test.fr");
      assert.deepEqual(response.data[1].email, "user2@test.fr");
      assert.deepEqual(response.data[2].email, "user3@test.fr");
    });

    it("sends a 200 HTTP response with results when match on organisme", async () => {
      const { httpClient, services, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("user1@test.fr", "password", ROLES.ADMINISTRATOR);

      await services.users.createUser({
        email: "user2@test.fr",
        password: "password",
        nom_etablissement: "nom2",
        role: ROLES.OF,
      });

      await services.users.createUser({
        email: "user3@test.fr",
        password: "password",
        nom_etablissement: "nom3",
        role: ROLES.OF,
      });

      const response = await httpClient.post("/api/users/search", { searchTerm: "nom" }, { headers: bearerToken });

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.length, 2);
      assert.deepEqual(response.data[0].email, "user2@test.fr");
      assert.deepEqual(response.data[1].email, "user3@test.fr");
    });
  });
});
