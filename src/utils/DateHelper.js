

export const Weeks =  ['一','二','三','四','五','六','日']

export const Months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']

export function addMonth(date,offset){
    date = cloneDate(date)
    date.setMonth(date.getMonth() + offset)
    return date
}

export function setMonth(date,month){
    date = cloneDate(date)
    date.setMonth(month)
    return date
}

export function addYear(date,offset){
    date = cloneDate(date)
    date.setFullYear(date.getFullYear() + offset)
    return date
}

export function setYear(date,year){
    date = cloneDate(date)
    date.setFullYear(year)
    return date
}


export function daysInMonth(date){
    let year = date.getFullYear()
    let month = date.getMonth()
    return (new Date(year,month+1,0)).getDate()
}

export function isSameDate(date1,date2){
    return  isSameYearAndMonth(date1,date2) && date1.getDate() === date2.getDate() 
}

export function isSameYearAndMonth(date1,date2){
    return  isDate(date1) && isDate(date2) 
            && date1.getFullYear() === date2.getFullYear() 
            && date1.getMonth() === date2.getMonth() 
}

/**
 * 
 * @param {Date} date 
 * @param {Date} timeDate 
 * @return {Date[]}
 */
export function getDatesInCalendarMonth(date,timeDate){
    const dates = []
    let monthDaysCount = daysInMonth(date)
    let startMonthDate = cloneDate(date)//.setDate(1)
    startMonthDate.setDate(1)
    if(timeDate){
        startMonthDate.setHours(timeDate.getHours())
        startMonthDate.setMinutes(timeDate.getMinutes())
        startMonthDate.setSeconds(timeDate.getSeconds())
    }
    let lastMonthDaysCount = (startMonthDate.getDay() || 7) - 1
    for(let i = lastMonthDaysCount; i > 0; i--){
        let _date = cloneDate(startMonthDate)
        _date.setDate(_date.getDate() - i)
        dates.push(_date)
    }
    for(let i = 1; i <= monthDaysCount; i++){
        let _date = cloneDate(startMonthDate)
        _date.setDate(i)
        dates.push(_date)
    }
    let nextMonthDaysCount = 42 - dates.length
    if(nextMonthDaysCount > 0){
        let nextMonthDate = cloneDate(startMonthDate)
        nextMonthDate.setMonth(nextMonthDate.getMonth()+1)
        nextMonthDate.setDate(1)
        for(let i = 1; i <= nextMonthDaysCount; i++){
            let _date = cloneDate(nextMonthDate)
            _date.setDate(i)
            dates.push(_date)
        }
    }
    return dates
}

export function isBetween(date,minDate,maxDate){
    let result = null
    if(isDate(date)){
        if(isDate(minDate)){
            result = +date >= +minDate
        }
        if(isDate(maxDate)){
            result = result != null ? (result && +date <= +maxDate) :  (+date <= +maxDate)
        }
    }
    return result
}

export function getInitTime(){
    let date = new Date
	date.setHours(0)
	date.setMinutes(0)
	date.setSeconds(0)
	return date
}

export function syncTime(date,timeDate){
    if(isDate(date) && isDate(timeDate)){
        date = cloneDate(date)
        date.setHours(timeDate.getHours())
        date.setMinutes(timeDate.getMinutes())
        date.setSeconds(timeDate.getSeconds())
    }
	return date
}

export function isOrderedDates(date1,date2){
    if(isDate(date1) && isDate(date2)){
        date1 = syncTime(date1,getInitTime())
        date2 = syncTime(date2,getInitTime())
        return +date1 <= +date2
    }
}

export function orderRange(startDate,endDate){
    if(isDate(startDate) && isDate(endDate) && !isOrderedDates(startDate,endDate)){
        let tmp = startDate
        startDate = cloneDate(endDate)
        endDate = cloneDate(tmp)
    }
    return {startDate,endDate}
}

export function isDate(date){
    return date && Object.prototype.toString.call(date) === '[object Date]' && date.toString() !== 'Invalid Date'
}

export function getYearRange(date){
    if(!isDate(date)){
        date = new Date
    }
    let currentYear = date.getFullYear()
    let startYear = Math.max(currentYear-45, 1970)
    let endYear = currentYear + 10
    return {startYear,endYear}
}

export function cloneDate(date){
    if(isDate(date)){
        return new Date(date)
    }else{
        return date
    }
}