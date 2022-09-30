import { strict as assert } from "assert";
import { validateUai } from "../../../src/domain/uai.js";

describe("Domain UAI", () => {
  describe("validateUai", () => {
    it("Vérifie qu'un uai de valeur null est invalide", () => {
      const input = null;
      const result = validateUai(input);
      assert.ok(result.error);
    });

    it("Vérifie qu'un uai de valeur undefined est invalide", () => {
      const input = undefined;
      const result = validateUai(input);
      assert.ok(result.error);
    });

    it("Vérifie qu'un uai de valeur 0 est invalide", () => {
      const input = 0;
      const result = validateUai(input);
      assert.ok(result.error);
    });

    it("Vérifie qu'un uai de valeur chaîne vide est invalide", () => {
      const input = "";
      const result = validateUai(input);
      assert.ok(result.error);
    });

    it("Vérifie qu'un uai contenant uniquement des lettres est invalide", () => {
      const input = "abcdefgh";
      const result = validateUai(input);
      assert.ok(result.error);
    });

    it("Vérifie qu'un uai contenant uniquement des nombes est invalide", () => {
      const input = "12345678";
      const result = validateUai(input);
      assert.ok(result.error);
    });

    it("Vérifie qu'un uai respectant le format est valide", () => {
      const input = "0000001S";
      const result = validateUai(input);
      assert.equal(result.error, undefined);
    });
  });
});
