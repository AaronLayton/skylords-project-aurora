const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  entry: {
      'aurora': './public/js/aurora.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].dist.js',
    chunkFilename: 'js/async/[name].chunk.js',
    publicPath: isProduction ? 'https://skylords-project-aurora.herokuapp.com/' : 'http://localhost:5000/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:  [
          // {
          //   loader: MiniCssExtractPlugin.loader
          // },
          "style-loader",
          {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                url: true
            }
          },
          "resolve-url-loader"
        ]
      },
      {
        test: /\.scss$/,
        use:  [
          // {
          //   loader: MiniCssExtractPlugin.loader
          // },
          "style-loader",
          {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                url: true
            }
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
                sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:8].dist.[ext]',
              outputPath: 'img/',
              useRelativePath: true
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ]
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: "css/[name].dist.css",
    //   chunkFilename: "css/async/[name].[id].css"
    // }),
    new OptimizeCssAssetsPlugin()
  ]
};