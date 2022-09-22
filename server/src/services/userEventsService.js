import { USER_EVENTS_ACTIONS } from "../common/constants/userEventsConstants.js";
import { UserEventsFactory } from "../factory/userEventsFactory.js";
import { COLLECTIONS_NAMES } from "../model/collections/index.js";
import { dbCollection } from "../model/db/mongodbClient.js";

/**
 * Création d'un UserEvent
 * @param {*} param0
 * @returns
 */
const createUserEvent = async ({ user_email, type, action, data }) => {
  const userEventEntity = UserEventsFactory.create({ user_email, type, action, data });
  await dbCollection(COLLECTIONS_NAMES.UserEvents).insertOne(userEventEntity);
  return;
};

/**
 * Récupération de l'historique des téléversements pour un mail utilisateur
 * @param {*} param0
 * @returns
 */
const getUploadHistoryList = async ({ user_email }) => {
  const userEventsUploadSuccessForUserMail = await dbCollection(COLLECTIONS_NAMES.UserEvents)
    .find({
      user_email: user_email,
      action: USER_EVENTS_ACTIONS.UPLOAD.SUCCESS,
      "data.originalname": { $exists: true },
    })
    .project({ "data.originalname": 1, created_at: 1 })
    .sort({ created_at: -1 })
    .toArray();

  return userEventsUploadSuccessForUserMail.map((item) => ({
    nom_fichier: item.data.originalname,
    date_creation: item.created_at,
  }));
};

export default () => ({ createUserEvent, getUploadHistoryList });
