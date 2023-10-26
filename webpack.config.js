const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.js', // Путь к входному файлу JavaScript
    output: {
      filename: 'bundle.js', // Имя выходного файла
      path: path.resolve(__dirname, 'dist') // Путь к выходной директории
    },

    plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html'
      }),
  ],

    devServer: {
        static: {
          directory: path.join(__dirname, "src"),
        },
      },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader','css-loader','sass-loader'
          ]
        }
      ]
    }
  };
