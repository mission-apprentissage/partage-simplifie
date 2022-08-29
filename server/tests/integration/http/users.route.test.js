import { strict as assert } from "assert";
import { ROLES } from "../../../src/common/constants/roles.js";
import { startServer } from "../../utils/testUtils.js";

describe("API Route Login", () => {
  describe("GET /users", () => {
    it("renvoie une erreur HTTP 401 lorsque l'utilisateur n'est pas connecté", async () => {
      const { httpClient } = await startServer();
      const response = await httpClient.get("/api/users", {});

      assert.equal(response.status, 401);
    });

    it("renvoie une erreur HTTP 403 lorsque l'utilisateur n'est pas admin", async () => {
      const { httpClient, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("user@test.fr", "password", ROLES.CFA);
      const response = await httpClient.get("/api/users", { headers: bearerToken });

      assert.equal(response.status, 403);
    });

    it("renvoie un code HTTP 200 lorsque l'utilisateur est admin avec une liste d'utilisateurs", async () => {
      const { httpClient, services, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("user@test.fr", "password", ROLES.ADMINISTRATOR);

      await services.users.createUser({
        email: "test1@mail.com",
        role: ROLES.CFA,
        nom: "NOM1",
        prenom: "PRENOM1",
        fonction: "FONCTION1",
        telephone: "TELEPHONE1",
        outils_gestion: ["test1", "test2"],
        nom_etablissement: "ETABLISSEMENT1",
      });

      await services.users.createUser({
        email: "test2@mail.com",
        role: ROLES.CFA,
        nom: "NOM2",
        prenom: "PRENOM2",
        fonction: "FONCTION2",
        telephone: "TELEPHONE2",
        outils_gestion: ["test1", "test2", "test3"],
        nom_etablissement: "ETABLISSEMENT2",
      });

      const response = await httpClient.get("/api/users", { headers: bearerToken });

      assert.equal(response.status, 200);
      assert.equal(response.data.length, 3);

      // Premier utilisateur : celui connecté
      assert.ok(response.data[0].id);
      assert.equal(response.data[0].password, undefined);
      assert.equal(response.data[0].username, "user@test.fr");
      assert.equal(response.data[0].email, "user@test.fr");
      assert.equal(response.data[0].role, ROLES.ADMINISTRATOR);

      // Utilisateur 1
      assert.ok(response.data[1].id);
      assert.equal(response.data[1].password, undefined);
      assert.equal(response.data[1].username, "test1@mail.com");
      assert.equal(response.data[1].email, "test1@mail.com");
      assert.equal(response.data[1].role, ROLES.CFA);
      assert.equal(response.data[1].nom, "NOM1");
      assert.equal(response.data[1].prenom, "PRENOM1");
      assert.equal(response.data[1].fonction, "FONCTION1");
      assert.equal(response.data[1].telephone, "TELEPHONE1");
      assert.deepEqual(response.data[1].outils_gestion, ["test1", "test2"]);
      assert.equal(response.data[1].nom_etablissement, "ETABLISSEMENT1");

      // Utilisateur 1
      assert.ok(response.data[2].id);
      assert.equal(response.data[2].password, undefined);
      assert.equal(response.data[2].username, "test2@mail.com");
      assert.equal(response.data[2].email, "test2@mail.com");
      assert.equal(response.data[2].role, ROLES.CFA);
      assert.equal(response.data[2].nom, "NOM2");
      assert.equal(response.data[2].prenom, "PRENOM2");
      assert.equal(response.data[2].fonction, "FONCTION2");
      assert.equal(response.data[2].telephone, "TELEPHONE2");
      assert.deepEqual(response.data[2].outils_gestion, ["test1", "test2", "test3"]);
      assert.equal(response.data[2].nom_etablissement, "ETABLISSEMENT2");
    });
  });
});
