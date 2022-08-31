import { strict as assert } from "assert";
import organismesService from "../../../src/services/organismesService.js";
import { INEXISTANT_UAI } from "../../utils/nockApis/apiReferentielMna/data.js";

describe("Service Organismes", () => {
  describe("getOrganismesFromReferentiel", () => {
    it("Permet de récupérer la liste des organismes pour un uai valide", async () => {
      const { getOrganismesFromReferentiel } = organismesService();

      const organismesFound = await getOrganismesFromReferentiel("0921500F");
      assert.equal(organismesFound.length > 0, true);
      organismesFound.forEach((element) => {
        assert.ok(element.uai);
        assert.ok(element.siret);
        assert.ok(element.adresse);
        assert.ok(element.nom_etablissement);
      });
    });

    it("Ne récupère pas de liste des organismes pour un uai non valide", async () => {
      const { getOrganismesFromReferentiel } = organismesService();

      const organismesFound = await getOrganismesFromReferentiel(INEXISTANT_UAI);
      assert.equal(organismesFound, null);
    });
  });
});
