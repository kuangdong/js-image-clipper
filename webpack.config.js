const path = require('path');
const webpack=require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/imageClipper.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jsImageClipper.js',
    library: 'JsImageClipper',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules:[
        {
            test: /\.css$/,
            use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader'
            ]
        }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: "jsImageClipper.css"
    }),
    new OptimizeCssAssetsPlugin()
  ]
};