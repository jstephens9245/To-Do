'use strict';

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const autoprefixer = require('autoprefixer');
const paths = require('./paths');
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin('style.css');

const publicUrl = '';

var config = {
  devtool: 'source-map',
  entry  : [
    paths.indexJs
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        include: [
          paths.src
        ],
        loader: 'babel-loader',
        test  : /(\.js|\.jsx)$/,
      },
      // {
      //   exclude: /node_modules/,
      //   include: [
      //     paths.src
      //   ],
      //
      //   loader : extractSass.extract([ 'css', 'postcss', 'sass' ]),
      //   loaders: [ 'style', 'css', 'postcss', 'sass-loader' ],
      // },
      {
        exclude: /node_modules/,
        include: [
          paths.src
        ],
        test   : /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "postcss-loader" // compiles Sass to CSS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.css$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "postcss-loader" // compiles Sass to CSS
        }],
      },
      {
        enforce: "pre",
        exclude: /node_modules/,
        loader : 'eslint-loader',
        query  : {presets: [ 'react', 'latest' ]},
        test   : /\.jsx$/
      },
      // postLoaders: [
      //
      // ],
      //
    ]
  },
  output: {
    filename  : 'bundle.js',
    path      : paths.dist,
    publicPath: '/'
  },

  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      inject  : true,
      template: paths.appHtml
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: publicUrl
    }),
    new CaseSensitivePathsPlugin(),
    new WatchNodeModulesPlugin(paths.appNodeModules),
    new webpack.HotModuleReplacementPlugin({multistep: true}),
    new webpack.LoaderOptionsPlugin({
      options: {

        postcss: () => [
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9'
            ]
          })
        ],
        eslint: {configFile: paths.eslint},
      }
  })
],
  resolve: {
    alias: {
      basscss    : paths.resolve(paths.nodeModules, 'basscss', 'css', 'basscss.css'),
      nodeModules: paths.nodeModules
    }
  },
};

module.exports = config;
