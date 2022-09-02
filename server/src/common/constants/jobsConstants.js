/**
 * Nom des jobs
 */
export const JOB_NAMES = {
  createUser: "users:create-user",
  createAdmin: "users:create-admin",
  createIndexes: "indexes:create",
  generatePasswordUpdateToken: "users:generate-password-update-token",
};

/**
 * Statuts possibles pour les jobs
 */
export const JOB_STATUS = {
  started: "started",
  executed: "executed",
  ended: "ended",
};
