'use strict';

if (!require('./is-implemented')()) {
	try {
		Object.defineProperty(Math, 'sign', { value: require('./shim'),
			configurable: true, enumerable: false, writable: true });
	} catch (e) {
		Math.sign = require('./shim');
	}
}
