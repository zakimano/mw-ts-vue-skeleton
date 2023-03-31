const path = require("path");

const MODE = "development";

// the paths to transpile with babel
const BABEL_INCLUDE = [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")];

module.exports = [
  {
    mode: MODE,
    devtool: false,
    // entrypoint for webpack: this will be the "root" of the include tree, any file unreachable from here through imports or children's imports will be ignored
    entry: {
      index: "./src/index",
    },
    // Targeting Node.js (this is fine even for WebMW since it emulates a Node environment)
    target: ["node", "es5"],
    module: {
      rules: [
        {
          // Match js, jsx, ts and tsx
          test: /\.(j|t)sx?$/,
          // Transpile with Babel, since component code goes through jstransform, which only supports the antediluvian ES5 syntax
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
              // We need to target an early node version for maximum compatibility with webMW
              targets: {
                node: "8",
              },
              plugins: [],
              overrides: [
                {
                  test: "./node_modules",
                  sourceType: "unambiguous",
                },
              ],
              cacheDirectory: true,
              // Use babel.config.json instead of .babelrc
              babelrc: false,
            },
          },
          include: BABEL_INCLUDE,
          // define excludes here (if any)
          // exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      // file extensions to include in the search
      extensions: [".jsx", ".tsx", ".ts", ".js"],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "mwdist"),
      library: {
        // Make a CommonJS module
        type: "commonjs",
      },
    },
    // External packages that shouldn't be packed
    externals: {
      maxwhere: ["maxwhere"],
      electron: ["electron"],
    },
    plugins: [],
  },
];
