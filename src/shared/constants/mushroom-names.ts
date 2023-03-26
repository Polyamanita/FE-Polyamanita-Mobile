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
  "some-capture-id": { scientific: "scientific", common: "common" },
  "some-capture-id-1": { scientific: "scientific1", common: "common1" },
  "some-capture-id-2": { scientific: "scientific2", common: "common2" },
  "some-other-id": { scientific: "scientificother", common: "commonother" },
  "11082_Xerocomellus_chrysenteron": {
    scientific: "Xerocomellus_chrysenteron",
    common: "lol",
  },
  "12919_Cylindrobasidium_laeve": {
    scientific: "Cylindrobasidium laeve",
    common: "lol",
  },
  "14064_Fomitopsis_pinicola": {
    scientific: "Fomitopsis pinicola",
    common: "lol",
  },
  "14160_Ganoderma_pfeifferi": {
    scientific: "Ganoderma pfeifferi",
    common: "lol",
  },
  "17233_Mycena_galericulata": {
    scientific: "Mycena galericulata",
    common: "lol",
  },
  "20983_Trametes_versicolor": {
    scientific: "Trametes versicolor",
    common: "lol",
  },
  "21143_Tricholoma_scalpturatum": {
    scientific: "Tricholoma scalpturatum",
    common: "lol",
  },
  "40392_Armillaria_lutea": { scientific: "Armillaria lutea", common: "lol" },
  "40985_Byssomerulius_corium": {
    scientific: "Byssomerulius corium",
    common: "lol",
  },
  "61207_Coprinellus_micaceus": {
    scientific: "Coprinellus micaceus",
    common: "lol",
  },
};

export const MUSHROOM_IDS: { [shroomID: string]: MushroomNames } = new Proxy(
  IDS,
  handler,
);
