/**
 * Define colors for theme sets.
 */
import ThemedValue from './ThemedValue';

export default function createPalette<
  D extends { [name: string]: T },
  S extends { [name: string]: string },
  T
>(
  definition: {
    [KS in keyof S]: D;
  }
): { [KD in keyof D]: ThemedValue<{ [KS in keyof S]: T }, T> } {
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

  return Object.keys(palette).reduce((result, key) => {
    result[key] = new ThemedValue(palette[key]);
    return result;
  }, Object.create(null));
}
