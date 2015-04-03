'use strict';

module.exports = require('./is-implemented')() ?
		Array.prototype.indexOf : require('./shim');
