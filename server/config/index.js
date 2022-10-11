import env from "env-var";

const DEFAULT_MNA_REFERENTIEL_API_URL = "https://referentiel.apprentissage.beta.gouv.fr/api/v1";

export const config = {
  appName: env.get("PARTAGE_SIMPLIFIE_NAME").default("Partage simplifié").asString(),
  env: env.get("PARTAGE_SIMPLIFIE_ENV").default("local").asString(),
  publicUrl: env.get("PARTAGE_SIMPLIFIE_PUBLIC_URL").default("http://localhost").asString(),
  mongodb: {
    uri: env
      .get("PARTAGE_SIMPLIFIE_MONGODB_URI")
      .default("mongodb://localhost:27017/partage-simplifie?retryWrites=true&w=majority")
      .asString(),
  },
  auth: {
    passwordHashRounds: env.get("PARTAGE_SIMPLIFIE_AUTH_PASSWORD_HASH_ROUNDS").default(10000).asInt(),
    user: {
      jwtSecret: env.get("PARTAGE_SIMPLIFIE_AUTH_USER_JWT_SECRET").default("123").asString(),
      expiresIn: env.get("PARTAGE_SIMPLIFIE_AUTH_USER_JWT_SECRET_EXPIRES").default("168h").asString(),
    },
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
  api: {
    mnaReferentielApiEndpoint: env
      .get("PARTAGE_SIMPLIFIE_MNA_REFERENTIEL_ENDPOINT_URL")
      .default(DEFAULT_MNA_REFERENTIEL_API_URL)
      .asString(),
    mnaTdb: {
      endPoint: env.get("PARTAGE_SIMPLIFIE_MNA_TDB_ENDPOINT_URL").default("").asString(),
      userName: env.get("PARTAGE_SIMPLIFIE_MNA_TDB_USER_NAME").default("").asString(),
      userPassword: env.get("PARTAGE_SIMPLIFIE_MNA_TDB_USER_PASSWORD").default("").asString(),
    },
  },
};
