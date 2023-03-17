const handler = {
  get: function (target: any, name: string) {
    return Object.prototype.hasOwnProperty.call(target, name)
      ? target[name]
      : { scientific: "huh??", common: "huh???" };
  },
};

// MUSHROOM CLASSES FROM SHROOMALYZER
const NAMES = {
  id1: { scientific: "scientific1", common: "common1" },
  id2: { scientific: "scientific2", common: "common2" },
  id3: { scientific: "scientific3", common: "common3" },
};

export const MUSHROOM_NAMES = new Proxy(NAMES, handler);
