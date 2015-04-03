'use strict';

if (!require('./is-implemented')()) {
	try {
		Object.defineProperty(Array.prototype, 'indexOf',
			{ value: require('./shim'), configurable: true, enumerable: false,
				writable: true });
	} catch (e) {
		Array.prototype.indexOf = require('./shim');
	}
}
