const assert = require("assert").strict;
const jobEventsService = require("../../../src/services/jobEventsService");
const { JOB_STATUS } = require("../../../src/common/constants/jobsConstants");
const { dbCollection } = require("../../../src/model/db/mongodbClient");
const { COLLECTIONS_NAMES } = require("../../../src/model/collections");

describe("Service JobEvents", () => {
  describe("create", () => {
    it("Permet de créer un jobEvent et de le sauver en base", async () => {
      const { create } = jobEventsService();

      await create({ jobname: "testJob", action: "any", data: { hello: "world" } });
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
      const { create, isJobInAction } = await jobEventsService();

      const testJobName = "TEST-JOB";

      // Add started then executed and finally ended event
      await create({ jobname: testJobName, action: JOB_STATUS.started });
      await create({ jobname: testJobName, action: JOB_STATUS.executed });
      await create({ jobname: testJobName, action: JOB_STATUS.ended });

      const isEnded = await isJobInAction(testJobName, JOB_STATUS.ended);
      assert.equal(isEnded, true);
    });

    it("Permet de vérifier si le job courant n'est pas dans l'action terminée", async () => {
      const { create, isJobInAction } = await jobEventsService();

      const testJobName = "TEST-JOB";

      // Add started then executed event
      await create({ jobname: testJobName, action: JOB_STATUS.started });
      await create({ jobname: testJobName, action: JOB_STATUS.executed });

      const isEnded = await isJobInAction(testJobName, JOB_STATUS.ended);
      assert.equal(isEnded, false);
    });
  });
});
