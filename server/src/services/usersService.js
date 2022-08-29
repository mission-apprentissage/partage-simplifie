import { ROLES } from "../common/constants/roles.js";
import { generateRandomAlphanumericPhrase, hash } from "../common/utils/cryptoUtils.js";
import { UsersFactory } from "../factory/usersFactory.js";
import { COLLECTIONS_NAMES } from "../model/collections/index.js";
import { dbCollection } from "../model/db/mongodbClient.js";

/**
 * Méthode de création d'un utilisateur
 * génère un mot de passe par défaut
 * si aucun role n'est spécifié role CFA par défaut
 * si aucun username spécifié, on prends l'email
 * @param {*} userProps
 * @returns
 */
const create = async (userProps) => {
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

export default () => ({ create });
