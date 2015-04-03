'use strict';

var arr = ['raz', 'dwa', 'trzy'];

module.exports = function () {
	if (typeof arr.indexOf !== 'function') return false;
	return (arr.indexOf('dwa') === 1);
};
