const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
      'aurora': './public/js/aurora.js'
  },
  output: {
    filename: 'js/[name].dist.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    library: 'Vybe',
    libraryTarget: 'window',
    libraryExport: 'default'

  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use:  [
          {
            loader: MiniCssExtractPlugin.loader
          },
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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "async/[name].[id].css"
    }),
    new OptimizeCssAssetsPlugin()
  ]
};