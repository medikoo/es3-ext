'use strict';

module.exports = require('./is-implemented')() ?
		Array.prototype.forEach : require('./shim');
