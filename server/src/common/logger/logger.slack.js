import BunyanSlack from "bunyan-slack";
import util from "util";
import throttle from "lodash.throttle";

/**
 * Envoi les logs dans Slack
 * @returns
 */
export const slackStream = (slackWebhookUrl, envName) => {
  const stream = new BunyanSlack(
    {
      webhook_url: slackWebhookUrl,
      customFormatter: (record, levelName) => {
        if (record.type === "http") {
          record = {
            url: record.request.url.relative,
            statusCode: record.response.statusCode,
            ...(record.error ? { message: record.error.message } : {}),
          };
        }
        return {
          text: util.format(`[%s][${envName}] %O`, levelName.toUpperCase(), record),
        };
      },
    },
    (error) => {
      console.error("Unable to send log to slack", error);
    }
  );

  stream.write = throttle(stream.write, 5000);

  return {
    name: "slack",
    level: "error",
    stream,
  };
};
