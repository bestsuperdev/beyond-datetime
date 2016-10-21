'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = {
	'今天': {
		startDate: function startDate(now) {
			return now;
		},
		endDate: function endDate(now) {
			return now;
		}
	},

	'昨天': {
		startDate: function startDate(now) {
			return now.add(-1, 'days');
		},
		endDate: function endDate(now) {
			return now.add(-1, 'days');
		}
	},

	'最近7天': {
		startDate: function startDate(now) {
			return now.add(-6, 'days');
		},
		endDate: function endDate(now) {
			return now;
		}
	},

	'最近30天': {
		startDate: function startDate(now) {
			return now.add(-29, 'days');
		},
		endDate: function endDate(now) {
			return now;
		}
	}
};