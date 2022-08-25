const { program: cli } = require("commander");
const { JOB_NAMES } = require("../common/constants/jobsConstants");
const { runCreateIndexes } = require("./create-indexes");
const { runScript } = require("./scriptWrapper");
const { runTest } = require("./test");

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
