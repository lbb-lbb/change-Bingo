const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin()
  ],

  mode: 'production'
})
