/**
 * @Author: Roni Laukkarinen
 * @Date:   2021-04-22 08:06:03
 * @Last Modified by:   Roni Laukkarinen
 * @Last Modified time: 2021-11-23 09:52:24
 */
// Dependencies
const {
  watch,
  series
} = require('gulp');
const bs = require('browser-sync').create();
const config = require('../config.js');
const {
  handleError
} = require('../helpers/handle-errors.js');

// Task
function watchfiles() {
  bs.init(config.browsersync.src, config.browsersync.opts);
  watch(config.styles.watch.development, series('devstyles', 'lintstyles')).on('error', handleError());
  watch(config.styles.watch.production, series('prodstyles')).on('error', handleError());
  watch(config.php.watch, series('phpcs')).on('change', bs.reload);
  watch(config.js.watch, series('js'));
};

exports.watch = watchfiles;
