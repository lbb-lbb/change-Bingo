const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack");
const path = require("path");
module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'javascript/[name].bundle.js',
    publicPath: './',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  },

  plugins: [
    new miniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new ParallelUglifyPlugin({
      // 压缩js的一些配置
      uglifyJS: {
        output: {
          beautify: false,  // 不需要格式化，以最紧凑的方式输出
          comments: false // 删除注释
        },
        warnings: false, // 删除未使用一些代码时引起的警告
        compress: {
          drop_console: true, // 删除所有console.log
          // 是否内嵌虽定义，但只使用了一次的变量
          // 比如var x = 2, y = 10, z = x + y 变成 z = 12
          collapse_vars: true,
          // 提出多次出现但没定义的变量，将其变成静态值；
          // 比如x = 'xx', y = 'xx' 变成 var a = 'xx', x = a, y = a
          reduce_vars: true
        }
      }
    })
  ],

  mode: 'production'
})