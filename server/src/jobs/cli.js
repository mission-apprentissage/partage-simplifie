import { program as cli } from "commander";
import { JOB_NAMES } from "../common/constants/jobsConstants.js";
import { runCreateIndexes } from "./create-indexes/index.js";
import { runScript } from "./scriptWrapper.js";
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
    runScript(async ({ userEvents }) => {
      return runTest(userEvents);
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
  .requiredOption("-u, --username <string>", "Username de l'utilisateur à créer")
  .requiredOption("-e, --email <string>", "Email de l'utilisateur à créer")
  .requiredOption("-r, --role <string>", "Role de l'utilisateur à créer")
  .action(({ username, email, role }) => {
    runScript(async ({ users }) => {
      return runCreateUser(users, { username, email, role });
    }, JOB_NAMES.createUser);
  });

/**
 * Job de génération de lien de modification de mot de passe
 */
cli
  .command("generate-password-update-token")
  .description("Génération du lien de MAJ de mot de passe")
  .requiredOption("-u, --username <string>", "Username de l'utilisateur à créer")
  .action(({ username }) => {
    runScript(async ({ users }) => {
      return runGeneratePasswordUpdateToken(users, { username });
    }, JOB_NAMES.generatePasswordUpdateToken);
  });

cli.parse(process.argv);
