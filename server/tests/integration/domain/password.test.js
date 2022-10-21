import { strict as assert } from "assert";
import { validatePassword } from "../../../src/domain/password.js";

describe("Domain Password", () => {
  describe("validatePassword", () => {
    it("Vérifie qu'un password de valeur null est invalide", () => {
      const input = null;
      const resultValid = validatePassword(input);
      assert.ok(!resultValid);
    });

    it("Vérifie qu'un password de valeur undefined est invalide", () => {
      const input = undefined;
      const resultValid = validatePassword(input);
      assert.ok(!resultValid);
    });

    it("Vérifie qu'un password de password 0 est invalide", () => {
      const input = 0;
      const resultValid = validatePassword(input);
      assert.ok(!resultValid);
    });

    it("Vérifie qu'un password de valeur chaîne vide est invalide", () => {
      const input = "";
      const resultValid = validatePassword(input);
      assert.ok(!resultValid);
    });

    it("Vérifie qu'un password trop court est invalide", () => {
      const input = "short";
      const resultValid = validatePassword(input);
      assert.ok(!resultValid);
    });

    it("Vérifie qu'un password respectant le format est valide", () => {
      const input = "SuperMegaPasswordVeryLong";
      const resultValid = validatePassword(input);
      assert.ok(resultValid);
    });
  });
});
