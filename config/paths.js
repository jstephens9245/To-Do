'use strict';

/* eslint no-sync: 0 */

const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());

/**
 *	Takes a relative path and returns an absolute path resolved from the app directory
 *
 * @arg {...String} paths
 * The relative path to be converted to an absolute path.
 * Multpile relative path segmants can be passed in.
 *
 * @returns {String} Absolute path resolved from the app directory
 */
function resolveApp(...paths) {
  return path.resolve(
    (paths[0].indexOf(appDirectory) === 0 ? '' : appDirectory),
    ...paths
  );
}

module.exports = {
  appHtml    : resolveApp('client/index.html'),
  dist       : resolveApp('dist'),
  eslint     : resolveApp('client/.eslintrc.json'),
  indexJs    : resolveApp('client/index.jsx'),
  nodeModules: resolveApp('node_modules'),
  src        : resolveApp('client')
};

module.exports.resolve = resolveApp;
