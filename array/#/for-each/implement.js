'use strict';

if (!require('./is-implemented')()) {
	try {
		Object.defineProperty(Array.prototype, 'forEach',
			{ value: require('./shim'), configurable: true, enumerable: false,
				writable: true });
	} catch (e) {
		Array.prototype.forEach = require('./shim');
	}
}
