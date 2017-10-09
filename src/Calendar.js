import React, { Component } from 'react'
import {calendarPrefix} from './utils/consts'
import * as DateHelper  from './utils/DateHelper'
import DayCell from './DayCell.js'
import Time from './Time'

const {isDate,cloneDate} = DateHelper

export default class Calendar extends Component {

	constructor(props, context) {
		super(props, context)
		let {defaultDate} = props
		let date = isDate(defaultDate) ? cloneDate(defaultDate) : null
		let shownDate = isDate(props.date) ? cloneDate(props.date) : (isDate(date) ? cloneDate(date) : new Date)
		shownDate.setDate(1)
		this.state = {date,shownDate}
	}

	getDate(){
		let date = this.props.date || this.state.date
		return isDate(date) ? cloneDate(date) : null 
	}

	getTime(){
		if(this.props.time){
			let {date,range,rangePosition} = this.props
			let timeDate = (range && range[`${rangePosition}Date`]) || date || this.state.date || DateHelper.getInitTime()
			return cloneDate(timeDate)
		}else{
			return null
		}
	}

	getShownDate() {
		let date = this.props.shownDate || this.state.shownDate
		return  isDate(date) ? cloneDate(date) : null
	}

	handlerConfirm(){
		const {onConfirm} = this.props
		if(typeof onConfirm === 'function'){
			onConfirm(this.getDate())
		}
	}


	handlerChange(type,date){
		const {onChange} = this.props
		let result = null
		let timeDate
		if(type === 'date' && null != (timeDate = this.getTime())){
			date = DateHelper.syncTime(date,timeDate)
		}else if(type === 'time' && this.state.date){
			date = DateHelper.syncTime(this.state.date,date)
		}
		if (typeof onChange === 'function') {
			result = onChange(cloneDate(date),type)
		}
		if (result !== false) {
			this.setState({date})
		}
		return false
	}

	handlerChangeShownMonth(event){
		if(event.preventDefault){
			event.preventDefault()
		}
		let shownDate
		if(event.target){
			shownDate = DateHelper.setMonth(this.getShownDate(),+event.target.value)
		}else if(typeof event === 'number'){
			shownDate = DateHelper.addMonth(this.getShownDate(),event)
		}
		if(shownDate){
			shownDate.setDate(1)
			this.handlerChangeShownDate(shownDate)
		}
	}

	handlerChangeShownYear(event){
		if(event.preventDefault){
			event.preventDefault()
		}
		let shownDate
		if(event.target){
			shownDate = DateHelper.setYear(this.getShownDate(),+event.target.value)
		}else if(typeof event === 'number'){
			shownDate = DateHelper.addYear(this.getShownDate(),event)
		}
		if(shownDate){
			shownDate.setDate(1)
			this.handlerChangeShownDate(shownDate)
		}
	}


	handlerChangeShownDate(shownDate){
		let {onShownChange} = this.props
		let result 
		if(typeof onShownChange === 'function'){
			result = onShownChange(shownDate)
		}
		if(result !== false){
			this.setState({shownDate})
		}
	}

	handlerToggelToday(){
		let date = new Date
		date.setDate(1)
		this.handlerChangeShownDate(date)
		this.handlerChange('date',new Date)
	}

	handlerHoverCell(date){
		let {onHover} = this.props
		if (typeof onHover === 'function') {
			onHover(date)
		}
	}

	renderMonthAndYear() {
		const shownDate = this.getShownDate()

		const currentShownYear = shownDate.getFullYear()
		const prefix = `${calendarPrefix}-month-and-year`
		const years = []
		let {startYear,endYear} = DateHelper.getYearRange()


		if (currentShownYear < startYear) {
			years.push(<option key={currentShownYear} value={currentShownYear}>{currentShownYear}</option>)
		}
		for(let i = startYear; i <= endYear; i++ ){
			years.push(<option key={i} value={i}>{i}</option>)
		}
		if (currentShownYear > endYear) {
			years.push(<option key={currentShownYear} value={currentShownYear}>{currentShownYear}</option>)
		}
		
		let prevClassName = `${prefix}-button ${prefix}-prev-button`
		let nextClassName = `${prefix}-button ${prefix}-next-button`
		return (
			<div className={prefix}>
				<div className={`${prefix}-years`}>
					<button type="button" className={prevClassName} onClick={this.handlerChangeShownYear.bind(this, -1)}></button>
					<select value={shownDate.getFullYear()} onChange={this.handlerChangeShownYear.bind(this)}>{years}</select>
					<button type="button" className={nextClassName} onClick={this.handlerChangeShownYear.bind(this, 1)}></button>
				</div>
				<div className={`${prefix}-months`}>
					<button type="button" className={prevClassName} onClick={this.handlerChangeShownMonth.bind(this, -1)}></button>
					<select onChange={this.handlerChangeShownMonth.bind(this)} value={shownDate.getMonth()}>
						{DateHelper.Months.map((month,i)=> <option key={i+''} value={i}>{month}</option> )}
					</select>
					<button type="button" className={nextClassName} onClick={this.handlerChangeShownMonth.bind(this, 1)}></button>
				</div>
			</div>
		)
	}

	renderWeekdays() {

		return (
			<div className={`${calendarPrefix}-weekdays`}>
				{DateHelper.Weeks.map((week,i)=> <span key={i+''}>{week}</span> )}
			</div>
		)
	}

	renderDays() {
		const { range, minDate, maxDate, invalidDates,hoverDate } = this.props

		const shownDate = this.getShownDate()
		const date = this.getDate() 

		const days = DateHelper.getDatesInCalendarMonth(shownDate)

		const today = new Date
		const className = `${calendarPrefix}-day`
		const dayCells = days.map((_date, index) => {

			const isSelected = !range && date && DateHelper.isSameDate(date,_date)
			//用于范围选择
			const isPassive = !DateHelper.isSameYearAndMonth(shownDate,_date)
			const isStartEdge = range && DateHelper.isSameDate(_date,range.startDate)
			const isEndEdge = range && DateHelper.isSameDate(_date,range.endDate)
			const isEdge = isStartEdge || isEndEdge
			
			const isToday = DateHelper.isSameDate(_date,today)
			let isInvalid = typeof invalidDates === 'function' ? invalidDates(cloneDate(_date)) : false
			if(minDate || maxDate){
				isInvalid = isInvalid && !DateHelper.isBetween(_date,minDate,maxDate) // isOusideMinMax(_date, minDate, maxDate)
			}
			let isInRange //=  range && DateHelper.isBetween(_date,range.startDate,range.endDate) // checkRange(_date, range)
			if(range){
				let _range = hoverDate ? DateHelper.orderRange(hoverDate,range.startDate) : range
				isInRange = DateHelper.isBetween(_date,_range.startDate,_range.endDate)
			}else{
				isInRange = false
			}
			return  <DayCell
						onSelect={ this.handlerChange.bind(this,'date') }
						onHover={ this.handlerHoverCell.bind(this) }
						date={_date}
						isStartEdge = { isStartEdge }
						isEndEdge = { isEndEdge }
						isSelected={ isSelected || isEdge }
						isInRange={ isInRange }
						isToday={ isToday }
						key={ index }
						isPassive = { isPassive  }
						isInvalid={isInvalid}
						className = {className}
					/>
		})
		return <div>{dayCells}</div>
	}

	renderTime(){
		let {time,second,range} = this.props
		if (time) {
			let disabled = !this.getDate() && (!range || !range.startDate)
			return (
				<Time second={second} 
					disabled={disabled}
					date={this.getTime()} 
					onChange={this.handlerChange.bind(this,'time')}  />
			)
		}
	}

	renderBtns(){
		let {confirm,today} = this.props
		let btns = []
		if(today){
			btns.push(<button onClick={this.handlerToggelToday.bind(this)} key="today" className="bdt-btn bdt-btn-today" type="button">今天</button>)
		}
		if(confirm){
			btns.push(<button onClick={this.handlerConfirm.bind(this)} key="confirm" className="bdt-btn" type="button">确定</button>)
		}
		if(btns.length > 0){
			return <div style={{padding : 4,textAlign : 'right'}}>{btns}</div>
		}

	}

	render() {

		return (
			<div className={calendarPrefix} style={this.props.style}>
				{this.renderMonthAndYear()}
				{this.renderWeekdays()}
				{this.renderDays()}
				{this.renderTime()}
				{this.renderBtns()}
			</div>
		)
	}
}

Calendar.defaultProps = {
	time : false,
	second : true,
	today : true,
	__type : 'Calendar'
}