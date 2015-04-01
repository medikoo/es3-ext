// Thanks es5-shim project -> https://github.com/es-shims/es5-shim

'use strict';

var value = require('../../../object/validate-value');

var ws = '\x09\x0A\x0B\x0C\x0D \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007' +
	'\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
var wsRegexChars = '[' + ws + ']'
  , trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*')
  , trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');

module.exports = function trim() {
	return String(value(this)).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
};
