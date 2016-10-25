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
		if (!output.isValid()) {
			output = null;
		}
	} else if (typeof input === 'function') {
		output = parseInput(input((0, _moment2['default'])()), format);
	} else if (input && input._isAMomentObject) {
		output = input.clone();
	}

	return output;
}

function initTimeMoment(m) {
	// m = m.clone()
	m.hour(0);
	m.minute(0);
	m.second(0);
	return m;
}

function parseTimeInput(input, format) {
	var isStrict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	var output = null;
	if (input instanceof Date) {
		output = (0, _moment2['default'])(input);
	} else if (typeof input === 'string') {
		output = (0, _moment2['default'])(input, format, isStrict);
	} else if (typeof input === 'function') {
		output = parseInput(input((0, _moment2['default'])()), format);
	} else if (input && input._isAMomentObject) {
		output = input.clone();
	}

	if (!output || output.isValid && !output.isValid()) {
		output = initTimeMoment((0, _moment2['default'])());
	}

	return output;
}