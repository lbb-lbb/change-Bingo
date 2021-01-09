const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const webpack = require('webpack')

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'inline-source-map',

  mode: 'development',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    proxy: {
      '/api': 'http://lxylbb.top:'
    },
    inline: true,
    hot: true,
    open: true
  }

})
