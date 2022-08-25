/**
 * Nom des jobs
 */
const JOB_NAMES = {
  createUser: "users:create-user",
  createIndexes: "indexes:create",
  generatePasswordUpdateToken: "users:generate-password-update-token",
};

/**
 * Statuts possibles pour les jobs
 */
const JOB_STATUS = {
  started: "started",
  executed: "executed",
  ended: "ended",
};

module.exports = { JOB_NAMES, JOB_STATUS };
