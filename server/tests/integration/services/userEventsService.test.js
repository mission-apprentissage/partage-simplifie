import { strict as assert } from "assert";
import { USER_EVENTS_ACTIONS, USER_EVENTS_TYPES } from "../../../src/common/constants/userEventsConstants.js";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import userEventsService from "../../../src/services/userEventsService.js";
import MockDate from "mockdate";
import { addMinutes } from "date-fns";

describe("Service UserEvents", () => {
  describe("createUserEvent", () => {
    it("Permet de créer un userEvent et de le sauver en base", async () => {
      const { createUserEvent } = userEventsService();

      await createUserEvent({
        user_email: "testUser@test.fr",
        type: "any",
        action: "action",
        data: { hello: "world" },
      });
      const foundInDb = await dbCollection(COLLECTIONS_NAMES.UserEvents).findOne({ user_email: "testUser@test.fr" });

      assert.ok(foundInDb);

      assert.equal(foundInDb.user_email === "testUser@test.fr", true);
      assert.equal(foundInDb.type === "any", true);
      assert.equal(foundInDb.action === "action", true);
      assert.deepEqual(foundInDb.data, { hello: "world" });
      assert.equal(foundInDb.created_at !== null, true);
    });
  });

  describe("getUploadHistoryList", () => {
    it("Permet de récupérer un historique de téléchargement valide et trié par date_creation desc", async () => {
      const { getUploadHistoryList, createUserEvent } = userEventsService();

      const testUserMail = "testUser@test.fr";

      const firstDate = new Date();
      MockDate.set(firstDate);

      await createUserEvent({
        user_email: testUserMail,
        type: USER_EVENTS_TYPES.POST,
        action: USER_EVENTS_ACTIONS.UPLOAD.SUCCESS,
        data: { originalname: "monFichier.xlsx" },
      });

      const secondDate = addMinutes(firstDate, 5);
      MockDate.set(secondDate);

      // Not valid for upload
      await createUserEvent({
        user_email: testUserMail,
        type: USER_EVENTS_TYPES.POST,
        action: USER_EVENTS_ACTIONS.UPLOAD.INIT,
        data: { originalname: "monFichierNotValid.xlsx" },
      });

      // Not valid for user
      await createUserEvent({
        user_email: "otherUser@test.fr",
        type: USER_EVENTS_TYPES.POST,
        action: USER_EVENTS_ACTIONS.UPLOAD.SUCCESS,
        data: { originalname: "monFichierPourUnAutreUser.xlsx" },
      });

      await createUserEvent({
        user_email: testUserMail,
        type: USER_EVENTS_TYPES.POST,
        action: USER_EVENTS_ACTIONS.UPLOAD.SUCCESS,
        data: { originalname: "monFichier2.xlsx" },
      });

      const uploadHistory = await getUploadHistoryList({ user_email: "testUser@test.fr" });

      assert.deepEqual(uploadHistory.length === 2, true);
      assert.equal(uploadHistory[0].nom_fichier === "monFichier2.xlsx", true);
      assert.equal(uploadHistory[0].date_creation.getTime() === secondDate.getTime(), true);
      assert.equal(uploadHistory[1].nom_fichier === "monFichier.xlsx", true);
      assert.equal(uploadHistory[1].date_creation.getTime() === firstDate.getTime(), true);
    });

    it("Permet de récupérer un historique de téléchargement vide", async () => {
      const { getUploadHistoryList } = userEventsService();

      const uploadHistory = await getUploadHistoryList({ user_email: "testUser@test.fr" });
      assert.deepEqual(uploadHistory, []);
    });
  });
});
