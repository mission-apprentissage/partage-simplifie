import nock from "nock";
import { config } from "../../../../config/index.js";
import { INEXISTANT_UAI, sampleOrganismeFromReferentiel } from "./data.js";

const API_ENDPOINT = config.api.mnaReferentielApiEndpoint;

export const nockFetchOrganismesWithUai = () => {
  nock(API_ENDPOINT).persist().get(`/organismes?uais=${INEXISTANT_UAI}`).reply(500, null);
  nock(API_ENDPOINT).persist().get("/organismes").query(true).reply(200, sampleOrganismeFromReferentiel);
};
