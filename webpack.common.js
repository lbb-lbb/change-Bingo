const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin.js')
const Dotenv  = require('dotenv-webpack')

module.exports = {
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader'
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'), // 需要复制到内存的文件路径
      filename: 'index.html' // 复制完成后的文件名
    }),
    new VueLoaderPlugin(),
    new Dotenv ()
  ],

  resolve: {
    // 配置 省略文件后缀名
    extensions: ['.js', '.css', '.vue']
  }
}
