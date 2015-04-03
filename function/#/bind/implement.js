'use strict';

if (!require('./is-implemented')()) {
	try {
		Object.defineProperty(Function.prototype, 'bind',
			{ value: require('./shim'), configurable: true, enumerable: false,
				writable: true });
	} catch (e) {
		Function.prototype.bind = require('./shim');
	}
}
