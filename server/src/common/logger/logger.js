import bunyan from "bunyan";
import { config } from "../../../config/index.js";
import { consoleStream } from "./logger.console.js";
import { jsonStream } from "./logger.json.js";
import { mongodbStream } from "./logger.mongodb.js";
import { slackStream } from "./logger.slack.js";

/**
 * Valeurs possibles des logs streams
 */
const LOG_STREAM = {
  console: "console",
  slack: "slack",
  mongodb: "mongodb",
};

/**
 * Création de streams du logger
 * @returns
 */
const createStreams = () => {
  const { type, level } = config.log;

  const streams = type === LOG_STREAM.console ? [consoleStream(level)] : [jsonStream(level)];

  if (config.log.streams.includes(LOG_STREAM.slack) && config.slackWebhookUrl) {
    streams.push(slackStream(config.slackWebhookUrl, config.env));
  }

  if (config.log.streams.includes(LOG_STREAM.mongodb)) {
    streams.push(mongodbStream(level));
  }

  return streams;
};

/**
 * Création du logger
 */
export const logger = bunyan.createLogger({
  name: config.appName,
  serializers: bunyan.stdSerializers,
  err: function (err) {
    return {
      ...bunyan.stdSerializers.err(err),
      ...(err.errInfo ? { errInfo: err.errInfo } : {}),
    };
  },
  streams: createStreams(),
});
