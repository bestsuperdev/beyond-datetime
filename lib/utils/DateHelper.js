'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addMonth = addMonth;
exports.setMonth = setMonth;
exports.addYear = addYear;
exports.setYear = setYear;
exports.daysInMonth = daysInMonth;
exports.isSameDate = isSameDate;
exports.isSameYearAndMonth = isSameYearAndMonth;
exports.getDatesInCalendarMonth = getDatesInCalendarMonth;
exports.isBetween = isBetween;
exports.getInitTime = getInitTime;
exports.syncTime = syncTime;
exports.isOrderedDates = isOrderedDates;
exports.orderRange = orderRange;
exports.isDate = isDate;
var Weeks = exports.Weeks = ['一', '二', '三', '四', '五', '六', '日'];

var Months = exports.Months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

function addMonth(date, offset) {
    date = new Date(date);
    date.setMonth(date.getMonth() + offset);
    return date;
}

function setMonth(date, month) {
    date = new Date(date);
    date.setMonth(month);
    return date;
}

function addYear(date, offset) {
    date = new Date(date);
    date.setFullYear(date.getFullYear() + offset);
    return date;
}

function setYear(date, year) {
    date = new Date(date);
    date.setFullYear(year);
    return date;
}

function daysInMonth(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
}

function isSameDate(date1, date2) {
    return date1 && date2 && date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

function isSameYearAndMonth(date1, date2) {
    return date1 && date2 && date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
}

function getDatesInCalendarMonth(date, timeDate) {
    var dates = [];
    var monthDaysCount = daysInMonth(date);
    var startMonthDate = new Date(date); //.setDate(1)
    startMonthDate.setDate(1);
    if (timeDate) {
        startMonthDate.setHours(timeDate.getHours());
        startMonthDate.setMinutes(timeDate.getMinutes());
        startMonthDate.setSeconds(timeDate.getSeconds());
    }
    var lastMonthDaysCount = (startMonthDate.getDay() || 7) - 1;
    for (var i = lastMonthDaysCount; i > 0; i--) {
        var _date = new Date(startMonthDate);
        _date.setDate(_date.getDate() - i);
        dates.push(_date);
    }
    for (var _i = 1; _i <= monthDaysCount; _i++) {
        var _date2 = new Date(startMonthDate);
        _date2.setDate(_i);
        dates.push(_date2);
    }
    var nextMonthDaysCount = 42 - dates.length;
    if (nextMonthDaysCount > 0) {
        var nextMonthDate = new Date(startMonthDate);
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        nextMonthDate.setDate(1);
        for (var _i2 = 1; _i2 <= nextMonthDaysCount; _i2++) {
            var _date3 = new Date(nextMonthDate);
            _date3.setDate(_i2);
            dates.push(_date3);
        }
    }
    return dates;
}

function isBetween(date, minDate, maxDate) {
    var result = void 0;
    if (date && (minDate || maxDate)) {
        if (minDate) {
            result = +date >= +minDate;
        }
        if (maxDate) {
            result = result != null ? result && +date <= +maxDate : +date <= +maxDate;
        }
        return result;
    } else {
        return false;
    }
}

function getInitTime() {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
}

function syncTime(date, timeDate) {
    if (date && timeDate) {
        date = new Date(date);
        date.setHours(timeDate.getHours());
        date.setMinutes(timeDate.getMinutes());
        date.setSeconds(timeDate.getSeconds());
    }
    return date;
}

function isOrderedDates(date1, date2) {
    if (date1 instanceof Date && date2 instanceof Date) {
        date1 = syncTime(date1, getInitTime());
        date2 = syncTime(date2, getInitTime());
        return +date1 <= +date2;
    }
}

function orderRange(startDate, endDate) {
    if (startDate instanceof Date && endDate instanceof Date) {
        if (!isOrderedDates(startDate, endDate)) {
            var tmp = startDate;
            startDate = new Date(endDate);
            endDate = new Date(tmp);
        }
    }
    return { startDate: startDate, endDate: endDate };
}

function isDate(date) {
    return date && Object.prototype.toString.call(date) === '[object Date]' && date.toString() !== 'Invalid Date';
}