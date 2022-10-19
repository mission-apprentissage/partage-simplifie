import { parse } from "date-fns";

export const parseFormattedDate = (value) => (value ? parse(value, dateFormat, new Date()) : null);
export const dateFormat = "dd/MM/yyyy";
export const XLSX_DateNF_Format = 'dd"/"mm"/"yyyy';
