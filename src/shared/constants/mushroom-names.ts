const handler = {
  get: function (target: any, name: string) {
    return Object.prototype.hasOwnProperty.call(target, name)
      ? target[name]
      : { scientific: "huh??", common: "huh???" };
  },
};

export interface MushroomNames {
  scientific: string;
  common: string;
}

// MUSHROOM CLASSES FROM SHROOMALYZER
const IDS = {
  // "some-capture-id": { scientific: "scientific", common: "common" },
  // "some-capture-id-1": { scientific: "scientific1", common: "common1" },
  // "some-capture-id-2": { scientific: "scientific2", common: "common2" },
  // "some-other-id": { scientific: "scientificother", common: "commonother" },
  // "11082_Xerocomellus_chrysenteron": {
  //   scientific: "Xerocomellus chrysenteron",
  //   common: "Red-cracking Bolete",
  // },
  // "12919_Cylindrobasidium_laeve": {
  //   scientific: "Cylindrobasidium laeve",
  //   common: "Tear Dropper",
  // },
  // "14064_Fomitopsis_pinicola": {
  //   scientific: "Fomitopsis pinicola",
  //   common: "Red-belted Conk",
  // },
  // "14160_Ganoderma_pfeifferi": {
  //   scientific: "Ganoderma pfeifferi",
  //   common: "Beeswax Bracket",
  // },
  // "17233_Mycena_galericulata": {
  //   scientific: "Mycena galericulata",
  //   common: "Common Bonnet",
  // },
  // "20983_Trametes_versicolor": {
  //   scientific: "Trametes versicolor",
  //   common: "Turkey Tail",
  // },
  // "21143_Tricholoma_scalpturatum": {
  //   scientific: "Tricholoma scalpturatum",
  //   common: "Yellowing Knight",
  // },
  // "40392_Armillaria_lutea": {
  //   scientific: "Armillaria lutea",
  //   common: "Bulbous Honey Fungus",
  // },
  // "40985_Byssomerulius_corium": {
  //   scientific: "Byssomerulius corium",
  //   common: "Netted Crust",
  // },
  // "61207_Coprinellus_micaceus": {
  //   scientific: "Coprinellus micaceus",
  //   common: "Mica Cap",
  // },
  /* eslint-disable camelcase */
  Lycoperdon_marginatum: {
    scientific: "Lycoperdon marginatum",
    common: "Peeling Puffball",
  },
  Pleurotus_pulmonarius: {
    scientific: "Pleurotus pulmonarius",
    common: "Phoenix Oyster",
  },
  Clathrus_columnatus: {
    scientific: "Clathrus columnatus",
    common: "Column Stinkhorn",
  },
  Scleroderma_citrinum: {
    scientific: "Scleroderma citrinum",
    common: "Common Earthball",
  },
  Trametes_lactinea: { scientific: "Trametes lactinea", common: "Turkey Tail" },
  Omphalotus_subilludens: {
    scientific: "Omphalotus subilludens",
    common: "Southern Jack-o'-Lantern",
  },
  Leucocoprinus_fragilissimus: {
    scientific: "Leucocoprinus fragilissimus",
    common: "Fragile Dapperlink",
  },
  Phallus_rugulosus: {
    scientific: "Phallus rugulosus",
    common: "Wrinkly Stinkhorn",
  },
  Chlorophyllum_molybdites: {
    scientific: "Chlorophyllum molybdites",
    common: "False Parasol",
  },
  Pycnoporus_cinnabarinus: {
    scientific: "Pycnoporus cinnabarinus",
    common: "Cinnabar Polypore",
  },
  Leucocoprinus_birnbaumii: {
    scientific: "Leucocoprinus birnbaumii",
    common: "Flowerpot Parasol",
  },
  Coprinopsis_lagopus: {
    scientific: "Coprinopsis lagopus",
    common: "Hare's Foot Inkcap",
  },
  Hortiboletus_rubellus: {
    scientific: "Hortiboletus rubellus",
    common: "Ruby Bolete",
  },
  Coprinellus_disseminatus: {
    scientific: "Coprinellus disseminatus",
    common: "Fairy Inkcap",
  },
  Pholiota_adiposa: {
    scientific: "Pholiota adiposa",
    common: "Chestnut",
  },
  Xerocomellus_chrysenteron: {
    scientific: "Xerocomellus chrysenteron",
    common: "Red-cracking Bolete",
  },
  Cylindrobasidium_laeve: {
    scientific: "Cylindrobasidium laeve",
    common: "Tear Dropper",
  },
  Ganoderma_pfeifferi: {
    scientific: "Ganoderma pfeifferi",
    common: "Beeswax Bracket",
  },
  Mycena_galericulata: {
    scientific: "Mycena galericulata",
    common: "Common Bonnet",
  },
  Tricholoma_scalpturatum: {
    scientific: "Tricholomas calpturatum",
    common: "Yellowing Knight",
  },
  /* eslint-enable camelcase */
};

export const MUSHROOM_IDS: { [shroomID: string]: MushroomNames } = new Proxy(
  IDS,
  handler,
);
