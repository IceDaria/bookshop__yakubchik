const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: "",
    entry: './src/index.js', // Путь к входному файлу JavaScript
    output: {
      filename: 'bundle.js', // Имя выходного файла
      path: path.resolve(__dirname, 'dist') // Путь к выходной директории
    },

    plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html'
      }),

      new MiniCssExtractPlugin()
  ],

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [ MiniCssExtractPlugin.loader,'css-loader','sass-loader' ]
        },

        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext][query]',
          },
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          generator: {
            filename: 'svg/[name][ext][query]',
          },
        },
      ]
    },

    optimization: {
      minimizer: [
         `...`,
        new CssMinimizerPlugin(),
      ],

      minimize: true,
    },

    devServer: {
      static: {
        directory: path.join(__dirname, "src"),
      },
    },
    
  };