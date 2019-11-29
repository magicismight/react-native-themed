/**
 * Define colors for theme sets.
 */

export default function definePalette<
  D extends { [name: string]: string },
  S extends { [name: string]: string }
>(
  definition: {
    [KS in keyof S]: D;
  }
): {
  [KD in keyof D]: {
    [KS in keyof S]: string;
  };
} {
  const palette = Object.create(null) as {
    [KD in keyof D]: {
      [KS in keyof S]: string;
    };
  };

  for (const mode of Object.keys(definition) as Array<keyof S>) {
    const modePalette = definition[mode] as D;
    for (const key of Object.keys(modePalette) as Array<keyof D>) {
      if (palette[key]) {
        palette[key][mode] = modePalette[key];
      } else {
        palette[key] = {
          [mode]: modePalette[key] as string
        } as {
          [KS in keyof S]: string;
        };
      }
    }
  }

  return palette;
}
