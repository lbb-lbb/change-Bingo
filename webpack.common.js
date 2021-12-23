const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin.js')
const Dotenv  = require('dotenv-webpack')
module.exports = {
  entry: './src/main.js',
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      },
    }

  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader?cacheDirectory'
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
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
            limit: 2048,
          },
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/public/index.html'), // 需要复制到内存的文件路径
      filename: 'index.html', // 复制完成后的文件名
      title: '再回首恍然如梦',
      inject: 'body'
    }),
    new Dotenv (),
    new VueLoaderPlugin(),
  ],

  resolve: {
    // 配置 省略文件后缀名
    extensions: ['.js', '.css', '.vue']
  }
}

