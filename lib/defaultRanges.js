'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = defaultRanges;

var _DateHelper = require('./utils/DateHelper');

function getOffsetDaysDate(date, offset) {
	date = new Date(date);
	date.setDate(date.getDate() + offset);
	return date;
}

function defaultRanges(props) {
	var language = props.language;

	var texts = _DateHelper.languages[language];
	return [{
		name: texts.today,
		startDate: function startDate(now) {
			return new Date(now);
		},
		endDate: function endDate(now) {
			return new Date(now);
		}
	}, {
		name: texts.yesterday,
		startDate: function startDate(now) {
			return getOffsetDaysDate(now, -1);
		},
		endDate: function endDate(now) {
			return getOffsetDaysDate(now, -1);
		}
	}, {
		name: texts.sevenDays,
		startDate: function startDate(now) {
			return getOffsetDaysDate(now, -6);
		},
		endDate: function endDate(now) {
			return new Date(now);
		}
	}, {
		name: texts.thirtyDays,
		startDate: function startDate(now) {
			return getOffsetDaysDate(now, -29);
		},
		endDate: function endDate(now) {
			return new Date(now);
		}
	}];
}