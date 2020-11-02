const path = require("path");
const webpack = require("webpack");

const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const InlineChunkHtmlPlugin = require("inline-chunk-html-plugin");

const env = {
  IS_MOCKED: false,
};
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  env.IS_MOCKED = true;
}

const isEnvProduction = process.env.NODE_ENV === "production";
const isEnvE2E = process.env.NODE_ENV === "e2e";

const extensions = [".js", ".jsx"];

function Plugins() {
  if (isEnvProduction) {
    return [
      new MiniCssExtractPlugin({ filename: "main.[chunkhash].css" }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
    ];
  }
  if (isEnvE2E) {
    return [];
  }

  return [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "public/mockServiceWorker.js",
          to: "mockServiceWorker.js",
        },
      ],
    }),
  ];
}

module.exports = {
  entry: path.resolve(__dirname, "src/index.jsx"),
  devtool: isEnvProduction ? "source-map" : "cheap-module-source-map",
  mode: isEnvProduction ? "production" : "development",
  resolve: {
    extensions,
    alias: {
      api: path.resolve(__dirname, "src/api"),
      app: path.resolve(__dirname, "src/app"),
      img: path.resolve(__dirname, "src/img"),
      mocks: path.resolve(__dirname, "config/mocks"),
      store: path.resolve(__dirname, "src/store"),
    },
  },
  plugins: [
    new webpack.DefinePlugin(env),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/index.html",
      ...(isEnvProduction
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : null),
    }),
    new ESLintPlugin({
      extensions,
      context: path.resolve(__dirname, "src"),
      fix: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public/favicon.ico",
          to: "favicon.ico",
        },
      ],
    }),
    ...Plugins(),
  ],

  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: "url-loader",
            options: {
              name: "[name].[hash:4].[ext]",
            },
          },
          {
            test: /\.(js|jsx)$/,
            include: [path.resolve(__dirname, "src")],
            loader: "babel-loader",
          },
          {
            test: /.(scss|css)$/,
            use: [
              isEnvProduction
                ? {
                    loader: MiniCssExtractPlugin.loader,
                  }
                : {
                    loader: "style-loader",
                  },
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                },
              },
            ],
            sideEffects: true,
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
      name: false,
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  devServer: {
    compress: true,
    hot: true,
  },
};
