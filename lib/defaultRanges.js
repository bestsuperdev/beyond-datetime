'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function getOffsetDaysDate(date, offset) {
	date = new Date(date);
	date.setDate(date.getDate() + offset);
	return date;
}

exports['default'] = [{
	name: '今天',
	startDate: function startDate(now) {
		return new Date(now);
	},
	endDate: function endDate(now) {
		return new Date(now);
	}
}, {
	name: '昨天',
	startDate: function startDate(now) {
		return getOffsetDaysDate(now, -1);
	},
	endDate: function endDate(now) {
		return getOffsetDaysDate(now, -1);
	}
}, {
	name: '最近7天',
	startDate: function startDate(now) {
		return getOffsetDaysDate(now, -6);
	},
	endDate: function endDate(now) {
		return new Date(now);
	}
}, {
	name: '最近30天',
	startDate: function startDate(now) {
		return getOffsetDaysDate(now, -29);
	},
	endDate: function endDate(now) {
		return new Date(now);
	}
}];