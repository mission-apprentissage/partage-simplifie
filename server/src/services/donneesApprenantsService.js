import XLSX from "xlsx";
import { DONNEES_APPRENANT_XLSX_FILE } from "../domain/donneesApprenants.js";
import { dbCollection } from "../model/db/mongodbClient.js";
import { COLLECTIONS_NAMES } from "../model/collections/index.js";
import { asyncForEach } from "../common/utils/asyncUtils.js";
import { DonneesApprenantsFactory } from "../factory/donneesApprenantsFactory.js";
import { XLSX_DateNF_Format } from "../domain/date.js";

/**
 * Import des données apprenants pour l'utilisateur
 * @param {*} param0
 * @returns
 */
const importDonneesApprenants = async (donneesApprenants) => {
  await asyncForEach(donneesApprenants, async (currentDonneeApprenant) => {
    const entityToAdd = await DonneesApprenantsFactory.create(currentDonneeApprenant);
    await dbCollection(COLLECTIONS_NAMES.DonneesApprenants).insertOne(entityToAdd);
  });
};

/**
 * Suppression des données apprenants pour l'email utilisateur
 * @param {*} param0
 * @returns
 */
const clearDonneesApprenantsForUserEmail = async (user_email) => {
  await dbCollection(COLLECTIONS_NAMES.DonneesApprenants).deleteMany({ user_email });
};

/**
 * Lecture d'une liste d'objets depuis le buffer du XLSX
 * @param {*} fileBuffer
 * @returns
 */
const readDonneesApprenantsFromXlsxBuffer = (
  fileBuffer,
  headerNbLinesToRemove = DONNEES_APPRENANT_XLSX_FILE.NB_LINES_TO_REMOVE
) => {
  // Lecture des données depuis le buffer du fichier XLSX en gérant l'entête du fichier
  const workbook = XLSX.read(fileBuffer, { cellText: false, cellDates: true });
  const aoa = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
    header: DONNEES_APPRENANT_XLSX_FILE.HEADERS,
    raw: false,
    dateNF: XLSX_DateNF_Format,
  });
  const donneesApprenants = aoa?.splice(headerNbLinesToRemove);
  return donneesApprenants;
};

export default () => ({
  readDonneesApprenantsFromXlsxBuffer,
  importDonneesApprenants,
  clearDonneesApprenantsForUserEmail,
});
