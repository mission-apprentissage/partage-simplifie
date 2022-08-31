/**
 * Mapping des Users vers l'API
 */

export const toUserApiOutput = (user) => ({
  id: user._id,
  email: user.email,
  role: user.role,
  nom: user.nom,
  prenom: user.prenom,
  fonction: user.fonction,
  telephone: user.telephone,
  outils_gestion: user.outils_gestion,
  nom_etablissement: user.nom_etablissement,
  created_at: user.created_at,
  password_updated_at: user.password_updated_at,
  password_updated_token_at: user.password_updated_token_at,
});
