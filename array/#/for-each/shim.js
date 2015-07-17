'use strict';

var toNatural = require('../../../number/to-natural')
  , value     = require('../../../object/validate-value')

  , hasOwnProperty = Object.prototype.hasOwnProperty
  , call = Function.prototype.call;

module.exports = function (cb/*, thisArg*/) {
	var i, l, self, thisArg;

	self = Object(value(this));
	thisArg = arguments[1];

	l = toNatural(self.length);
	for (i = 0; i < l; ++i) {
		if (hasOwnProperty.call(self, i)) call.call(cb, thisArg, self[i], i, self);
	}
};
