// Taken from es5-shim project
// See: https://github.com/es-shims/es5-shim

'use strict';

module.exports = function (t, a) {
	var arr = [2, 3, undefined, true, 'hej', null, 2, false, 0], arrLike = {}, i;
	delete arr[1];

	// Array
	a(t.call(arr, 'hej'), 4);
	a(t.call(arr, 'mus'), -1);
	a(t.call(arr, undefined), 2);
	a(t.call(arr, null), 5);
	a(t.call(arr, '2'), -1);
	a(t.call(arr, 2, 2), 6);
	a(t.call(arr, 2, 0), 0);
	a(t.call(arr, 2, 6), 6);
	a(t.call(arr, 2, -3), 6);
	a(t.call(arr, 2, -9), 0);
	a(t.call(arr, 0, 20), -1);
	a(t.call(arr, 'hej', -20), 4);

	// Array-like
	for (i = 0; i < arr.length; ++i) {
		if (!arr.propertyIsEnumerable(i)) continue;
		arrLike[i] = arr[i];
	}
	arrLike.length = arr.length;
	a(t.call(arrLike, 'hej'), 4);
	a(t.call(arrLike, 'mus'), -1);
	a(t.call(arrLike, undefined), 2);
	a(t.call(arrLike, null), 5);
	a(t.call(arrLike, '2'), -1);
	a(t.call(arrLike, 2, 2), 6);
	a(t.call(arrLike, 2, 0), 0);
	a(t.call(arrLike, 2, 6), 6);
	a(t.call(arrLike, 2, -3), 6);
	a(t.call(arrLike, 2, -9), 0);
	a(t.call(arrLike, 0, 20), -1);
	a(t.call(arrLike, 'hej', -20), 4);
};
