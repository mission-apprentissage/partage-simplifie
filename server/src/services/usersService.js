import { ROLES } from "../common/constants/roles.js";
import { generateRandomAlphanumericPhrase, hash } from "../common/utils/cryptoUtils.js";
import { UsersFactory } from "../factory/usersFactory.js";
import { COLLECTIONS_NAMES } from "../model/collections/index.js";
import { dbCollection } from "../model/db/mongodbClient.js";
import { addHours, isBefore } from "date-fns";
import { validatePassword } from "../domain/password.js";

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
    { new: true }
  );

  return updated;
};

export default () => ({ createUser, generatePasswordUpdateToken, updatePassword });
