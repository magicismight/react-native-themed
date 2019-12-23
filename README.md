# react-native-themed

## Installation

```
yarn add react-native-themed
```
or
```
npm i react-native-themed
```

## Usage

1. Provide theme context, and define theme mode for context value.

```
import { ThemeProvider } from 'react-native-themed';

function App() {
  // mode can be any valid string，usually we use 'light' and 'dark' to present system appearance.
  const mode = 'dark';
  return (
    <ThemeProvider value={mode}>
      <YourProjectComponent />
    </ThemeProvider>
  )
}

```

2. Create palette to adapt colors for different themes.

```
import { createPalette } from 'react-native-themed';

const LightBaseColors = {
  primaryBackground: '#fff',
  primaryFont: '#41464b',
};

const DarkBaseColors = {
  primaryBackground: 'rgb(40, 40, 40)',
  primaryFont: 'rgb(199, 199, 199)'
};

export const BaseColors = createPalette({
  'light': LightBaseColors,
  'dark': DarkBaseColors
});

```

3. Replace components Themed components

```
import Themed from 'react-native-themed';


<Themed.View style={{ flex: 1, backgroundColor: BaseColors.primaryBackground }}>
  <Themed.Text style={{ color: BaseColors.primaryFont }}>Text</Themed.Text>
</Themed.View>
```

## API

* ### ThemeProvider

```
import { ThemeProvider } from 'react-native-themed';


class ProvideThemeForApp extends Class {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

```

Provide `themed` [context](https://reactjs.org/docs/context.html) for a react child.


* ### createPalette

Create palette with a combination of `Themed.Value`s.

```
import Themed, { createPalette } from 'react-native-themed';

const LightBaseColors = {
  primaryBackground: '#fff',
  primaryFont: '#41464b',
};

const DarkBaseColors = {
  primaryBackground: 'rgb(40, 40, 40)',
  primaryFont: 'rgb(199, 199, 199)'
};


export const BasePalette = createPalette({
  'light': LightBaseColors,
  'dark': DarkBaseColors
});

// This is equal to: 

export const BasePalette = {
  primaryBackground: new Themed.Value({
    light: '#fff',
    dark: 'rgb(40, 40, 40)'
  }),
  primaryFont: new Themed.Value({
    light: '#41464b',
    dark: 'rgb(199, 199, 199)'
  }),
}

```

* ### createThemedComponent

`function createThemedComponent<P, S extends object>(Component: ComponentType<PropsWithChildren<P>>, transformer?: (props: PropsWithChildren<ThemeProps<S, P>>, mode: string) => PropsWithChildren<P>)`

Create a component with `themed` context, it will automatically transform `Themed.Value`s inside props into theme matched result.

```
import { View } from 'react-native';
import createThemedComponent from '../createThemedComponent';

const ThemedView = createThemedComponent(View);


/**
 * <ThemedView style={{ backgroundColor: new Themed.Value({ dark: 'white', light: 'black' }) }} />
 */
```

`createThemedComponent` takes a second optional argument: `transformer?: (props: PropsWithChildren<ThemeProps<S, P>>, mode: string) => PropsWithChildren<P>`. If the `Themed.Value` is nested inside prop value, using `transformer` could transform the prop properly.

Let's take (LinearGradient)[https://github.com/react-native-community/react-native-linear-gradient] as an example
```
import LinearGradient from 'react-native-linear-gradient';
import createThemedComponent, { transformValue, transformStyle } from '../createThemedComponent';

const ThemedLinearGradient = createThemedComponent(LinearGradient, (props) => {
  return {
    ...props,
    style: transformStyle(props.style),
    colors: props.colors ? props.colors.map((color) => {
      return transformValue(color);
    }) : props.colors
  }
});

```

Then the `ThemedLinearGradient` component can use `Themed.Value` inside `style` prop and `colors` prop.

```
<ThemedLinearGradient
  style={{
    borderColor: new Theme.Value({
      light: 'red',
      dark: 'blue'
    }),
    borderWidth: 2
  }}
  colors=[
    new Theme.Value({
      light: '#f00',
      dark: '#ff0'
    }),
    new Theme.Value({
      light: '#0ff',
      dark: '#00f'
    })
  ]
/>

```
