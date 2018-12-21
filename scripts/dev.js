'use strict';
process.env.NODE = 'development';

const WebpackDevServer = require('webpack-dev-server');
const chalk            = require('chalk');
const config           = require('../config/webpack.config.dev.js');
const devServerConfig  = require('../config/devserver.config.js');
const webpack          = require('webpack');

config.entry.unshift(require.resolve('react-dev-utils/webpackHotDevClient'));

// config.entry.unshift('webpack-dev-server/client?/', 'webpack/hot/dev-server');

// require.resolve('webpack/hot/dev-server'),
const compiler = webpack(config);

const server = new WebpackDevServer(compiler, devServerConfig);

server.listen(8080, 'localhost', () => {
  console.log(chalk.cyan('Listening on port 8080'));
});
