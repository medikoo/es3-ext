// Thanks es5-shim project -> https://github.com/es-shims/es5-shim

'use strict';

var value = require('../../../object/validate-value')

  , max = Math.max;

module.exports = function (searchElement/*, fromIndex */) {
	var self = (typeof this === 'string') ? this.split('') : Object(value(this))
	  , length = self.length >>> 0, fromIndex;
	if (!length) return -1;
	fromIndex = Number(arguments[1]);
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex < 0) fromIndex = max(0, length + fromIndex);
	for (fromIndex; fromIndex < length; ++fromIndex) {
		if ((fromIndex in self) && (self[fromIndex] === searchElement)) return fromIndex;
	}
	return -1;
};
