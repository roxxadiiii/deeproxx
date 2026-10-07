const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    entry: './src/playground.ts',

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    resolve: {
      extensions: ['.ts', '.js'],
    },

    module: {
      rules: [
        // TypeScript loader (SRS §21, §56.2)
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        // CSS loader chain: css-loader → style-loader (dev) or MiniCssExtractPlugin (prod)
        // SRS §21 specifies the style!css webpack chain
        {
          test: /\.css$/,
          use: isDev
            ? ['style-loader', 'css-loader']
            : [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
      }),
      ...(isDev
        ? []
        : [
            new MiniCssExtractPlugin({
              filename: 'bundle.css',
            }),
          ]),
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 8080,
      hot: true,
      open: true,
    },

    devtool: isDev ? 'source-map' : false,
  };
};
