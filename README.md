# es3-ext
## ECMAScript 3 extensions
### (with respect to ECMAScript 5 standard)

Provides just basic utilities (and shims) which help setup basic configurations in ES3 engines.

See [es5-ext](https://github.com/medikoo/es5-ext/) project for extensive list of ECMAScript 5 based extensions

### Usage

#### ECMAScript 5 features

You can force ES5 features to be implemented in your environment, e.g. following will assign `bind` function to `Function.prototype` (only if it's not implemented already).

```javascript
require('es3-ext/function/#/bind/implement');
function () { return this.x; }.bind({ x: 'foo' })(); // 'foo'
```

You can also access shims directly, without fixing native objects. Following will return native `Function.prototype.bind` if it's available and fallback to shim if it's not.

```javascript
var bind = require('es3-ext/function/#/bind');
bind.call(function () { return this.x; }, { x: 'foo' })(); // 'foo'
```

If you want to use shim unconditionally (even if native implementation exists) do:

```javascript
var bind = require('es3-ext/function/#/bind/shim');
bind.call(function () { return this.x; }, { x: 'foo' })(); // 'foo'
```

##### List of ES3 shims

- `Function.prototype.bind` -> `require('es3-ext/function/#/bind')`

## API

### Date Constructor extensions

#### parse(str) _(es3-ext/date/parse)_

Limited version of ECMAScript's [`Date.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse). Return date object for string representation in ISO 8601 format. Returns `NaN` if format matches but requested date is invalid. `undefined` if string format doesn't match ISO 8601

### Function Prototype extensions

#### fn.bind(context[, …args]) _(es3-ext/function/#/bind)_

[_Introduced with ECMAScript 5_](http://es5.github.io/#x15.3.4.5).  
The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called. See: [MDN: Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

### Installation
#### npm

	$ npm install es3-ext

##### Browser

You can easily bundle _es3-ext_ for browser with any CJS bundler (no favorite? Try: [Browserify](http://browserify.org/), [Webmake](https://github.com/medikoo/modules-webmake) or [Webpack](http://webpack.github.io/))

### Tests [![Build Status](https://travis-ci.org/medikoo/es3-ext.png)](https://travis-ci.org/medikoo/es3-ext)

	$ npm test

