const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin') // 生产压缩一些文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除dist
const miniCssExtractPlugin = require('mini-css-extract-plugin') // 将css拆分成独立文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包分析工具
const CompressionPlugin = require('compression-webpack-plugin') // 生产gzip文件以便nginx直接加载返回
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 压缩css
const webpack = require("webpack");
const Dotenv  = require('dotenv-webpack') // 加载.env文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = merge(common, {
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin()
    ],
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          miniCssExtractPlugin.loader,
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
  plugins: [
    new Dotenv({ path: './.env.production' }),
    new miniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css'
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
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          // 从public中复制文件
          from: './public',

          // 把复制的文件存放到dis里面
          to: 'dist'
        }

      ],
    })
  ],

  mode: 'production'
})