'use strict';

const config = require('./webpack.config.dev.js');

module.exports = {
  clientLogLevel    : 'warn',
  compress          : true,
  contentBase       : 'public',
  filename          : config.output.filename,
  historyApiFallback: true,
  hot               : true,
  lazy              : false,
  noInfo            : true,
  publicPath        : config.output.publicPath,
  quiet             : true,
  stats             : {colors: true}, //'errors-only',
  watchOptions      : {
    aggregateTimeout: 300,
    ignore          : /node_modules/,
    poll            : 1000
  }
};
