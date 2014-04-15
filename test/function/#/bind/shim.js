// Taken from es5-shim project
// See: https://github.com/es-shims/es5-shim

'use strict';

module.exports = function (t, a) {
	var actual = [], expected, testSubject, func, context, args, ret, oracle
	  , Subject, result, ClassA, ClassB;

	testSubject = {
		push: function (o) { this.a.push(o); },
		a: []
	};

	func = function () {
		var i;
		for (i = 0; i < arguments.length; ++i) this.push(arguments[i]);
		return this;
	};

	a.h1("Binds properly without a context");
	testSubject.func = t.call(function () { context = this; });
	testSubject.func();
	a(context, function () { return this; }.call());

	a.h2("Still supplies bound arguments");
	actual = [];
	testSubject.a = [];
	testSubject.func = t.call(function () {
		args = Array.prototype.slice.call(arguments);
		context = this;
	}, undefined, 1, 2, 3);
	testSubject.func(1, 2, 3);
	a.deep(args, [1, 2, 3, 1, 2, 3]);
	a(context, function () { return this; }.call(), "Context");

	a.h1("Binds a context");
	actual = [];
	testSubject.a = [];
	testSubject.func = t.call(func, actual);
	testSubject.func(1, 2, 3);
	a.deep(actual, [1, 2, 3]);
	a.deep(testSubject.a, []);

	a.h2("and supplies bound arguments");
	actual = [];
	testSubject.a = [];
	testSubject.func = t.call(func, actual, 1, 2, 3);
	testSubject.func(4, 5, 6);
	a.deep(actual, [1, 2, 3, 4, 5, 6]);
	a.deep(testSubject.a, []);

	a.h1("Returns properly without binding a context");
	actual = [];
	testSubject.a = [];
	testSubject.func = t.call(function () { return this; });
	context = testSubject.func();
	a(context, function () { return this; }.call());

	a.h2("and still supplies bound arguments");
	actual = [];
	testSubject.a = [];
	testSubject.func = t.call(function () {
		context = this;
		return Array.prototype.slice.call(arguments);
	}, undefined, 1, 2, 3);
	actual = testSubject.func(1, 2, 3);
	a(context, function () { return this; }.call());
	a.deep(actual, [1, 2, 3, 1, 2, 3]);

	a.h1("Returns properly while binding a context");
	actual = [];
	testSubject.a = [];
	testSubject.func = t.call(func, actual);
	ret = testSubject.func(1, 2, 3);
	a(ret, actual);
	a.not(ret, testSubject);

	a.h2("and supplies bound arguments");
	actual = [];
	testSubject.a = [];
	testSubject.func = t.call(func, actual, 1, 2, 3);
	ret = testSubject.func(4, 5, 6);
	a(ret, actual);
	a.not(ret, testSubject);

	a.h1("Passes the correct arguments as a constructor");
	expected = { name: "Correct" };
	actual = [];
	testSubject.a = [];
	testSubject.func = t.call(function (arg) {
		return arg;
	}, { name: "Incorrect" });
	ret = new testSubject.func(expected);
	a(ret, expected);

	a.h1("Returns the return value of the bound function when called as a" +
		" constructor");
	actual = [];
	testSubject.a = [];
	oracle = [1, 2, 3];
	Subject = t.call(function () { return oracle; }, null);
	result = new Subject();
	a(result, oracle);

	a.h1("Returns the correct value if constructor returns other");
	actual = [];
	testSubject.a = [];
	oracle = [1, 2, 3];
	Subject = t.call(function () { return oracle; }, null);
	result = new Subject();
	a(result, oracle);

	oracle = {};
	result = new Subject();
	a(result, oracle, 2);

	oracle = function () {};
	result = new Subject();
	a(result, oracle, 3);

	oracle = "asdf";
	result = new Subject();
	a.not(result, oracle, "Primitive");

	oracle = null;
	result = new Subject();
	a.not(result, oracle, "Null");

	oracle = true;
	result = new Subject();
	a.not(result, oracle, "Boolean");

	oracle = 1;
	result = new Subject();
	a.not(result, oracle, "Number");

	a.h1("Returns the value that instance of original \"class\"" +
		" when called as a constructor");
	actual = [];
	testSubject.a = [];
	ClassA = function (x) { this.name = x || "A"; };
	ClassB = t.call(ClassA, null, "B");
	result = new ClassB();
	a(result instanceof ClassA, true, "Original");
	a(result instanceof ClassB, true, "Bound");

	a.h1("Sets a correct length");
	a.h2("without thisArg");
	actual = [];
	testSubject.a = [];
	Subject = t.call(function (a, b, c) { return a + b + c; });
	a(Subject.length, 3);

	a.h2("with thisArg");
	actual = [];
	testSubject.a = [];
	Subject = t.call(function (a, b, c) { return a + b + c; }, {});
	a(Subject.length, 3);

	a.h3("and first argument");
	actual = [];
	testSubject.a = [];
	Subject = t.call(function (a, b, c) { return a + b + c; }, {}, 1);
	a(Subject.length, 2);

	a.h2("without thisArg");
	a.h3("and first argument");
	actual = [];
	testSubject.a = [];
	Subject = t.call(function (a, b, c) { return a + b + c; }, undefined, 1);
	a(Subject.length, 2);

	a.h3("and too many argument");
	actual = [];
	testSubject.a = [];
	Subject = t.call(function (a, b, c) { return a + b + c; }, undefined,
		1, 2, 3, 4);
	a(Subject.length, 0);
};
