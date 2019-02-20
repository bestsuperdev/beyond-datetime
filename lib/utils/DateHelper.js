'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addMonth = addMonth;
exports.setMonth = setMonth;
exports.addYear = addYear;
exports.setYear = setYear;
exports.daysInMonth = daysInMonth;
exports.isSameTime = isSameTime;
exports.isSameDate = isSameDate;
exports.isSameYearAndMonth = isSameYearAndMonth;
exports.getDatesInCalendarMonth = getDatesInCalendarMonth;
exports.isBetween = isBetween;
exports.getInitTime = getInitTime;
exports.syncTime = syncTime;
exports.isOrderedDates = isOrderedDates;
exports.orderRange = orderRange;
exports.isDate = isDate;
exports.getYearRange = getYearRange;
exports.cloneDate = cloneDate;
var Weeks = exports.Weeks = ['一', '二', '三', '四', '五', '六', '日'];
var Months = exports.Months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

var GlobalWeeks = exports.GlobalWeeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var GlobalMonths = exports.GlobalMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

var languages = exports.languages = {
    en: {
        'ok': 'Ok',
        'today': 'Today',
        'yesterday': 'Yesterday',
        'sevenDays': '7 days',
        'thirtyDays': '30 days'

    },
    cn: {
        'ok': '确定',
        'today': '今天',
        'yesterday': '昨天',
        'sevenDays': '最近7天',
        'thirtyDays': '最近30天'
    }
    //今天 昨天 最近7天 最近30天

};function addMonth(date, offset) {
    date = cloneDate(date);
    date.setMonth(date.getMonth() + offset);
    return date;
}

function setMonth(date, month) {
    date = cloneDate(date);
    date.setMonth(month);
    return date;
}

function addYear(date, offset) {
    date = cloneDate(date);
    date.setFullYear(date.getFullYear() + offset);
    return date;
}

function setYear(date, year) {
    date = cloneDate(date);
    date.setFullYear(year);
    return date;
}

function daysInMonth(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
}

function isSameTime(date1, date2) {
    if (isDate(date1) && isDate(date2)) {
        return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes() && date1.getSeconds() === date2.getSeconds();
    } else {
        return false;
    }
}

function isSameDate(date1, date2) {
    return isSameYearAndMonth(date1, date2) && date1.getDate() === date2.getDate();
}

function isSameYearAndMonth(date1, date2) {
    return isDate(date1) && isDate(date2) && date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
}

/**
 * 
 * @param {Date} date 
 * @param {Date} timeDate 
 * @return {Date[]}
 */
function getDatesInCalendarMonth(date, timeDate) {
    var dates = [];
    var monthDaysCount = daysInMonth(date);
    var startMonthDate = cloneDate(date); //.setDate(1)
    startMonthDate.setDate(1);
    if (timeDate) {
        startMonthDate.setHours(timeDate.getHours());
        startMonthDate.setMinutes(timeDate.getMinutes());
        startMonthDate.setSeconds(timeDate.getSeconds());
    }
    var lastMonthDaysCount = (startMonthDate.getDay() || 7) - 1;
    for (var i = lastMonthDaysCount; i > 0; i--) {
        var _date = cloneDate(startMonthDate);
        _date.setDate(_date.getDate() - i);
        dates.push(_date);
    }
    for (var _i = 1; _i <= monthDaysCount; _i++) {
        var _date2 = cloneDate(startMonthDate);
        _date2.setDate(_i);
        dates.push(_date2);
    }
    var nextMonthDaysCount = 42 - dates.length;
    if (nextMonthDaysCount > 0) {
        var nextMonthDate = cloneDate(startMonthDate);
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        nextMonthDate.setDate(1);
        for (var _i2 = 1; _i2 <= nextMonthDaysCount; _i2++) {
            var _date3 = cloneDate(nextMonthDate);
            _date3.setDate(_i2);
            dates.push(_date3);
        }
    }
    return dates;
}

function isBetween(date, minDate, maxDate) {
    var result = null;
    if (isDate(date)) {
        if (isDate(minDate)) {
            result = +date >= +minDate;
        }
        if (isDate(maxDate)) {
            result = result != null ? result && +date <= +maxDate : +date <= +maxDate;
        }
    }
    return result;
}

function getInitTime(date) {
    date = isDate(date) ? new Date(date) : new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
}

function syncTime(date, timeDate) {
    if (isDate(date) && isDate(timeDate)) {
        date = cloneDate(date);
        date.setHours(timeDate.getHours());
        date.setMinutes(timeDate.getMinutes());
        date.setSeconds(timeDate.getSeconds());
    }
    return date;
}

function isOrderedDates(date1, date2) {
    if (isDate(date1) && isDate(date2)) {
        date1 = syncTime(date1, getInitTime());
        date2 = syncTime(date2, getInitTime());
        return +date1 <= +date2;
    }
}

/**
 * 
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @return {{startDate : Date, endDate : Date}}
 */
function orderRange(startDate, endDate) {
    if (isDate(startDate) && isDate(endDate) && !isOrderedDates(startDate, endDate)) {
        var tmp = startDate;
        startDate = endDate;
        endDate = tmp;
    }
    return { startDate: startDate, endDate: endDate };
}

function isDate(date) {
    return date && Object.prototype.toString.call(date) === '[object Date]' && date.toString() !== 'Invalid Date';
}

function getYearRange(date) {
    if (!isDate(date)) {
        date = new Date();
    }
    var currentYear = date.getFullYear();
    var startYear = Math.max(currentYear - 45, 1970);
    var endYear = currentYear + 10;
    return { startYear: startYear, endYear: endYear };
}

function cloneDate() {
    for (var _len = arguments.length, dates = Array(_len), _key = 0; _key < _len; _key++) {
        dates[_key] = arguments[_key];
    }

    var len = dates.length;
    for (var i = 0; i < len; i++) {
        var date = dates[i];
        if (isDate(date)) {
            return new Date(date);
        }
    }
    return null;
}