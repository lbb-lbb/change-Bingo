const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const webpack = require('webpack')

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  devtool: 'source-map',

  mode: 'development',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    proxy: {
      '/api': 'http://lxylbb.top:3000'
    },
    inline: true,
    hot: true,
    open: true,
    historyApiFallback: true
  }

})
