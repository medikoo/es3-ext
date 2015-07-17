// Taken from es5-shim project
// See: https://github.com/es-shims/es5-shim

'use strict';

module.exports = function (t, a) {
	var first, last, x, arr = ['1', '2', '3'], count = 0;
	t.call(arr, function (item, index, col) {
		if (!first) {
			first = item;
		}
		last = item;
		x = col;
		a(index, count++, "Index");
	});
	a(count, arr.length, "Iterated");
	a(last, arr[arr.length - 1]);
	a(first, arr[0]);
	a.deep(x, Object(arr), "Collection as third argument"); //jslint: skip
};
