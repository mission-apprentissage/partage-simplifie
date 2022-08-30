import { _post } from "../httpClient.js";

/**
 * Route API de Login
 * @param {*} values
 * @returns
 */
export const postLogin = (values) => {
  const URL = `/api/login/`;
  return _post(URL, values);
};

/**
 * Route API d'update du mot de passe
 * @param {*} token
 * @param {*} newPassword
 * @returns
 */
export const postUpdatePassword = async (token, newPassword) => {
  const URL = "/api/update-password";
  return await _post(URL, { newPassword: newPassword, token });
};

/**
 * Route d'API de recherche des utilisateurs
 * @param {*} filters
 * @returns
 */
export const fetchSearchUsers = async (filters) => {
  const URL = "/api/users/search";
  return await _post(URL, filters);
};

/**
 * Route d'API pour la génération de token d'update mot de passe d'un utilisateur
 * @param {*} username
 * @returns
 */
export const postGetUserUpdatePasswordUrl = async (username) => {
  const URL = "/api/users/generate-update-password-url";
  return await _post(URL, { username });
};
