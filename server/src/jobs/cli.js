import { program as cli } from "commander";
import { JOB_NAMES } from "../common/constants/jobsConstants.js";
import { runCreateIndexes } from "./create-indexes/index.js";
import { runScript } from "./scriptWrapper.js";
import { runTest } from "./test/index.js";

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

cli.parse(process.argv);
