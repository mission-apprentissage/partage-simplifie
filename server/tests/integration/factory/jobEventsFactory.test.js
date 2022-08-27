import { strict as assert } from "assert";
import { JobEventsFactory } from "../../../src/factory/jobEventsFactory.js";

describe("Factory JobEvents", () => {
  describe("create", () => {
    it("Vérifie la création de jobEvents via sa factory", async () => {
      const entity = await JobEventsFactory.create({ jobname: "testJob", action: "any", data: { hello: "world" } });

      assert.equal(entity.jobname === "testJob", true);
      assert.equal(entity.action === "any", true);
      assert.deepEqual(entity.data, { hello: "world" });
      assert.equal(entity.created_at !== null, true);
      assert.equal(entity.updated_at === null, true);
    });
  });
});
