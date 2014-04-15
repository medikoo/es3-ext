'use strict';

module.exports = require('./is-implemented')() ?
		Function.prototype.bind : require('./shim');
