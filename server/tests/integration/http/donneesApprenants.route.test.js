import { strict as assert } from "assert";
import { ROLES } from "../../../src/common/constants/roles.js";
import { startServer } from "../../utils/testUtils.js";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";

describe("API Route DonneesApprenants", () => {
  describe("POST /upload", () => {
    it("renvoie une erreur HTTP 401 lorsque l'utilisateur n'est pas connecté", async () => {
      const { httpClient } = await startServer();
      const response = await httpClient.post("/api/donnees-apprenants/upload", {});

      assert.equal(response.status, 401);
    });

    it("renvoie une erreur HTTP 403 lorsque l'utilisateur n'est pas OF", async () => {
      const { httpClient, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("user@test.fr", "superPasswordForUser", ROLES.ADMINISTRATOR);
      const response = await httpClient.post("/api/donnees-apprenants/upload", {}, { headers: bearerToken });

      assert.equal(response.status, 403);
    });

    it("renvoie une erreur HTTP 500 lorsque le fichier fourni n'est pas un xlsx", async () => {
      const { superTestHttpClient, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("user@test.fr", "superPasswordForUser", ROLES.OF);

      const response = await superTestHttpClient
        .post("/api/donnees-apprenants/upload")
        .set(bearerToken)
        .attach("donneesApprenantsFile", Buffer.from([]), "testFichier.txt");

      assert.equal(response.status, 500);
    });

    it("renvoie une 200 lorsque le fichier fourni est bien au format xlsx", async () => {
      const { superTestHttpClient, createAndLogUser } = await startServer();
      const userEmail = "user@test.fr";
      const bearerToken = await createAndLogUser(userEmail, "superPasswordForUser", ROLES.OF);

      const testFileName = "testFichier.xlsx";

      const response = await superTestHttpClient
        .post("/api/donnees-apprenants/upload")
        .set(bearerToken)
        .attach("donneesApprenantsFile", Buffer.from([]), testFileName);

      assert.equal(response.status, 200);

      // Verify userEventCreation
      const countUserEventForUpload = await dbCollection(COLLECTIONS_NAMES.UserEvents).count({
        user_email: userEmail,
        "data.originalname": testFileName,
      });

      assert.equal(countUserEventForUpload === 1, true);
    });

    it("renvoie une 200 lorsque le fichier fourni est bien au format xlsx et que l'on ajoute un commentaire", async () => {
      const { superTestHttpClient, createAndLogUser } = await startServer();
      const userEmail = "user@test.fr";
      const bearerToken = await createAndLogUser(userEmail, "superPasswordForUser", ROLES.OF);

      const testFileName = "testFichier.xlsx";
      const testComment = "Commentaire";

      const response = await superTestHttpClient
        .post("/api/donnees-apprenants/upload")
        .set(bearerToken)
        .field("comment", testComment)
        .attach("donneesApprenantsFile", Buffer.from([]), testFileName);

      assert.equal(response.status, 200);

      // Verify userEventCreation
      const countUserEventForUpload = await dbCollection(COLLECTIONS_NAMES.UserEvents).count({
        user_email: userEmail,
        "data.originalname": testFileName,
        "data.comment": testComment,
      });

      assert.equal(countUserEventForUpload === 1, true);
    });
  });
});
