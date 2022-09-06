import nock from "nock";
import { config } from "../../../../config/index.js";
import {
  INEXISTANT_UAI,
  sampleMultiplesOrganismesFromReferentiel,
  sampleUniqueOrganismeFromReferentiel,
  SAMPLE_UAI_MULTIPLES_ORGANISMES,
  SAMPLE_UAI_UNIQUE_ORGANISME,
} from "./data.js";

const API_ENDPOINT = config.api.mnaReferentielApiEndpoint;

export const nockFetchOrganismesWithUai = () => {
  nock(API_ENDPOINT).persist().get(`/organismes?uais=${INEXISTANT_UAI}`).reply(500, null);

  nock(API_ENDPOINT)
    .persist()
    .get(`/organismes?uais=${SAMPLE_UAI_UNIQUE_ORGANISME}`)
    .reply(200, sampleUniqueOrganismeFromReferentiel);

  nock(API_ENDPOINT)
    .persist()
    .get(`/organismes?uais=${SAMPLE_UAI_MULTIPLES_ORGANISMES}`)
    .reply(200, sampleMultiplesOrganismesFromReferentiel);
};
