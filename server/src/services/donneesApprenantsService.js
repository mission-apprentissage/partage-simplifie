import XLSX from "xlsx";
import { USER_EVENTS_ACTIONS } from "../common/constants/userEventsConstants.js";
import { DONNEES_APPRENANT_XLSX_FILE } from "../domain/donneesApprenants.js";
import { toDonneesApprenantsFromXlsx } from "../model/api/donneesApprenantsXlsxMapper.js";

/**
 * Récupération des données apprenants depuis un buffer de fichier XLSX
 * @param {*} param0
 * @returns
 */
const importDonneesApprenantsFromXlsxBuffer = async (fileBuffer) => {
  let uploadStatus;
  let errors = [];

  const donneesApprenantsXlsx = readDonneesApprenantsFromXlsxBuffer(fileBuffer);
  const donneesApprenants = toDonneesApprenantsFromXlsx(donneesApprenantsXlsx);
  // TODO Remove log
  console.log(donneesApprenants);

  // TODO Replace Random validation by real JOI Validation
  const isDonneesApprenantsImportValid = () => {
    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const randomInt = getRandomInt(2);

    // TODO Replace errors by real errors from JOI
    errors = [
      { field: "champTest", message: "Le champ est vide" },
      { field: "champTest2", message: "Le champ n'est pas valide" },
    ];
    return randomInt > 0;
  };

  uploadStatus = isDonneesApprenantsImportValid ? USER_EVENTS_ACTIONS.UPLOAD.SUCCESS : USER_EVENTS_ACTIONS.UPLOAD.ERROR;

  return { uploadStatus, errors };
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

export default () => ({ importDonneesApprenantsFromXlsxBuffer });
