'use strict';

module.exports = function (t, a) {
	var x;
	a(t(0), 0, "0");
	a(t(false), false, "false");
	a(t(''), '', "''");
	a(t(NaN), NaN, "NaN");
	a(t(x = {}), x, "{}");

	a.throws(function () {
		t();
	}, "Undefined");
	a.throws(function () {
		t(null);
	}, "null");
};
