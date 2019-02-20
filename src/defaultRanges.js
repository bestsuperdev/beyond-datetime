import { languages } from './utils/DateHelper';

function getOffsetDaysDate(date,offset){
	date = new Date(date)
	date.setDate(date.getDate()+ offset)
	return date
}

export default function defaultRanges(props){
	const {language} = props
	const texts = languages[language]
	return  [{
		name : texts.today,
		startDate(now){
			return new Date(now)
		},
		endDate(now){
			return new Date(now)
		}
	},{
		name : texts.yesterday,
		startDate(now){
			return getOffsetDaysDate(now,-1)
		},
		endDate(now){
			return getOffsetDaysDate(now,-1)
		}
	},{
		name : texts.sevenDays,
		startDate(now){
			return getOffsetDaysDate(now,-6)
		},
		endDate(now){
			return new Date(now)
		}
	},{
		name : texts.thirtyDays,
		startDate(now){
			return getOffsetDaysDate(now,-29)
		},
		endDate(now){
			return new Date(now)
		}
	}]
}
