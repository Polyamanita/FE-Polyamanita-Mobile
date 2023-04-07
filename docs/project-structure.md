<img alt="React Native Typescript Boilerplate" src="../assets/logo.png" width="1050"/>

# 🍺 Project Structure

## File structure

`index.js` is the entry-point for our file, and is mandatory.
`App.tsx` is the main-point for our application. We can store global variables here, thus the Redux store and lightmode/darkmode variables wrap the entire app in this file.

- `/android` - contains native code specific to the Android OS.
  - `build.gradle` - Top level build file where configuration options to all modules of the applciation. 
  - `/app` - Native Polyamanita code
      - `build.gradle` - Specific build modular configuration for Polyamanita.
      - `/src/main` - 
        - `/assets` - Context of files not native to Android are placed here. The tensor-flow model, fonts, and mushroom labels reside here.  
        - `/java/com/polyamanita` - native modules to run on front end. Shroomalzyer code sits here.
        - `/res` - native application icons and splashscreen handeling.
- `/docs` - as the name suggests - any docs.
- `/node_modules` - React Native packages added with yarn package manager.
- `/src` - contains rendered JS and style code.
  - `/screens` - contains all screens/pages
  - `/services` - app-wide services
    - `/api` - generic network handling with API constants
    - `/event-emitter` - singleton event bus to use it everywhere in the project
    - `/models` - generic models should lay here
    - `/navigation` - navigation system lay here
  - `/shared` - whole app-wide shared
    - `/components` - app-wide shared components
    - `/constants` - app-wide shared constant variables
    - `/localization` - app-wide localization
    - `/theme` - app-wide theme which contains `color palette` and `fonts`
  - `/utils` - generic util functions
  - `index.js` - the starting place for our app
  - `App.tsx` - the main place for our app
- `.babelrc` - local configuration file for importing modules across the application. Cleans up import statements.
- `.commitlintrc.json` - a git commit linter
- `.eslintrc.js` - a set of rules fixes syntactic problems across application.
- `.prettierrc` - Prettier rules that formats code to enforce code styling consistancy.
- `babel.config.js` - instantiates context from native module plugins to use on front end (like the Shroomalyzer).
- `package.json` - Node modules and versioning.
- `README.md` - Remote repository text document.
- `tsconfig.json - TS rules and babel filepath context for TS
- 
