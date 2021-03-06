'use strict';

var object = require('./validate-object')

  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (obj) {
	var key;
	for (key in object(obj)) {
		if (!propertyIsEnumerable.call(obj, key)) continue;
		delete obj[key];
	}
	return obj;
};
