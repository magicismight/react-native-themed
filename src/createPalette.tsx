/**
 * Define colors for theme sets.
 */

export default function createPalette<
  D extends { [name: string]: T },
  S extends { [name: string]: string },
  T
>(
  definition: {
    [KS in keyof S]: D;
  }
): {
  [KD in keyof D]: {
    [KS in keyof S]: T;
  };
} {
  const palette = Object.create(null) as {
    [KD in keyof D]: {
      [KS in keyof S]: T;
    };
  };

  for (const mode of Object.keys(definition) as Array<keyof S>) {
    const modePalette = definition[mode] as D;
    for (const key of Object.keys(modePalette) as Array<keyof D>) {
      if (palette[key]) {
        palette[key][mode] = modePalette[key];
      } else {
        palette[key] = {
          [mode]: modePalette[key] as T
        } as {
          [KS in keyof S]: T;
        };
      }
    }
  }

  return palette;
}
