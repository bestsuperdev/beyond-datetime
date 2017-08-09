'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = parseInput;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function parseInput(input) {
	var initTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	var output = void 0;
	if (input instanceof Date) {
		output = (0, _moment2['default'])(input);
	} else if (input && input._isAMomentObject && input.isValid()) {
		output = input.clone();
	} else {
		output = (0, _moment2['default'])();
		if (initTime) {
			output.hour(0);
			output.minute(0);
			output.second(0);
		}
	}

	return output;
}