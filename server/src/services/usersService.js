import { ROLES } from "../common/constants/roles.js";
import { compare, generateRandomAlphanumericPhrase, hash, isTooWeak } from "../common/utils/cryptoUtils.js";
import { UsersFactory } from "../factory/usersFactory.js";
import { COLLECTIONS_NAMES } from "../model/collections/index.js";
import { dbCollection } from "../model/db/mongodbClient.js";
import { addHours, isBefore } from "date-fns";
import { validatePassword } from "../domain/password.js";
import { config } from "../../config/index.js";
import { escapeRegExp } from "../common/utils/regexUtils.js";

const PASSWORD_UPDATE_TOKEN_VALIDITY_HOURS = 48;

/**
 * Méthode de création d'un utilisateur
 * génère un mot de passe par défaut
 * si aucun role n'est spécifié role CFA par défaut
 * si aucun username spécifié, on prends l'email
 * @param {*} userProps
 * @returns
 */
const createUser = async (userProps) => {
  // Champs obligatoires
  const email = userProps.email;
  const role = userProps.role || ROLES.cfa;

  // Mot de passe
  const password = userProps.password || generateRandomAlphanumericPhrase(80); // 1 hundred quadragintillion years to crack https://www.security.org/how-secure-is-my-password/
  const passwordHash = hash(password);

  // Champs optionnels
  const username = userProps.username || email;
  const nom = userProps.nom || null;
  const prenom = userProps.prenom || null;
  const fonction = userProps.fonction || null;
  const telephone = userProps.telephone || null;
  const outils_gestion = userProps.outils_gestion || [];
  const nom_etablissement = userProps.nom_etablissement || null;

  // Création via Factory
  const userEntity = UsersFactory.create({
    username,
    email,
    password: passwordHash,
    role,
    nom,
    prenom,
    fonction,
    telephone,
    outils_gestion,
    nom_etablissement,
  });

  // Ajout et renvoi de l'id
  const { insertedId } = await dbCollection(COLLECTIONS_NAMES.Users).insertOne(userEntity);
  return insertedId;
};

/**
 * Méthode de génération d'un token pour update du mot de passe de l'utilisateur
 * @param {*} username
 * @returns
 */
const generatePasswordUpdateToken = async (username) => {
  const user = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ username });

  if (!user) {
    throw new Error("User not found");
  }

  const token = generateRandomAlphanumericPhrase(80); // 1 hundred quadragintillion years to crack https://www.security.org/how-secure-is-my-password/

  // MAJ l'utilisateur avec un token et un token_expiry
  await dbCollection(COLLECTIONS_NAMES.Users).findOneAndUpdate(
    { username: username },
    {
      $set: {
        password_update_token: token,
        password_update_token_expiry: addHours(new Date(), PASSWORD_UPDATE_TOKEN_VALIDITY_HOURS),
      },
    }
  );

  return token;
};

/**
 * Vérifie que le token du user est valide et l'expiry valide
 * @param {*} user
 * @returns
 */
const isUserPasswordUpdatedTokenValid = (user) => {
  return Boolean(user.password_update_token_expiry) && isBefore(new Date(), user.password_update_token_expiry);
};

/**
 * Méthode de maj du password du user
 * @param {*} updateToken
 * @param {*} password
 * @returns
 */
const updatePassword = async (updateToken, password) => {
  if (!validatePassword(password)) throw new Error("Password must be valid (at least 16 characters)");

  // find user with password_update_token and ensures it exists
  const user = await dbCollection(COLLECTIONS_NAMES.Users).findOne({
    password_update_token: updateToken,
    password_update_token_expiry: { $ne: null },
  });

  // throw if user is not found
  if (!user) throw new Error("User not found");

  // token must be valid
  if (!isUserPasswordUpdatedTokenValid(user)) {
    throw new Error("Password update token has expired");
  }

  // MAJ l'utilisateur avec un password et reset du token & token policy
  const updated = await dbCollection(COLLECTIONS_NAMES.Users).findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        password: hash(password),
        password_update_token: null,
        password_update_token_expiry: null,
      },
    },
    { returnDocument: "after" }
  );

  return updated.value;
};

/**
 * Méthode de rehash du password de l'utilisateur
 * @param {*} user
 * @param {*} password
 * @returns
 */
const rehashPassword = async (userId, password) => {
  const updated = await dbCollection(COLLECTIONS_NAMES.Users).findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        password: hash(password),
      },
    },
    { returnDocument: "after" }
  );

  return updated;
};

/**
 * Méthode d'authentification de l'utilisateur
 * compare les hash des mots de passe
 * @param {*} username
 * @param {*} password
 * @returns
 */
const authenticate = async (username, password) => {
  const user = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ username });
  if (!user) {
    return null;
  }

  const current = user.password;
  if (compare(password, current)) {
    if (isTooWeak(current)) {
      await rehashPassword(user, password);
    }
    return user;
  }
  return null;
};

/**
 * Méthode de récupération d'un user depuis son username
 * @param {*} username
 * @returns
 */
const getUser = async (username) => {
  const user = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ username });
  if (!user) {
    throw new Error(`Unable to find user`);
  }

  return user;
};

/**
 * Méthode de récupération d'un user depuis son id
 * @param {*} _id
 * @returns
 */
const getUserById = async (_id) => {
  const user = await dbCollection(COLLECTIONS_NAMES.Users).findOne({ _id: _id });

  if (!user) {
    throw new Error(`Unable to find user`);
  }

  return user;
};

/**
 * Méthode de récupération de la liste des utilisateurs en base
 * @returns
 */
const getAllUsers = async () => await dbCollection(COLLECTIONS_NAMES.Users).find().toArray();

/**
 * Méthode de récupération du lien de maj de mot de passe
 * @param {*} token
 * @returns
 */
const getUpdatePasswordLink = (token) => `${config.publicUrl}/modifier-mot-de-passe?token=${token}`;

/**
 * Méthode de recherche d'utilisateurs selon plusieurs critères
 * @param {*} searchCriteria
 * @returns
 */
const searchUsers = async (searchCriteria) => {
  const { searchTerm } = searchCriteria;

  const matchStage = {};
  if (searchTerm) {
    matchStage.$or = [
      { username: new RegExp(escapeRegExp(searchTerm), "i") },
      { email: new RegExp(escapeRegExp(searchTerm), "i") },
      { nom_etablissement: new RegExp(escapeRegExp(searchTerm), "i") },
    ];
  }

  const sortStage = { nom_etablissement: 1 };

  const found = await dbCollection(COLLECTIONS_NAMES.Users).aggregate([{ $match: matchStage }, { $sort: sortStage }]);

  return found.toArray();
};

export default () => ({
  createUser,
  generatePasswordUpdateToken,
  updatePassword,
  authenticate,
  getUserById,
  getUser,
  getAllUsers,
  getUpdatePasswordLink,
  searchUsers,
});
