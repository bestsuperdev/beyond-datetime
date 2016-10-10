'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = parseInput;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function parseInput(input, format) {
	var isStrict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	var output = null;

	if (typeof input === 'undefined' || typeof input === 'null' || !input || input === '') {
		output = (0, _moment2['default'])();
	} else if (input instanceof Date) {
		output = (0, _moment2['default'])(input);
	} else if (typeof input === 'string') {
		output = (0, _moment2['default'])(input, format, isStrict);
	} else if (typeof input === 'function') {
		output = parseInput(input((0, _moment2['default'])()), format);
	} else if (input._isAMomentObject) {
		output = input.clone();
	}

	return output;
}