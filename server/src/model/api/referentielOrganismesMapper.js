/**
 * Mapping des organismes du référentiel vers l'API
 */

export const toOrganismes = (referentielOrganisme) => ({
  uai: referentielOrganisme.uai,
  siret: referentielOrganisme.siret,
  adresse: referentielOrganisme.adresse?.label,
  nom_etablissement: referentielOrganisme.raison_sociale,
});
