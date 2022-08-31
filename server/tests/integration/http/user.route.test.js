import { strict as assert } from "assert";
import { ROLES } from "../../../src/common/constants/roles.js";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import { startServer } from "../../utils/testUtils.js";

describe("API Route User", () => {
  describe("POST /user/update-password", () => {
    it("renvoie une 200 quand le token fourni et le nouveau mot de passe sont corrects", async () => {
      const { httpClient, services } = await startServer();
      // create user
      const email = "user1@test.fr";
      const user = await services.users.createUser({ email, role: ROLES.CFA });
      // generate password update token
      const token = await services.users.generatePasswordUpdateToken(email);
      const response = await httpClient.post("/api/user/update-password", {
        token,
        newPassword: "strong long password 1234",
      });
      assert.equal(response.status, 200);
      const userAfterRequest = await services.users.getUser(email);
      assert.equal(userAfterRequest.password_updated_token_at !== null, true);
      assert.equal(userAfterRequest.password_update_token, null);
      assert.equal(userAfterRequest.password_update_token_expiry, null);
      assert.notEqual(user.password, userAfterRequest.password);
    });

    it("renvoie une 400 quand le nouveau mot de passe est trop court", async () => {
      const { httpClient, services } = await startServer();
      // create user
      const email = "user1@test.fr";
      const insertedId = await services.users.createUser({ email, role: ROLES.CFA });
      const user = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      // generate password update token
      const token = await services.users.generatePasswordUpdateToken(email);
      const response = await httpClient.post("/api/user/update-password", {
        token,
        newPassword: "trop court",
      });
      assert.equal(response.status, 400);
      assert.equal(response.data.details.length, 1);
      assert.deepEqual(response.data.details[0].path, ["newPassword"]);
      assert.equal(response.data.details[0].type, "string.min");
      // user password should be unchanged
      const userAfterRequest = await services.users.getUser(email);
      assert.equal(user.password, userAfterRequest.password);
    });

    it("renvoie une 400 quand aucun token n'est fourni", async () => {
      const { httpClient, services } = await startServer();
      // create user
      const email = "user1@test.fr";
      const insertedId = await services.users.createUser({ email, role: ROLES.CFA });
      const user = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      // generate password update token
      await services.users.generatePasswordUpdateToken(email);
      const response = await httpClient.post("/api/user/update-password", {
        token: "",
        newPassword: "mot de passe assez long",
      });
      assert.equal(response.status, 400);
      assert.equal(response.data.details.length, 1);
      assert.deepEqual(response.data.details[0].path, ["token"]);
      assert.equal(response.data.details[0].type, "string.empty");
      // user password should be unchanged
      const userAfterRequest = await services.users.getUser(email);
      assert.equal(user.password, userAfterRequest.password);
    });

    it("renvoie une 500 quand le token fourni ne correspond pas à celui généré", async () => {
      const { httpClient, services } = await startServer();
      // create user
      const email = "user1@test.fr";
      const insertedId = await services.users.createUser({ email, role: ROLES.CFA });
      const user = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });
      // generate password update token
      await services.users.generatePasswordUpdateToken(email);
      const response = await httpClient.post("/api/user/update-password", {
        token: "un-autre-token",
        newPassword: "mot de passe assez long",
      });
      assert.equal(response.status, 500);
      // user password should be unchanged
      const userAfterRequest = await services.users.getUser(email);
      assert.equal(user.password, userAfterRequest.password);
    });

    it("renvoie une 500 lorsqu'aucun token de modification de mot de passe n'a été créé", async () => {
      const { httpClient, services } = await startServer();
      // create user
      const email = "user1@test.fr";
      const insertedId = await services.users.createUser({ email, role: ROLES.CFA });
      const user = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: insertedId });

      const response = await httpClient.post("/api/user/update-password", {
        token: "un token qui n'existe pas",
        newPassword: "mot de passe assez long",
      });
      assert.equal(response.status, 500);
      // user password should be unchanged
      const userAfterRequest = await services.users.getUser(email);
      assert.equal(user.password, userAfterRequest.password);
    });
  });
});
