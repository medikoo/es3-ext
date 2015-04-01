'use strict';

module.exports = require('./is-implemented')() ?
		String.prototype.trim : require('./shim');
