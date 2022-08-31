/*
  UAI stands for Unité Administrative Immatriculée, a code used in the
  Répertoire National des Etablissements (RNE) to identify collèges, lycées, CFA...
*/
import Joi from "joi";

const UAI_REGEX = /^[0-9_]{7}[a-zA-Z]{1}$/;
export const schema = Joi.string().length(8).regex(UAI_REGEX);
export const validateUai = (uai) => schema.required().validate(uai);
