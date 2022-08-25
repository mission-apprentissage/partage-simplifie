const bunyan = require("bunyan");
const config = require("../../../config");
const { consoleStream } = require("./logger.console");
const { jsonStream } = require("./logger.json");
const { mongodbStream } = require("./logger.mongodb.js");
const { slackStream } = require("./logger.slack");

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
module.exports = bunyan.createLogger({
  name: config.appName,
  serializers: bunyan.stdSerializers,
  streams: createStreams(),
});
