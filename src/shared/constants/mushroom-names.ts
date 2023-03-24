const handler = {
  get: function (target: any, name: string) {
    return Object.prototype.hasOwnProperty.call(target, name)
      ? target[name]
      : { scientific: "huh??", common: "huh???" };
  },
};

// MUSHROOM CLASSES FROM SHROOMALYZER
const NAMES = {
  "some-capture-id": { scientific: "scientific", common: "common" },
  "some-capture-id-1": { scientific: "scientific1", common: "common1" },
  "some-capture-id-2": { scientific: "scientific2", common: "common2" },
  "some-other-id": { scientific: "scientificother", common: "commonother" },
  11082: { scientific: "Xerocomellus_chrysenteron", common: "lol" },
  12919: { scientific: "Cylindrobasidium_laeve", common: "lol" },
  14064: { scientific: "Fomitopsis_pinicola", common: "lol" },
  14160: { scientific: "Ganoderma_pfeifferi", common: "lol" },
  17233: { scientific: "Mycena_galericulata", common: "lol" },
  20983: { scientific: "Trametes_versicolor", common: "lol" },
  21143: { scientific: "Tricholoma_scalpturatum", common: "lol" },
  40392: { scientific: "Armillaria_lutea", common: "lol" },
  40985: { scientific: "Byssomerulius_corium", common: "lol" },
  61207: { scientific: "Coprinellus_micaceus", common: "lol" },
};

export const MUSHROOM_IDS = new Proxy(NAMES, handler);
