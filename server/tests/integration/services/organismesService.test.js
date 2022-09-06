import { strict as assert } from "assert";
import organismesService from "../../../src/services/organismesService.js";
import {
  INEXISTANT_UAI,
  SAMPLE_UAI_UNIQUE_ORGANISME,
  SAMPLE_UAI_MULTIPLES_ORGANISMES,
} from "../../utils/nockApis/apiReferentielMna/data.js";

describe("Service Organismes", () => {
  describe("getOrganismesFromReferentiel", () => {
    it("Permet de récupérer une liste avec un seul organisme pour un uai valide", async () => {
      const { getOrganismesFromReferentiel } = organismesService();

      const organismesFound = await getOrganismesFromReferentiel(SAMPLE_UAI_UNIQUE_ORGANISME);
      assert.equal(organismesFound.length === 1, true);
      assert.ok(organismesFound[0].uai);
      assert.ok(organismesFound[0].siret);
      assert.ok(organismesFound[0].adresse);
      assert.ok(organismesFound[0].nom_etablissement);
    });

    it("Permet de récupérer la liste avec plusieurs organismes pour un uai valide", async () => {
      const { getOrganismesFromReferentiel } = organismesService();

      const organismesFound = await getOrganismesFromReferentiel(SAMPLE_UAI_MULTIPLES_ORGANISMES);
      assert.equal(organismesFound.length > 1, true);
      organismesFound.forEach((element) => {
        assert.ok(element.uai);
        assert.ok(element.siret);
        assert.ok(element.adresse);
        assert.ok(element.nom_etablissement);
      });
    });

    it("Récupère une liste d'organismes vides pour un uai inexistant", async () => {
      const { getOrganismesFromReferentiel } = organismesService();

      const organismesFound = await getOrganismesFromReferentiel(INEXISTANT_UAI);
      assert.equal(organismesFound.length === 0, true);
    });
  });
});
