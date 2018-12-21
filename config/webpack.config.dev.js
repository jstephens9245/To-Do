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
  eslint: {configFile: paths.eslint},
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        include: [
          paths.src
        ],
        loader: 'babel',
        test  : /(\.js|\.jsx)$/
      },
      {
        exclude: /node_modules/,
        include: [
          paths.src
        ],

        // loader : extractSass.extract([ 'css', 'postcss', 'sass' ]),
        loaders: [ 'style', 'css', 'postcss', 'sass' ],
        test   : /\.scss$/
      },
      {
        loaders: [ 'style', 'css', 'postcss' ],
        test   : /\.css$/
      },
      {
        loader: 'json',
        test  : /\.json$/
      }
    ],
    postLoaders: [

    ],
    preLoaders: [
      {
        exclude: /node_modules/,
        loader : 'eslint',
        query  : {presets: [ 'react', 'latest' ]},
        test   : /\.jsx$/
      }
    ]
  },
  output: {
    filename  : 'bundle.js',
    path      : paths.dist,
    publicPath: '/'
  },
  optimization: {
    minimizer: [new TerserPlugin()],
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
    new webpack.HotModuleReplacementPlugin({multistep: true})
  ],
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
  resolve: {
    alias: {
      basscss    : paths.resolve(paths.nodeModules, 'basscss', 'css', 'basscss.css'),
      nodeModules: paths.nodeModules
    }
  }
};

module.exports = config;
