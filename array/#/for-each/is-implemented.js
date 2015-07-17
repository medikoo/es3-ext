'use strict';

var arr = ['raz', 'dwa', 'trzy'];

module.exports = function () {
	var x = [];
	if (typeof arr.forEach !== 'function') return false;
	try {
		arr.forEach(function (item) { x.push(item); });
	} catch (e) {
		return false;
	}
	return (x[1] === 'dwa');
};
