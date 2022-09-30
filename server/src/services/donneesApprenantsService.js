import XLSX from "xlsx";
import { DONNEES_APPRENANT_XLSX_FILE } from "../domain/donneesApprenants.js";

/**
 * Import des données apprenants pour l'utilisateur
 * @param {*} param0
 * @returns
 */
const importDonneesApprenantsForUser = async (donneesApprenants) => {
  // TODO
  console.log(donneesApprenants);
};

/**
 * Suppression des données apprenants pour l'email utilisateur
 * @param {*} param0
 * @returns
 */
const clearDonneesApprenantsForUserEmail = async (user_email) => {
  // TODO
  console.log(user_email);
};

/**
 * Lecture d'une liste d'objets depuis le buffer du XLSX
 * @param {*} fileBuffer
 * @returns
 */
const readDonneesApprenantsFromXlsxBuffer = (fileBuffer) => {
  // Lecture des données depuis le buffer du fichier XLSX en gérant l'entête du fichier
  const workbook = XLSX.read(fileBuffer);
  const aoa = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
    header: DONNEES_APPRENANT_XLSX_FILE.HEADERS,
  });
  const donneesApprenants = aoa?.splice(DONNEES_APPRENANT_XLSX_FILE.NB_LINES_TO_REMOVE);
  return donneesApprenants;
};

export default () => ({
  readDonneesApprenantsFromXlsxBuffer,
  importDonneesApprenantsForUser,
  clearDonneesApprenantsForUserEmail,
});
