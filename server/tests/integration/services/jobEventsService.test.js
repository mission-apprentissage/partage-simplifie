import { strict as assert } from "assert";
import jobEventsService from "../../../src/services/jobEventsService.js";
import { JOB_STATUS } from "../../../src/common/constants/jobsConstants.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";

describe("Service JobEvents", () => {
  describe("createJobEvent", () => {
    it("Permet de créer un jobEvent et de le sauver en base", async () => {
      const { createJobEvent } = jobEventsService();

      await createJobEvent({ jobname: "testJob", action: "any", data: { hello: "world" } });
      const foundInDb = await dbCollection(COLLECTIONS_NAMES.JobEvents).findOne({ jobname: "testJob" });

      assert.ok(foundInDb);

      assert.equal(foundInDb.jobname === "testJob", true);
      assert.equal(foundInDb.action === "any", true);
      assert.deepEqual(foundInDb.data, { hello: "world" });
      assert.equal(foundInDb.created_at !== null, true);
    });
  });

  describe("isJobInAction", () => {
    it("Permet de vérifier si le job courant est dans l'action terminée", async () => {
      const { createJobEvent, isJobInAction } = jobEventsService();

      const testJobName = "TEST-JOB";

      // Add started then executed and finally ended event
      await createJobEvent({ jobname: testJobName, action: JOB_STATUS.started });
      await createJobEvent({ jobname: testJobName, action: JOB_STATUS.executed });
      await createJobEvent({ jobname: testJobName, action: JOB_STATUS.ended });

      const isEnded = await isJobInAction(testJobName, JOB_STATUS.ended);
      assert.equal(isEnded, true);
    });

    it("Permet de vérifier si le job courant n'est pas dans l'action terminée", async () => {
      const { createJobEvent, isJobInAction } = jobEventsService();

      const testJobName = "TEST-JOB";

      // Add started then executed event
      await createJobEvent({ jobname: testJobName, action: JOB_STATUS.started });
      await createJobEvent({ jobname: testJobName, action: JOB_STATUS.executed });

      const isEnded = await isJobInAction(testJobName, JOB_STATUS.ended);
      assert.equal(isEnded, false);
    });
  });
});
