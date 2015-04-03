'use strict';

if (!require('./is-implemented')()) {
	if (Object.defineProperty) {
		Object.defineProperty(Array.prototype, 'indexOf',
			{ value: require('./shim'), configurable: true, enumerable: false,
				writable: true });
	} else {
		Array.prototype.indexOf = require('./shim');
	}
}
