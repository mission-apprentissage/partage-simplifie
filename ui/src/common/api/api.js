import { _get, _post } from "../httpClient.js";

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
  const URL = "/api/user/update-password";
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
 * @param {*} email
 * @returns
 */
export const postGetUserUpdatePasswordUrl = async (email) => {
  const URL = "/api/users/generate-update-password-url";
  return await _post(URL, { email });
};

/**
 * Route d'API pour la demande d'activation de compte depuis un email
 * @param {*} email
 * @returns
 */
export const postDemandeActivationCompte = async (email) => {
  const URL = "/api/demandes-activation-compte";
  return await _post(URL, { email });
};

/**
 * Route d'API pour la récupération des organismes par UAI depuis le référentiel
 * @param {*} email
 * @returns
 */
export const getOrganismesInReferentielByUai = async (uai) => {
  const URL = "/api/organismes";
  return await _get(`${URL}/${uai}`);
};

/**
 * Route d'API pour la vérification de l'existence d'un utilisateur avec un couple UAI SIRET
 * @param {*} email
 * @returns
 */
export const getExistingUserByUaiSiret = async ({ uai, siret }) => {
  const URL = `/api/user/exist-uai-siret?uai=${uai}&siret=${siret}`;
  return await _get(URL);
};

/**
 * Route d'API pour la vérification de l'existence d'un utilisateur par son email
 * @param {*} email
 * @returns
 */
export const getExistingUser = async (email) => {
  const URL = `/api/user/exist?email=${email}`;
  return await _get(URL);
};

/**
 * Route d'API pour l'inscription d'un utilisateur
 * @param {*} values
 * @returns
 */
export const postRegister = async (values) => {
  const URL = `/api/register`;
  return await _post(URL, values);
};

/**
 * Route d'API pour la récupération de l'historique de téléversement
 * @returns
 */
export const getUploadHistory = async () => {
  const URL = `/api/of/upload-history`;
  return await _get(URL);
};
