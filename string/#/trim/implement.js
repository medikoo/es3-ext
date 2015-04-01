'use strict';

if (!require('./is-implemented')()) {
	if (Object.defineProperty) {
		Object.defineProperty(String.prototype, 'trim',
			{ value: require('./shim'), configurable: true, enumerable: false,
				writable: true });
	} else {
		String.prototype.trim = require('./shim');
	}
}
