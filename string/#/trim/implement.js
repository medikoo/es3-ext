'use strict';

if (!require('./is-implemented')()) {
	try {
		Object.defineProperty(String.prototype, 'trim',
			{ value: require('./shim'), configurable: true, enumerable: false,
				writable: true });
	} catch (e) {
		String.prototype.trim = require('./shim');
	}
}
