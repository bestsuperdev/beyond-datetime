import React, { Component } from 'react'
import moment from 'moment'
require('moment/locale/zh-cn')
import {calendarPrefix} from './utils/consts'
import parseInput from './utils/parseInput.js'
import DayCell from './DayCell.js'
import Time from './Time'


moment.locale('zh-cn')

function syncTime(source,target){

}

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
		let {date, range, offset,time, initTime} = props
		date = parseInput(date,time && initTime)
		let shownDate = ((range && range.endDate) || date || moment()).clone().add(offset, 'months')
		this.state = {date,shownDate}
	}

	getFirstDayOfWeek(){
		return this.props.firstDayOfWeek || moment.localeData().firstDayOfWeek()
	}

	componentWillReceiveProps(nextProps) {
		let nextState
		if('date' in nextProps){
			let {date,isInvalid,time,initTime} = nextProps
			if(typeof isInvalid !== 'function' || !isInvalid(date)){
				nextState = {date : parseInput(date,time && initTime)}
			}
		}

		let {range,offset} = nextProps
		let shownDate = (range && range.endDate) || (nextState ? nextState.date : moment()) 
		shownDate = shownDate.clone().add(offset,'months')
		if(nextState){
			nextState.shownDate = shownDate
		}else{
			nextState = {shownDate}
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
		return  this.state.shownDate;
	}

	handlerConfirm(date){
		const {onConfirm} = this.props
		if(typeof onConfirm === 'function'){
			onConfirm(date)
		}
	}

	handlerSelect(isSyncTime,date) {
		const {onChange} = this.props
		let result = null
		if(isSyncTime){
			let {date : _date} = this.state
			date.hours(_date.hours())
			date.minutes(_date.minutes())
			date.seconds(_date.seconds())
		}
		if (typeof onChange === 'function') {
			result = onChange(date.clone())
		}

		if (result !== false) {
			this.setState({date})
		}

		return false
	}


	changeMonth(direction) {
		const shownDate = this.state.shownDate.clone().add(direction, 'months');
		this.setState({shownDate})
	}

	changeYear(direction) {
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
		let prevClassName = `${prefix}-button ${prefix}-prev-button`
		let nextClassName = `${prefix}-button ${prefix}-next-button`
		return (
			<div className={prefix}>
			<div style={style}>
				<button type="button" className={prevClassName} onClick={this.changeYear.bind(this, -1)}></button>
				<select value={shownDate.year()} onChange={this.handlerChangeShownYear.bind(this)}>{years}</select>
				<button type="button" className={nextClassName} onClick={this.changeYear.bind(this, 1)}></button>
			</div>
			<div style={style}>
				<button type="button" className={prevClassName} onClick={this.changeMonth.bind(this, -1)}></button>
				<select onChange={this.handlerChangeShownMonth.bind(this)} value={shownDate.month()}>{months}</select>
				<button type="button" className={nextClassName} onClick={this.changeMonth.bind(this, 1)}></button>
			</div>
			</div>
		)
	}

	renderWeekdays() {
		const dow = this.getFirstDayOfWeek()
		const weekdays = []

		for (let i = dow; i < 7 + dow; i++) {
			const day = moment.weekdaysMin(i);
			weekdays.push(<span key={day}>{day}</span>)
		}

		return <div className={`${calendarPrefix}-weekdays`}>{weekdays}</div>
	}

	renderDays() {

		const { range, minDate, maxDate, format, isInvalid, time } = this.props;

		const shownDate = this.getShownDate()
		const firstDayOfWeek = this.getFirstDayOfWeek()
		const { date } = this.state

		const monthNumber = shownDate.month()
		const dayCount = shownDate.daysInMonth()
		const startOfMonth = shownDate.clone().startOf('month').isoWeekday()

		const lastMonth = shownDate.clone().month(monthNumber - 1)
		const lastMonthDayCount = lastMonth.daysInMonth()

		const nextMonth = shownDate.clone().month(monthNumber + 1)
		const days = []

		const diff = (Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7)

		for (let i = diff-1; i >= 0; i--) {
			const dayMoment  = lastMonth.clone().date(lastMonthDayCount - i)
			days.push({dayMoment, isPassive : true })
		}

		// Current month's days
		for (let i = 1; i <= dayCount; i++) {
			const dayMoment  = shownDate.clone().date(i)
			days.push({ dayMoment });
		}

		// Next month's days
		const remainingCells = 42 - days.length // 42cells = 7days * 6rows
		for (let i = 1; i <= remainingCells; i++ ) {
			const dayMoment  = nextMonth.clone().date(i)
			days.push({ dayMoment, isPassive : true })
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
						onSelect={ this.handlerSelect.bind(this,time) }
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
		let {time,initTime, second,confirm} = this.props
		if (time) {
			return (
				<div style={{position : 'relative'}}>
					<Time 
						confirm={confirm}
						date={this.state.date}
						init={initTime} 
						second={second} 
						onChange={this.handlerSelect.bind(this,false)}
						onConfirm={this.handlerConfirm.bind(this)}  />
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
	time : false,
	initTime : true,
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