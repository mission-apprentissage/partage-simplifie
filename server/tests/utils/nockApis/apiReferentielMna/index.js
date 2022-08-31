import nock from "nock";
import { config } from "../../../../config/index.js";
import { organismeFromReferentiel } from "./data.js";

const API_ENDPOINT = config.api.mnaReferentielApiEndpoint;

export const EMPTY_UAI = "0000000X";

export const nockFetchOrganismesWithUai = () => {
  nock(API_ENDPOINT).persist().get(`/organismes?uais=${EMPTY_UAI}`).reply(500, null);
  nock(API_ENDPOINT).persist().get("/organismes").query(true).reply(200, organismeFromReferentiel);
};
