'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = parseInput;
exports.parseTimeInput = parseTimeInput;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function parseInput(input, format) {
	var isStrict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	var output = null;

	if (input instanceof Date) {
		output = (0, _moment2['default'])(input);
	} else if (input && typeof input === 'string') {
		output = (0, _moment2['default'])(input, format, isStrict);
	} else if (typeof input === 'function') {
		output = parseInput(input((0, _moment2['default'])()), format);
	} else if (input && input._isAMomentObject) {
		output = input.clone();
	}

	return output;
}

function parseTimeInput(input, format) {
	var isStrict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	var output = null;
	if (!input) {
		output = (0, _moment2['default'])();
		output.hour(0);
		output.minute(0);
		output.second(0);
	} else if (input instanceof Date) {
		output = (0, _moment2['default'])(input);
	} else if (typeof input === 'string') {
		output = (0, _moment2['default'])(input, format, isStrict);
	} else if (typeof input === 'function') {
		output = parseInput(input((0, _moment2['default'])()), format);
	} else if (input && input._isAMomentObject) {
		output = input.clone();
	}

	return output;
}