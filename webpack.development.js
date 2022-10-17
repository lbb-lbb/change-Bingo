const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const path = require("path");
const Dotenv  = require('dotenv-webpack')
module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/public/css/style/common.less'
            }
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new Dotenv({ path: './.env.development' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") })
  ],
  devServer: {
    // proxy: {
    //   '/api': 'http://lxylbb.top:3000'
    // },
    hot: true,
    open: true,
    historyApiFallback: true,
    contentBase: [path.resolve(__dirname,'public')]
  }

})
