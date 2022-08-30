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
