import { strict as assert } from "assert";
import { ROLES } from "../../../src/common/constants/roles.js";
import { startServer } from "../../utils/testUtils.js";
import MockDate from "mockdate";
import { addMinutes } from "date-fns";
import { USER_EVENTS_ACTIONS, USER_EVENTS_TYPES } from "../../../src/common/constants/userEventsConstants.js";

describe("API Route User", () => {
  describe("GET /of/upload-history", () => {
    it("renvoie une erreur HTTP 401 lorsque l'utilisateur n'est pas connecté", async () => {
      const { httpClient } = await startServer();
      const response = await httpClient.get("/api/of/upload-history", {});

      assert.equal(response.status, 401);
    });

    it("renvoie une erreur HTTP 403 lorsque l'utilisateur n'est pas OF", async () => {
      const { httpClient, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("user@test.fr", "password", ROLES.ADMINISTRATOR);
      const response = await httpClient.get("/api/of/upload-history", { headers: bearerToken });

      assert.equal(response.status, 403);
    });

    it("renvoie une 200 et un historique vide quand l'utilisateur n'a jamais uploadé de fichier", async () => {
      const { httpClient, createAndLogUser } = await startServer();
      const bearerToken = await createAndLogUser("user@test.fr", "password", ROLES.OF);
      const response = await httpClient.get("/api/of/upload-history", { headers: bearerToken });

      assert.equal(response.status, 200);
      assert.deepEqual(response.data.uploadHistoryList, []);
    });

    it("renvoie une 200 et un historique valide quand l'utilisateur a déja uploadé des fichiers", async () => {
      const { httpClient, createAndLogUser, services } = await startServer();
      const testUserMail = "user@test.fr";
      const bearerToken = await createAndLogUser(testUserMail, "password", ROLES.OF);

      const firstDate = new Date();
      MockDate.set(firstDate);

      await services.userEvents.createUserEvent({
        user_email: testUserMail,
        type: USER_EVENTS_TYPES.POST,
        action: USER_EVENTS_ACTIONS.UPLOAD.SUCCESS,
        data: { originalname: "monFichier.xlsx" },
      });

      const secondDate = addMinutes(firstDate, 5);
      MockDate.set(secondDate);

      // Not valid for upload
      await services.userEvents.createUserEvent({
        user_email: testUserMail,
        type: USER_EVENTS_TYPES.POST,
        action: USER_EVENTS_ACTIONS.UPLOAD.INIT,
        data: { originalname: "monFichierNotValid.xlsx" },
      });

      // Not valid for user
      await services.userEvents.createUserEvent({
        user_email: "otherUser@test.fr",
        type: USER_EVENTS_TYPES.POST,
        action: USER_EVENTS_ACTIONS.UPLOAD.SUCCESS,
        data: { originalname: "monFichierPourUnAutreUser.xlsx" },
      });

      await services.userEvents.createUserEvent({
        user_email: testUserMail,
        type: USER_EVENTS_TYPES.POST,
        action: USER_EVENTS_ACTIONS.UPLOAD.SUCCESS,
        data: { originalname: "monFichier2.xlsx" },
      });

      const response = await httpClient.get("/api/of/upload-history", { headers: bearerToken });
      assert.equal(response.status, 200);

      assert.equal(response.data.uploadHistoryList.length === 2, true);
      assert.equal(response.data.uploadHistoryList[0].nom_fichier === "monFichier2.xlsx", true);
      assert.equal(response.data.uploadHistoryList[0].date_creation === secondDate.toISOString(), true);

      assert.equal(response.data.uploadHistoryList[1].nom_fichier === "monFichier.xlsx", true);
      assert.equal(response.data.uploadHistoryList[1].date_creation === firstDate.toISOString(), true);
    });
  });
});
