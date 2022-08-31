export const INEXISTANT_UAI = "0000000X";

export const sampleOrganismeFromReferentiel = {
  pagination: {
    page: 1,
    resultats_par_page: 10,
    nombre_de_page: 1,
    total: 1,
  },
  organismes: [
    {
      siret: "19921500500018",
      adresse: {
        academie: {
          code: "25",
          nom: "Versailles",
        },
        code_insee: "92062",
        code_postal: "92800",
        departement: {
          code: "92",
          nom: "Hauts-de-Seine",
        },
        geojson: {
          geometry: {
            coordinates: [2.237019, 48.882785],
            type: "Point",
          },
          properties: {
            score: 0.9685681818181818,
            source: "geo-adresse-api",
          },
          type: "Feature",
        },
        label: "26 Rue Lucien Voilin 92800 Puteaux",
        localite: "Puteaux",
        region: {
          code: "11",
          nom: "Île-de-France",
        },
      },
      raison_sociale: "LYCEE PROFESSIONNEL VOILIN",
      uai: "0921500F",
    },
  ],
};
