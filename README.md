# ts-vue-skeleton

TL;DR / Getting started:

Run `npm i && npm run watch-pack`

Sample component using;
- TypeScript, Babel, Webpack on the "main" side
- Vue with TypeScript, through Vite on the "render" side

The included packages and their configuration files should be appropriate for most common usecases.

The code is commented throughout, it's meant to be explored.

For breakpoints, it is recommended to use the "debugger" keyword at the relevant line in the code, as this stays accurate even after code transformations.

For code editor, VS Code is recommended, with the following extensions:
- ESLint: dbaeumer.vscode-eslint
- Prettier: esbenp.prettier-vscode
- Prettier ESLint: rvest.vs-code-prettier-eslint
- Vue Language Features: Vue.volar

### How do I test this in a MaxWhere Space?

The easiest way to test your component is to put it in a Space. To do so:
- have a space ready, probably the easiest way is to [export](https://tools.maxwhere.com/blender2mw/latest/) your own from [Blender](https://www.blender.org/)
- copy or link (mklink /d \<link_name\> \<target\>) this repository into `space_root_dir/components` (create the "components" dir if necessary)
- edit the Space's `Where.json`: you need to add a "components" property, (if not already present) and add the path to your `component.json` to it:
  > "components": {
    "ts-vue-skeleton": "./components/ts-vue-skeleton/component.json"
  }
  
  Of course, you can rename this repository
- edit the Space's `index.jsx`: add a new child node to the "root" node:
  > \<root\>
    \<ts-vue-skeleton \/\> [... (all the other nodes already present) ...] \<\/root\>
- open the Space in MaxWhere:
  
  Using `Ctrl` + `Alt` + `Shift` + `D` in the MaxWhere menu, you can select the location of your space, and open it.
  
  You can reload a space using `Ctrl` + `Alt` + `Shift` + `R`.
  

### Included npm commands:

- `npm run watch-ts` : runs tsc in watch mode for "main" side, and vite in watch mode for "render" side. Recommended for tracking down hard-to-find bugs, as this transforms main-side code the least.
- `npm run watch-pack` : runs webpack in watch mode for "main" side, and vite in watch mode for "render" side. Recommended when making incremental changes, as the packed main-side code can be reloaded on MW space reload.
- `npm run build` : runs webpack for "main" side, and vite for "render" side, resulting in a "production" build.

### Directories:
- `.vscode`: contains VS Code configuration (like formatter settings)
- `mwdist`: build folder, ignored by git
- `node_modules`: contains the packages required in `package.json`, and their dependencies, downloaded by npm
- `src`: "main" -side source files
- `ui`: "render" -side source files
- `util`: contains js scripts to be used during the build process

### Files in this directory:
- [component.json](component.json): defines basic properties about the component, like entrypoint (`main`), name, and optionally, a resources folder, for static assets
- [package.json](package.json): the package definition file, inherent to all nodejs packages, see [docs](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [tsconfig.json](tsconfig.json): configures how TypeScript should behave, see [docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [webpack.config.js](webpack.config.js): configures Webpack, and in our case, Babel (throu loader [options](webpack.config.js#26)). [docs](https://webpack.js.org/configuration/)
- [.eslintrc.js](.eslintrc.js): configures the rules for ESLint