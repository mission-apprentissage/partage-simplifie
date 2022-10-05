// TODO Fill missing tooltips
export const donneesApprenantsFields = {
  cfd: {
    label: `"CFD"`,
    format: "11111111A",
    tooltip: {
      title: "Code formation diplôme",
      text: "11111111A \n8 chiffres 1 lettre \nexemple 51021202A",
    },
  },
  annee_scolaire: { label: `"Année scolaire"`, format: "20XX-20XX", tooltip: { title: "", text: "" } },
  annee_formation: {
    label: `"Année formation"`,
    format: "1, 2 ou 3",
    tooltip: { title: "Année formation", text: "1, 2 ou 3" },
  },
  nom_apprenant: {
    label: `"Nom de l'apprenant"`,
    format: "Au moins 1 lettre, espace/tiret/accent possibles - pas de chiffre",
    tooltip: { title: "", text: "" },
  },
  prenom_apprenant: {
    label: `"Prénom de l'apprenant"`,
    format: "Au moins 1 lettre, espace/tiret/accent possibles - pas de chiffre",
    tooltip: { title: "", text: "" },
  },
  date_de_naissance_apprenant: {
    label: `"Date de naissance de l'apprenant"`,
    format: "JJ-MM-AAAA",
    tooltip: { title: "", text: "" },
  },
  code_rncp: { label: `"Code RNCP"`, format: "RNCPXXXXX", tooltip: { title: "", text: "" } },
  telephone_apprenant: {
    label: `"Numéro de téléphone de l'apprenant"`,
    format: "10 chiffres commençant par 1 zéro",
    tooltip: { title: "Numéro de téléphone", text: "10 chiffres commençant par 1 zéro et séparé par des /" },
  },
  email_apprenant: {
    label: `"Email de l'apprenant"`,
    format: "courriel texte@texte.texte",
    tooltip: { title: "", text: "" },
  },
  ine_apprenant: {
    label: `"INE de l'apprenant"`,
    format: "10 chiffres et 1 lettre ou 9 chiffres et 2 lettres (les lettres ne sont pas à la fin)",
    tooltip: {
      title: "Numéro INE de l'apprenant.e",
      text: "10 chiffres et 1 lettre ou 9 chiffres et 2 lettres (les lettres ne sont pas à la fin) \nExemple 2134567A652",
    },
  },
  code_commune_insee_apprenant: {
    label: `"Code commune insee de l'apprenant"`,
    format:
      "5 chiffres : les 2 premiers sont le numéro du département à laquelle la ville est rattachée et les 3 autres sont un code donné à la commune.",
    tooltip: {
      title: "Code Commune INSEE",
      text: "5 chiffres : les 2 premiers sont le numéro du département à laquelle la ville est rattachée et les 3 autres sont un code donné à la commune",
    },
  },
  date_inscription: { label: `"Date d'inscription"`, format: "JJ-MM-AAAA", tooltip: { title: "", text: "" } },
  date_contrat: { label: `"Date de contrat"`, format: "JJ-MM-AAAA", tooltip: { title: "", text: "" } },
  date_sortie_formation: {
    label: `"Date de sortie de formation"`,
    format: "JJ-MM-AAAA",
    tooltip: { title: "", text: "" },
  },
};
