'use strict';

module.exports = function (t, a) {
	a(t({}), null);
	a(t({ foo: 'bar' }), 'foo');
	a(t(Object.create({ foo: 'bar' })), null);
};
