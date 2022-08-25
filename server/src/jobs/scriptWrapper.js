const { connectToMongodb, getDatabase, closeMongodbConnection } = require("../model/db/mongodbClient");
const { configureMongoDb } = require("../model/db/mongodbUtils");
const createServices = require("../services/services");
const logger = require("../common/logger");
const { formatDuration, intervalToDuration } = require("date-fns");
const { JOB_STATUS } = require("../common/constants/jobsConstants");

process.on("unhandledRejection", (e) => console.log(e));
process.on("uncaughtException", (e) => console.log(e));

/**
 * Fonction de sortie du script
 * @param {*} rawError
 */
const exit = async (rawError) => {
  let error = rawError;
  if (rawError) {
    logger.error(rawError.constructor.name === "EnvVarError" ? rawError.message : rawError);
  }

  setTimeout(() => {
    //Waiting logger to flush all logs (MongoDB)
    closeMongodbConnection().catch((e) => {
      console.error(e);
      process.exitCode = 1;
    });
  }, 500);

  process.exitCode = error ? 1 : 0;
};

/**
 * Wrapper pour l'execution de scripts
 * @param {*} job
 * @param {*} jobName
 */
const runScript = async (job, jobName) => {
  const startDate = new Date();

  // Start db connection & services injection
  await connectToMongodb();
  await configureMongoDb();
  const db = getDatabase();
  const services = await createServices({ db });

  await services.jobEvents.create({ jobname: jobName, action: JOB_STATUS.started });

  try {
    await job(services);

    const endDate = new Date();
    const duration = formatDuration(intervalToDuration({ start: startDate, end: endDate }));
    await services.jobEvents.create({
      jobname: jobName,
      action: JOB_STATUS.executed,
      data: { startDate, endDate, duration },
    });
    await exit();
  } catch (e) {
    await exit(e);
  } finally {
    await services.jobEvents.create({ jobname: jobName, action: JOB_STATUS.ended, date: new Date() });
  }
};

module.exports = { runScript };
