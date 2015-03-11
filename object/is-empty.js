'use strict';

var object = require('./validate-object')

  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (obj) {
	var i;
	object(obj);
	for (i in obj) { //jslint: ignore
		if (propertyIsEnumerable.call(obj, i)) return false;
	}
	return true;
};
