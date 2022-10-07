import { program as cli } from "commander";
import { JOB_NAMES } from "../common/constants/jobsConstants.js";
import { ROLES } from "../common/constants/roles.js";
import { runCreateIndexes } from "./create-indexes/index.js";
import { runScript } from "./scriptWrapper.js";
import { runSendDossiersApprenantsToTdb } from "./send-dossiersApprenants/index.js";
import { runTest } from "./test/index.js";
import { runCreateUser } from "./users/create/index.js";
import { runGeneratePasswordUpdateToken } from "./users/generate-password-update-token/index.js";

/**
 * Job de test
 */
cli
  .command("test")
  .description("Job de test")
  .action(() => {
    runScript(async ({ userEvents, organismes }) => {
      return runTest(userEvents, organismes);
    }, "test");
  });

/**
 * Job de création des indexs mongodb
 */
cli
  .command("create-indexes")
  .description("Création des indexs mongodb")
  .action(() => {
    runScript(async () => {
      return runCreateIndexes();
    }, JOB_NAMES.createIndexes);
  });

/**
 * Job de création d'utilisateur
 */
cli
  .command("create-user")
  .description("Création d'utilisateur")
  .requiredOption("-e, --email <string>", "Email de l'utilisateur à créer")
  .requiredOption("-r, --role <string>", "Role de l'utilisateur à créer")
  .action(({ email, role }) => {
    runScript(async ({ users }) => {
      return runCreateUser(users, { email, role });
    }, JOB_NAMES.createUser);
  });

/**
 * Job de création d'administrateur
 */
cli
  .command("create-admin")
  .description("Création d'administration")
  .requiredOption("-e, --email <string>", "Email de l'administrateur à créer")
  .action(({ email }) => {
    runScript(async ({ users }) => {
      return runCreateUser(users, { email, role: ROLES.ADMINISTRATOR });
    }, JOB_NAMES.createUser);
  });

/**
 * Job de génération de lien de modification de mot de passe
 */
cli
  .command("generate-password-update-token")
  .description("Génération du lien de MAJ de mot de passe")
  .requiredOption("-e, --email <string>", "Email de l'utilisateur à créer")
  .action(({ email }) => {
    runScript(async ({ users }) => {
      return runGeneratePasswordUpdateToken(users, { email });
    }, JOB_NAMES.generatePasswordUpdateToken);
  });

/**
 * Job d'envoi des données apprenants à l'API du TDB
 */
cli
  .command("send-dossiersApprenants")
  .description("Job d'envoi des données apprenants sous forme de dossiersApprenants à l'API du Tdb")
  .action(() => {
    runScript(async ({ jobEvents }) => {
      return runSendDossiersApprenantsToTdb(jobEvents);
    }, JOB_NAMES.sendDossiersApprenants);
  });

cli.parse(process.argv);
