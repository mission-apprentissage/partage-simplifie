import { strict as assert } from "assert";
import { SignalerAnomalieFactory } from "../../../src/factory/signalerAnomalieFactory.js";

describe("Factory DemandesActivationCompte", () => {
  describe("create", () => {
    it("Vérifie la création du message est valide via sa factory", async () => {
      const entity = await SignalerAnomalieFactory.create({ email: "test@test.fr", message: "Je suis une anomalie" });

      assert.equal(entity.email === "test@test.fr", true);
      assert.equal(entity.message === "Je suis une anomalie", true);
      assert.equal(entity.created_at !== null, true);
      assert.equal(entity.updated_at === null, true);
    });
  });
});
