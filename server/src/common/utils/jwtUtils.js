import jwt from "jsonwebtoken";
import { config } from "../../../config/index.js";

/**
 * Création d'un token utilisateur
 * @param {*} user
 * @returns
 */
export const createUserToken = (user) => {
  // Liste des champs propres à l'utilisateur à ajouter au payload du token
  const payload = {
    role: user.role,
    nom_etablissement: user.nom_etablissement || null,
    uai: user.uai || null,
    siret: user.siret || null,
    adresse: user.adresse || null,
    outils_gestion: user.outils_gestion || null,
  };
  const subject = user.email;
  const jwtSecret = config.auth.user.jwtSecret;
  const expiresIn = config.auth.user.expiresIn;

  return jwt.sign(payload, jwtSecret, {
    issuer: config.appName,
    expiresIn,
    subject,
  });
};
