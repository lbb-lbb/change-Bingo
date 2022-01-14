const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin.js')
const Dotenv  = require('dotenv-webpack')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'javascript/[name].[contenthash].js',
    publicPath: '/',
    chunkFilename: 'javascript/[name].[contenthash].js',
    clean: true
  },
  // 默认的优化，直接使用
  // optimization: {
  //   splitChunks: {
  //     chunks: 'async',
  //     minSize: 20000,
  //     minRemainingSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 30,
  //     maxInitialRequests: 30,
  //     enforceSizeThreshold: 50000,
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         reuseExistingChunk: true,
  //       },
  //       commons: {
  //         name: "commons",
  //         chunks: "initial",
  //         minChunks: 2
  //       }
  //     },
  //   }
  //
  // },
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
        use: {
          loader: 'vue-loader'
        }
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
            publicPath: "/images/", // 将图片访问的公共地址定位到n打包后的实际访问路径，解决访问图片资源失败的问题
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
      inject: 'body',
      favicon: path.resolve(__dirname, './src/public/favicon.ico')
    }),
    new Dotenv ({ path: './.env' }),
    new VueLoaderPlugin(),
  ],

  resolve: {
    // 配置 省略文件后缀名
    extensions: ['.js', '.css', '.vue']
  }
}

