'use strict';

var map = { 'function': true, object: true }; //jslint: ignore

module.exports = function (x) { return ((x != null) && map[typeof x]) || false; };
