'use strict';

var toInteger = require('../math/trunc')

  , max = Math.max;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	return max(0, toInteger(value));
};
