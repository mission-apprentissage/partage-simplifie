import jwt from "jsonwebtoken";
import { config } from "../../../config/index.js";

/**
 * Création d'un token générique
 * @param {*} type
 * @param {*} subject
 * @param {*} options
 * @returns
 */
export const createToken = (type, subject, options = {}) => {
  const defaults = config.auth[type];
  const secret = options.secret || defaults.jwtSecret;
  const expiresIn = options.expiresIn || defaults.expiresIn;
  const payload = options.payload || {};

  return jwt.sign(payload, secret, {
    issuer: config.appName,
    expiresIn: expiresIn,
    subject: subject,
  });
};

/**
 * Création d'un token utilisateur
 * @param {*} user
 * @param {*} options
 * @returns
 */
export const createUserToken = (user, options = {}) => {
  // Liste des champs propres à l'utilisateur à ajouter au payload du token
  const payload = { role: user.role, nom_etablissement: user.nom_etablissement || null };
  return createToken("user", user.username, { payload, ...options });
};
