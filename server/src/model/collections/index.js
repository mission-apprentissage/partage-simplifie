import JobEventsSchema from "./jobEventsSchema.js";
import UserEventsSchema from "./userEventsSchema.js";
import UsersSchema from "./userSchema.js";
import DemandeActivationCompteSchema from "./demandeActivationCompteSchema.js";
import SignalementAnomalieSchema from "./signalementAnomalieSchema.js";
import DonneesApprenantsSchema from "./donneesApprenantsSchema.js";

export const COLLECTIONS_SCHEMAS = [
  JobEventsSchema,
  UserEventsSchema,
  UsersSchema,
  DemandeActivationCompteSchema,
  DonneesApprenantsSchema,
];

export const COLLECTIONS_NAMES = {
  JobEvents: JobEventsSchema.name,
  UserEvents: UserEventsSchema.name,
  Users: UsersSchema.name,
  Logs: "logs",
  DemandesActivationCompte: DemandeActivationCompteSchema.name,
  SignalementAnomalie: SignalementAnomalieSchema.name,
  DonneesApprenants: DonneesApprenantsSchema.name,
};

export const COLLECTIONS_INDEXS = {
  JobEvents: JobEventsSchema.indexes,
  UserEvents: UserEventsSchema.indexes,
  Users: UsersSchema.indexes,
  DemandesActivationCompte: DemandeActivationCompteSchema.indexes,
  SignalementAnomalie: SignalementAnomalieSchema.indexes,
  DonneesApprenants: DonneesApprenantsSchema.indexes,
};
