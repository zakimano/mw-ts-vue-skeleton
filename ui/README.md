# ui

This directory contains the source files for your "render" -side, or "overlay". The UI your users can interact with lives here.

While exploring the contents, keep in mind that this is a "module in a module" or "package in a package" situation: the npm scripts provided on the "outer" package (ts-vue-skeleton) will also call the scripts defined in this "ui" project's `package.json`.

The layout is similar, with the `src` dir housing the source files that are used to build the project. Vue is a relatively easy to pick-up framework for web-development, but there is still quite a lot to unpack here. At the time of writing, [this video](https://youtu.be/KTFH4P8unUQ) on Vue 3 by John Komarnicki looks like a good starting point. Keep in mind however that web-development is an extremely rapidly changing field, and as such new frameworks are popping up all over the place.

### Files in this directory:
- [index.html](index.html): This HTML file serves as the foundation of our web-application: the `<div id="app"></div>` on line 10 gets expanded by the JS script that is made when this project is built
- [vite.config.js](vite.config.js): configures how Vite should behave when building the project, [docs](https://vitejs.dev/config/)

## The text below is the normal Vue 3 introduction:

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
