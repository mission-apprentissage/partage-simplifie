import { parse } from "date-fns";

export const parseFormattedDate = (value) => (value ? parse(value, "dd-MM-yyyy", new Date()) : null);
