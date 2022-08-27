import { connectToMongodb, getDatabase, closeMongodbConnection } from "../model/db/mongodbClient.js";
import { configureMongoDb } from "../model/db/mongodbUtils.js";
import { createServices } from "../services/services.js";
import { logger } from "../common/logger/logger.js";
import { formatDuration, intervalToDuration } from "date-fns";
import { JOB_STATUS } from "../common/constants/jobsConstants.js";

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
export const runScript = async (job, jobName) => {
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
