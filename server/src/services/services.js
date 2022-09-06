import { connectToMongodb } from "../model/db/mongodbClient.js";
import createUserEventsService from "./userEventsService.js";
import createJobEventsService from "./jobEventsService.js";
import createUsersService from "./usersService.js";
import createOrganismesService from "./organismesService.js";
import createDemandesActivationCompteService from "./demandesActivationCompteService.js";

export const createServices = async (options = {}) => {
  const userEvents = options.userEvents || createUserEventsService();
  const jobEvents = options.jobEvents || createJobEventsService();
  const users = options.users || createUsersService();
  const organismes = options.organismes || createOrganismesService();
  const demandesActivationCompte = options.demandesActivationCompte || createDemandesActivationCompteService();

  return {
    userEvents,
    jobEvents,
    users,
    organismes,
    demandesActivationCompte,
    db: options.db || (await connectToMongodb()).db,
  };
};
