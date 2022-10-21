import { connectToMongodb } from "../model/db/mongodbClient.js";
import createUserEventsService from "./userEventsService.js";
import createJobEventsService from "./jobEventsService.js";
import createUsersService from "./usersService.js";
import createOrganismesService from "./organismesService.js";
import createDemandesActivationCompteService from "./demandesActivationCompteService.js";
import createDonneesApprenantsService from "./donneesApprenantsService.js";
import createSignalementAnomalieService from "./signalementAnomalieService.js";

export const createServices = async (options = {}) => {
  const db = options.db || (await connectToMongodb()).db;
  const userEvents = options.userEvents || createUserEventsService();
  const jobEvents = options.jobEvents || createJobEventsService();
  const users = options.users || createUsersService();
  const organismes = options.organismes || createOrganismesService();
  const demandesActivationCompte = options.demandesActivationCompte || createDemandesActivationCompteService();
  const donneesApprenantsService = options.donneesApprenantsService || createDonneesApprenantsService();
  const signalementAnomalie = options.signalementAnomalie || createSignalementAnomalieService();

  return {
    userEvents,
    jobEvents,
    users,
    organismes,
    demandesActivationCompte,
    donneesApprenantsService,
    db,
    signalementAnomalie,
  };
};
