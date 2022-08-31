import { nockFetchOrganismesWithUai } from "./apiReferentielMna/index.js";

export const nockExternalApis = () => {
  nockFetchOrganismesWithUai();
};
