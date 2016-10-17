export default {
	'今天'         : {
		startDate     : (now) => {
			return now;
		},
		endDate       : (now) => {
			return now;
		}
	},

	'昨天'     : {
		startDate     : (now) => {
			return now.add(-1, 'days');
		},
		endDate       : (now) => {
			return now.add(-1, 'days');
		}
	},

	'最近7天'   : {
		startDate     : (now) => {
			return now.add(-6, 'days');
		},
		endDate       : (now) => {
			return now;
		}
	},

	'最近30天'  : {
		startDate     : (now) => {
			return now.add(-29, 'days');
		},
		endDate       : (now) => {
			return now;
		}
	}
}
