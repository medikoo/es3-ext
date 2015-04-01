// Taken from es5-shim project
// See: https://github.com/es-shims/es5-shim

'use strict';

module.exports = function (t, a) {
	var test = '\x09\x0A\x0B\x0C\x0D \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006' +
		'\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFFHello, World!\x09\x0A\x0B\x0C' +
		'\x0D \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A' +
		'\u202F\u205F\u3000\u2028\u2029\uFEFF';
	a(test.trim(), 'Hello, World!');
	a(test.trim().length, 13);
	a('\u200b', '\u200b');
	a('\u200b'.length, 1);
};
