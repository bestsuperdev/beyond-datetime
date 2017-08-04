function getOffsetDaysDate(date,offset){
	date = new Date(date)
	date.setDate(date.getDate()+ offset)
	return date
}

export default  [{
	name : '今天',
	startDate(now){
		return new Date(now)
	},
	endDate(now){
		return new Date(now)
	}
},{
	name : '昨天',
	startDate(now){
		return getOffsetDaysDate(now,-1)
	},
	endDate(now){
		return getOffsetDaysDate(now,-1)
	}
},{
	name : '最近7天',
	startDate(now){
		return getOffsetDaysDate(now,-6)
	},
	endDate(now){
		return new Date(now)
	}
},{
	name : '最近30天',
	startDate(now){
		return getOffsetDaysDate(now,-29)
	},
	endDate(now){
		return new Date(now)
	}
}]