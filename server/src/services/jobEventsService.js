import { JobEventsFactory } from "../factory/jobEventsFactory.js";
import { dbCollection } from "../model/db/mongodbClient.js";
import { COLLECTIONS_NAMES } from "../model/collections/index.js";

/**
 * Création d'un JobEvent
 * @param {*} param0
 * @returns
 */
const create = async ({ jobname, action, data = {} }) => {
  const JobEventEntity = JobEventsFactory.create({ jobname, action, data });
  await dbCollection(COLLECTIONS_NAMES.JobEvents).insertOne(JobEventEntity);
  return;
};

/**
 * Vérifie si le job est déja dans un statut donné via son action
 * @param {*} jobname
 * @param {*} action
 * @returns
 */
const isJobInAction = async (jobname, action) => {
  const lastJobEvent = await dbCollection(COLLECTIONS_NAMES.JobEvents).findOne(
    { jobname: jobname },
    { sort: { created_at: "desc" }, limit: 1 }
  );
  return lastJobEvent?.action === action ?? false;
};

export default () => ({ create, isJobInAction });
