import XLSX from "xlsx";
import { faker } from "@faker-js/faker/locale/fr";
import RandExp from "randexp";
import { subMonths, subWeeks, subDays } from "date-fns";
import { DONNEES_APPRENANT_XLSX_FIELDS } from "../../../src/domain/donneesApprenants.js";
import { format } from "date-fns";

const getRandomIne = () => new RandExp(/^[0-9]{9}[A-Z]{2}$/).gen().toUpperCase();

const getRandomCfd = () => new RandExp(/^[0-9]{8}$/).gen().toUpperCase();

const getRandomRncpFormation = () => `RNCP${new RandExp(/^[0-9]{5}$/).gen()}`;

const getRandomAnneeFormation = () => faker.helpers.arrayElement([0, 1, 2, 3]);

const getRandomAnneeScolaire = () => {
  const currentYear = new Date().getFullYear();
  const anneeScolaire = faker.helpers.arrayElement([
    [currentYear - 1, currentYear], // [2020, 2021]
    [currentYear, currentYear + 1], // [2021, 2022]
    [currentYear + 1, currentYear + 2], // [2022, 2023]
  ]);
  return anneeScolaire.join("-");
};

const DATE_FORMAT = "dd-MM-yyyy";

const getRandomDateInscription = () =>
  format(faker.date.between(subMonths(new Date(), 2), subMonths(new Date(), 1)), DATE_FORMAT).toString();

const getRandomDateContrat = () =>
  format(faker.date.between(subWeeks(new Date(), 3), subWeeks(new Date(), 1)), DATE_FORMAT).toString();

const getRandomDateSortieFormation = () =>
  format(faker.date.between(subDays(new Date(), 3), subDays(new Date(), 1)), DATE_FORMAT).toString();

const getRandomDateNaissance = () =>
  format(faker.date.birthdate({ min: 18, max: 25, mode: "age" }), DATE_FORMAT).toString();

export const createRandomXlsxDonneesApprenant = (params) => {
  const randomDonneesApprenant = {};

  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.CFD] = getRandomCfd();
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.AnneeScolaire] = getRandomAnneeScolaire();
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.AnneeFormation] = getRandomAnneeFormation();
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.NomApprenant] = faker.name.lastName().toUpperCase();
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.PrenomApprenant] = faker.name.firstName();
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateDeNaissanceApprenant] = getRandomDateNaissance();

  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.CodeRNCP] = faker.datatype.boolean()
    ? getRandomRncpFormation()
    : null;
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.TelephoneApprenant] = faker.datatype.boolean()
    ? faker.phone.number()
    : null;
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.EmailApprenant] = faker.datatype.boolean()
    ? faker.internet.email()
    : null;
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.IneApprenant] = faker.datatype.boolean() ? getRandomIne() : null;
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.CodeCommuneInseeApprenant] = faker.datatype.boolean()
    ? faker.address.zipCode()
    : null;
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateInscription] = faker.datatype.boolean()
    ? getRandomDateInscription()
    : null;
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateContrat] = faker.datatype.boolean()
    ? getRandomDateContrat()
    : null;
  randomDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateSortieFormation] = faker.datatype.boolean()
    ? getRandomDateSortieFormation()
    : null;

  return {
    ...randomDonneesApprenant,
    ...params,
  };
};

export const createSampleXlsxBuffer = async (data, defaultSheetName = "Example") => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, defaultSheetName);
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  return buffer;
};
