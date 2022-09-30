import XLSX from "xlsx";
import { createSampleXlsxBuffer } from "../../utils/data/createRandomXlsxDonneesApprenants.js";

describe("Service DonneesApprenants", () => {
  describe("importDonneesApprenantsFromXlsxFile", () => {
    it("Permet d'importer sans erreur des données depuis un buffer de données XLSX", async () => {
      // TODO
      // Test File
      const sampleDonneesApprenants = [];
      const testBuffer = await createSampleXlsxBuffer(sampleDonneesApprenants);
      const workbookTest = XLSX.read(testBuffer);
      const aoaTest = XLSX.utils.sheet_to_json(workbookTest.Sheets[workbookTest.SheetNames[0]]);
      console.log(aoaTest);
    });
  });
});
