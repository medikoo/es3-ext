'use strict';

if (!require('./is-implemented')()) {
	if (Object.defineProperty) {
		Object.defineProperty(Function.prototype, 'bind',
			{ value: require('./shim'), configurable: true, enumerable: false,
				writable: true });
	} else {
		Function.prototype.bind = require('./shim');
	}
}
