import React, { Component } from 'react'
import moment from 'moment'
require('moment/locale/zh-cn')
import {dateFormat,calendarPrefix} from './utils/consts'
import parseInput from './utils/parseInput.js'
import DayCell from './DayCell.js'
import Time from './Time'


moment.locale('zh-cn')

function checkRange(dayMoment, range) {
	return (
		dayMoment.isBetween(range['startDate'], range['endDate']) ||
		dayMoment.isBetween(range['endDate'], range['startDate'])
	)
}

function checkEdge(dayMoment, date) {
	return dayMoment.isSame(date,'day')
}

function isOusideMinMax(dayMoment, minDate, maxDate, format) {
	return (
	(minDate && dayMoment.isBefore(parseInput(minDate, format))) ||
	(maxDate && dayMoment.isAfter(parseInput(maxDate, format)))
	)
}

export default class Calendar extends Component {

	constructor(props, context) {
		super(props, context)

		let {date, format, range, offset, time, timeDate } = props

		date = parseInput(date, format,true)
		this.state = {
			date, 
			timeDate : timeDate ? timeDate : (time ? date : null),
			shownDate : ((range && range.endDate) || date || moment()).clone().add(offset, 'months')
		}
	}

	getFirstDayOfWeek(){
		return this.props.firstDayOfWeek || moment.localeData().firstDayOfWeek()
	}

	componentWillReceiveProps(nextProps) {
		let {date,isInvalid,format, time, range, timeDate} = nextProps
		let nextState = null

		if (date != null && (typeof isInvalid !== 'function' || !isInvalid(date)) ) {
			nextState = {date : parseInput(date,format,true), timeDate : time ? parseInput(date,format,true,true) : null }
		}else if(range && timeDate){
			nextState = {timeDate}
		}

		if (nextState) {
			this.setState(nextState)
		}
	}

	componentDidMount() {
		const { onInit } = this.props
		const {date} = this.state
		if(typeof onInit === 'function'){
			onInit(date)
		}
	}

	getShownDate() {
		const { link, offset } = this.props;

		const shownDate = link ? link.clone().add(offset, 'months') : this.state.shownDate;

		return shownDate;
	}

	handlerTimeConfirm(){
		const {onConfirm} = this.props
		const {date} = this.state
		if(typeof onConfirm === 'function'){
			onConfirm(date)
		}
	}

	handlerDateSelect(newDate,type) {
		const { link, onChange, onConfirm, onDateChange, time, second } = this.props
		let result = null
		let result2 = null
		let {timeDate} = this.state

		newDate.hours(timeDate ? timeDate.hours() : 0)
		newDate.minutes(timeDate ? timeDate.minutes() : 0)
		newDate.seconds(timeDate && second  ? timeDate.seconds() : 0)

		if (typeof onDateChange === 'function') {
			result = onDateChange(newDate.clone())
		}

		if (typeof onChange === 'function') {
			result2 = onChange(newDate.clone(), type)
		}

		if (!link && result !== false && result2 !== false) {
			this.setState({ date : newDate },()=>{
				(!time && typeof onConfirm === 'function') && onConfirm(newDate)
			})
		}

		return false
	}

	handlerTimeSelect(newDate,type) {
		const { link, onChange, onTimeChange} = this.props
		let {date} = this.state
		if (date == null) {
			let result
			if (typeof onTimeChange === 'function') {
				result = onTimeChange(newDate)
			}
			if (result !== false) {
				this.setState({timeDate : newDate})
			}
		}else{
			let date = this.state.date.clone()
			let result
			let result2
			date.hours(newDate ? newDate.hours() : 0)
			date.minutes(newDate ? newDate.minutes() : 0)
			date.seconds(newDate ? newDate.seconds() : 0)
			// let date = newDate.
			// const { date } = this.state;
			if (typeof onTimeChange === 'function') {
				result = onTimeChange(newDate)
			}
			if (typeof onChange === 'function') {
				result2 = onChange(date.clone(), type)
			}

			if (!link && result !== false && result2 !== false) {
				this.setState({ date,timeDate : newDate })
			}
		}
		return false
	}

	changeMonth(direction, event) {
		event.preventDefault();
		const { link, linkCB } = this.props;

		if (link && linkCB) {
			return linkCB(direction);
		}

		// const current  = this.state.shownDate.month();
		const newMonth = this.state.shownDate.clone().add(direction, 'months');

		this.setState({
			shownDate : newMonth
		});
	}

	changeYear(direction, event) {
		event.preventDefault();
		const { link, linkCB } = this.props;

		if (link && linkCB) {
			return linkCB(direction);
		}

		// const current  = this.state.shownDate.year();
		const shownDate = this.state.shownDate.clone().add(direction, 'years');

		this.setState({shownDate})
	}

	handlerChangeShownMonth(event){
		let month = +event.target.value
		let shownDate = this.getShownDate()
		shownDate = shownDate.clone().month(month)
		this.setState({shownDate})
	}

	handlerChangeShownYear(event){
		let year = +event.target.value
		let shownDate = this.getShownDate()
		shownDate = shownDate.clone().year(year)
		this.setState({shownDate})
	}

	renderMonthAndYear() {
		const shownDate = this.getShownDate();
		const currentYear = moment().year()
		const currentShownYear = shownDate.year()
		const prefix = `${calendarPrefix}-month-and-year`
		const months = []
		const years = []
		for(let i = 0; i < 12; i++){
			months.push(<option key={i} value={i}>{moment.months(i)}</option>)
		}
		let startYear = currentYear - 45
		let endYear = currentYear + 10
		if(this.props.yearLowerLimit > 0) {
			startYear = this.props.yearLowerLimit
		}		
		if(this.props.yearUpperLimit > 0) {
			endYear = this.props.yearUpperLimit
		}

		if (currentShownYear < startYear) {
			years.push(<option key={currentShownYear} value={currentShownYear}>{currentShownYear}</option>)
		}
		for(let i = startYear; i <= endYear; i++ ){
			years.push(<option key={i} value={i}>{i}</option>)
		}
		if (currentShownYear > endYear) {
			years.push(<option key={currentShownYear} value={currentShownYear}>{currentShownYear}</option>)
		}
		let style = {width : '50%',display : 'inline-block',verticalAlign: 'top'}
		return (
			<div className={prefix}>
			<div style={style}>
				<button className={`${prefix}-button ${prefix}-prev-button`} onClick={this.changeYear.bind(this, -1)}><i></i></button>
				<select value={shownDate.year()} onChange={this.handlerChangeShownYear.bind(this)}>
				{years}
				</select>
				<button className={`${prefix}-button ${prefix}-next-button`} onClick={this.changeYear.bind(this, 1)}><i></i></button>
			</div>
			<div style={style}>
				<button className={`${prefix}-button ${prefix}-prev-button`} onClick={this.changeMonth.bind(this, -1)}><i></i></button>
				<select onChange={this.handlerChangeShownMonth.bind(this)} value={shownDate.month()}>
				{months}
				</select>
				<button className={`${prefix}-button ${prefix}-next-button`} onClick={this.changeMonth.bind(this, 1)}><i></i></button>
			</div>
			</div>
		)
	}

	renderWeekdays() {
		const dow = this.getFirstDayOfWeek()
		const weekdays = []

		for (let i = dow; i < 7 + dow; i++) {
			const day = moment.weekdaysMin(i);

			weekdays.push(
			<span key={day}>{day}</span>
			);
		}

		return <div className={`${calendarPrefix}-weekdays`}>{weekdays}</div>
	}

	renderDays() {

		const { range, minDate, maxDate, format, isInvalid } = this.props;

		const shownDate = this.getShownDate();
		const firstDayOfWeek = this.getFirstDayOfWeek()
		const { date } = this.state;

		const monthNumber = shownDate.month();
		const dayCount = shownDate.daysInMonth();
		const startOfMonth = shownDate.clone().startOf('month').isoWeekday();
		// console.log(monthNumber+'；'+dayCount+'；'+startOfMonth)

		const lastMonth                = shownDate.clone().month(monthNumber - 1);
		const lastMonthDayCount        = lastMonth.daysInMonth();
		// console.log(lastMonth+'；'+lastMonthNumber+'；'+lastMonthDayCount)

		const nextMonth                = shownDate.clone().month(monthNumber + 1);

		const days                     = [];

		// Previous month's days
		const diff = (Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7);
		// console.log(diff)
		for (let i = diff-1; i >= 0; i--) {
			const dayMoment  = lastMonth.clone().date(lastMonthDayCount - i);
			// console.log(dayMoment)
			days.push({ dayMoment, isPassive : true });
		}

		// Current month's days
		for (let i = 1; i <= dayCount; i++) {
			const dayMoment  = shownDate.clone().date(i);
			days.push({ dayMoment });
		}

		// Next month's days
		const remainingCells = 42 - days.length; // 42cells = 7days * 6rows
		for (let i = 1; i <= remainingCells; i++ ) {
			const dayMoment  = nextMonth.clone().date(i);
			days.push({ dayMoment, isPassive : true });
		}

		const today = moment()//.startOf('day');
		const className = `${calendarPrefix}-day`
		return days.map((data, index) => {
			const { dayMoment, isPassive } = data;
			const isSelected    = !range && (dayMoment.isSame(date ,'day'));
			//用于范围选择
			const isInRange = range && checkRange(dayMoment, range)
			const isStartEdge = range && checkEdge(dayMoment, range.startDate)
			const isEndEdge = range && checkEdge(dayMoment, range.endDate)
			const isEdge = isStartEdge || isEndEdge; 

			const isToday       = today.isSame(dayMoment,'day');
			const invalid       = isInvalid ? isInvalid(dayMoment) : false
			const isOutsideMinMax = isOusideMinMax(dayMoment, minDate, maxDate, format)
			return  <DayCell
						onSelect={ this.handlerDateSelect.bind(this) }
						dayMoment={dayMoment}
						isStartEdge = { isStartEdge }
						isEndEdge = { isEndEdge }
						isSelected={ isSelected || isEdge }
						isInRange={ isInRange }
						isToday={ isToday }
						key={ index }
						isPassive = { isPassive  }
						isInvalid={invalid || isOutsideMinMax}
						className = {className}
					/>
		})
	}

	renderTime(){
		let {time,second,confirm} = this.props
		if (time) {
			return (
				<div style={{position : 'relative'}}>
					<Time 
						confirm={confirm}
						date={this.state.timeDate} 
						second={second} 
						onChange={this.handlerTimeSelect.bind(this)}
						onConfirm={this.handlerTimeConfirm.bind(this)}  />
				</div>
			)
		}
	}

	render() {
		return (
			<div className={`${calendarPrefix}`}>
			{ this.renderMonthAndYear() }
			{ this.renderWeekdays() }
			<div>{ this.renderDays() }</div>
			{this.renderTime()}
			</div>
		)
	}
}

Calendar.defaultProps = {
	format      : dateFormat,
	time : false,
	second : true,
	yearLowerLimit:-1,
	yearUpperLimit:-1
}

// Calendar.propTypes = {
// 	sets           : PropTypes.string,
// 	range          : PropTypes.shape({
// 	startDate    : PropTypes.object,
// 	endDate      : PropTypes.object
// 	}),
// 	minDate        : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
// 	maxDate        : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
// 	date           : PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
// 	format         : PropTypes.string.isRequired,
// 	firstDayOfWeek : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
// 	onChange       : PropTypes.func,
// 	onInit         : PropTypes.func,
// 	isInvalid      : PropTypes.func,
// 	link           : PropTypes.oneOfType([PropTypes.shape({
// 	startDate    : PropTypes.object,
// 	endDate      : PropTypes.object,
// 	}), PropTypes.bool]),
// 	linkCB         : PropTypes.func,
// 	// theme          : PropTypes.object,
// 	// onlyClasses    : PropTypes.bool,
// 	classNames     : PropTypes.object,
// 	time : PropTypes.bool
// }