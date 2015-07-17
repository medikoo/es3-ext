'use strict';

if (!require('./is-implemented')()) {
	try {
		Object.defineProperty(Math, 'trunc', { value: require('./shim'),
			configurable: true, enumerable: false, writable: true });
	} catch (e) {
		Math.trunc = require('./shim');
	}
}
