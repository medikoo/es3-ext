// Thanks es5-shim project for sorting out few nuances
// https://github.com/es-shims/es5-shim

'use strict';

var slice  = Array.prototype.slice

  , max = Math.max
  , Empty = function () {}, cache = [], getBody, body;

body = 'var localArgs = args ? args.concat(slice.call(arguments)) : ' +
	'arguments;\n' +
	'if (this instanceof bound) {\n' +
	'var result = target.apply(this, localArgs);\n' +
	'if (result && ((typeof result === \'object\') || \n' +
	'(typeof result === \'function\'))) {\n' +
	'return result;\n' +
	'}\n' +
	'return this;\n' +
	'}\n' +
	'return target.apply(that, localArgs);';

getBody = (function (genArgs, body) {
	return function (length) {
		return cache[length] || (cache[length] = new Function('target', 'that',
			'args', 'slice', 'Empty', 'var bound = function bound(' +
			genArgs(length) + ') {' + body + '};' +
			'Empty.prototype = target.prototype;' +
			'bound.prototype = new Empty(); return bound;'));
	};
}(function (length) {
	var args = [];
	while (length--) args.push('a' + length.toString(32));
	return args.join(', ');
}, body));

module.exports = function bind(that) {
	var argsLength;
	if (typeof this !== "function") {
		return new TypeError("Bind must be called on a function");
	}
	argsLength = max(arguments.length, 1) - 1;
	return getBody(max(this.length - argsLength, 0))(this, that,
		argsLength ? slice.call(arguments, 1) : null, slice, Empty);
};
