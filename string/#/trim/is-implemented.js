'use strict';

module.exports = function () {
	if (typeof ''.trim !== 'function') return false;
	return (' raz '.trim() === 'raz');
};
