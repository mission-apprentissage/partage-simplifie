import { strict as assert } from "assert";
import { parseFormattedDate } from "../../../src/domain/date.js";

describe("Domain Date", () => {
  describe("parseFormattedDate", () => {
    it("Vérifie qu'on ne peut pas formatter une date vide", () => {
      const input = null;
      const result = parseFormattedDate(input);
      assert.equal(result === null, true);
    });

    it("Vérifie qu'on ne peut pas formatter une date invalide", () => {
      const input = 23;
      const result = parseFormattedDate(input);
      assert.equal(new Date(result).toString() === "Invalid Date", true);
    });

    it("Vérifie qu'on peut formatter une date au format jj/MM/aaaa", () => {
      const input = "12/09/2015";
      const result = parseFormattedDate(input);
      assert.equal(result.toLocaleDateString({ dateStyle: "short" }) === input, true);
    });
  });
});
