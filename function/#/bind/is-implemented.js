'use strict';

var fn = function (y) { return this.x + y + 3; };

module.exports = function () {
	if (typeof fn.bind !== 'function') return false;
	fn = fn.bind({ x: 5 });
	if (typeof fn !== 'function') return false;
	return (fn(8) === (5 + 8 + 3));
};
