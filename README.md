<img alt="Polyaminita" src="src/assets/logo.jpg" width="1050"/>

[![npm version](https://img.shields.io/npm/v/react-native-typescript-boilerplate.svg?style=for-the-badge)](https://www.npmjs.com/package/@freakycoder/react-native-typescript-boilerplate)
![Platform - Android](https://img.shields.io/badge/Platform-Android-blue?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

# Polyaminita Mobile

We're proudly announce that `Version 3` is here!

- Native Splash Screen
- New React Native Architecture Ready (RN 0.68+) 🍻
- Awesome Theme Support for both Light / Dark Mode
- Removed Optional Dependencies
- Latest `React` and `React Native` Dependencies
- All Dependencies are Upgraded
- Code Refactoring
- New GIF with the Project Example for Theming
- Much Better Documentation
- Detailed Roadmap

# 🍄 What's Included?

- **Feature 1**
- **Feature 2**

## Leaving these "features" here for digestion, to further investiage
- **Navigation System**
  - [React Navigation 6](https://reactnavigation.org/blog/2021/08/14/react-navigation-6.0/)
  - [React Navigation Helpers](https://github.com/WrathChaos/react-navigation-helpers)
  - Ready to use Stack and Tab Screens with navigation
- **NEW: Built-in Theme System with Hooks**
  - ☀️ Light Theme Support
  - 🌙 Dark Theme Support
  - Dynamic Color Palette System
  - Custom Font Support
  - Built-in Better `Text` Component
- **Ready to use [React Native Reanimated 2](https://docs.swmansion.com/react-native-reanimated/) Integration**
- **Native Splash Screen Integration**
  - [React Native Splash Screen](https://github.com/crazycodeboy/react-native-splash-screen)
- **Awesome [React Native Helpers](https://github.com/WrathChaos/react-native-helpers) Integration**
  - Noth Detection Support
  - Better Dimension Helper (Ex: ScreenWidth, ScreenHeight)
  - Cool Text Helpers
- **React Native Vector Icons**
  - [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
  - [React Native Dynamic Vector Icons](https://github.com/WrathChaos/react-native-dynamic-vector-icons)
- **[Localization](https://github.com/stefalda/ReactNativeLocalization) (Multi-Language Support)**
- **HTTP Network Management**
  - [Axios](https://github.com/axios/axios)**
  - [Axios Hooks](https://github.com/simoneb/axios-hooks)
  - API Service with Usage Examples
- **Built-in EventEmitter**
  - [EventBus](https://github.com/browserify/events#readme)
- **Babel Plugin Module Resolver**
  - Fixing the relative path problem
  - Visit `.babelrc` to ready to use and more customization
- **Pre-commit Husky Integration**
  - Ready to command husky setup with `npm run husky:setup`
  - `commitlint` Integration for better commit linter
  - Auto prettier on pre-commit
  - Awesome ESLint Integration
- **Built-in Custom Font Implementation**
  - All you need to do is copy-paste the .tff files into `assets/fonts` folder
  - Run `npx react-native-asset` command

- **More and more! :)**


## Husky Integration

Before doing anything else, please simply run the command to initalize the husky. If you do not run clean-up part you should run the husky setup by yourself

```jsx
npm run husky:setup
```

`husky:setup` will handle the initialization, installation and ready to use `commitlint`, `prettier` and `eslint`.


### Android local.properties (Android Only)

- `npm i`
- `cd android && mkdir local.properties`
- `nano local.properties`

#### Example of MacOS Android SDK Path

Make sure that set your right path of Android **SDK**

##### MacOS / Linux

Replace your machine name instead of `username`

```
sdk.dir=/Users/username/Library/Android/sdk
```

##### Windows

Replace your machine name instead of `username`

```
sdk.dir=/Users/username/Library/Android/sdk
```

- `cd .. & react-native run-ios/android`

# 📃 Documentations

- [Components](./docs/components.md)
- [Axios Hooks](./docs/axios-hooks.md)
- [Event Emitter Usage](./docs/event-emitter.md)
- [Project Structure](./docs/project-structure.md)

# 🔮 Roadmap

## Cool feature list to use while developing to get a sense of progress??

- [x] ~~LICENSE~~
- [x] ~~Better Husky: Linter, Prettier and Commintlint~~
- [x] ~~Removal of `react-native-animated-splash-screen`~~
- [x] ~~New Theme Support with React Navigation~~
- [x] ~~Implement the native splash screen with [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)~~
- [x] ~~Better and separated documentation~~
- [x] ~~Axios Hooks~~
- [x] ~~React Native New Architecture~~

## Credits

<span>
    <a href="https://github.com/WrathChaos/react-native-typescript-boilerplate">
        React Native / TypeScript Boilerplate
    </a> 
    by 
    <a href="https://github.com/WrathChaos">WrathChaos</a>

## License

Put license whatever here.