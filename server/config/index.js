import env from "env-var";

export const config = {
  appName: env.get("PARTAGE_SIMPLIFIE_NAME").default("Partage simplifié").asString(),
  env: env.get("PARTAGE_SIMPLIFIE_ENV").default("local").asString(),
  publicUrl: env.get("PARTAGE_SIMPLIFIE_PUBLIC_URL").default("http://localhost").asString(),
  mongodb: {
    uri: env
      .get("PARTAGE_SIMPLIFIE_MONGODB_URI")
      .default("mongodb://127.0.0.1:27017/partage-simplifie?retryWrites=true&w=majority")
      .asString(),
  },
  log: {
    type: env.get("PARTAGE_SIMPLIFIE_LOG_TYPE").default("console").asString(),
    level: env.get("PARTAGE_SIMPLIFIE_LOG_LEVEL").default("info").asString(),
    streams: env.get("PARTAGE_SIMPLIFIE_LOG_STREAMS").default([]).asArray(),
    mongodbCapped: {
      size: env.get("PARTAGE_SIMPLIFIE_LOG_CAPPED_SIZE").default(100000000).asInt(),
      max: env.get("PARTAGE_SIMPLIFIE_LOG_CAPPED_MAX").default(100000).asInt(),
    },
  },
  slackWebhookUrl: env.get("PARTAGE_SIMPLIFIE_SLACK_WEBHOOK_URL").asString(),
};
