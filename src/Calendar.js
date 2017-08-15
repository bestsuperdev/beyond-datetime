import React, { Component } from 'react'
import {calendarPrefix} from './utils/consts'
import * as DateHelper  from './utils/DateHelper'
import DayCell from './DayCell.js'
import Time from './Time'

const {isDate} = DateHelper

export default class Calendar extends Component {

	constructor(props, context) {
		super(props, context)
		let {defaultDate} = props
		let date = isDate(defaultDate) ? new Date(defaultDate) : null
		let shownDate = isDate(props.date) ? new Date(props.date) : (isDate(date) ? new Date(date) : new Date)
		shownDate.setDate(1)
		this.state = {date,shownDate}
	}

	getDate(){
		let date = this.props.date || this.state.date
		return date ? new Date(date) : null 
	}

	getTime(){
		let {date,range,rangePosition,time} = this.props
		let timeDate = (range && range[`${rangePosition}Date`]) || date || this.state.date || DateHelper.getInitTime()
		return timeDate && time ? new Date(timeDate) : null
	}

	getShownDate() {
		let date = this.props.shownDate || this.state.shownDate
		return  date ? new Date(date) : null
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
			result = onChange(new Date(date),type)
		}
		if (result !== false) {
			this.setState({date})
		}
		return false
	}

	handlerChangeShownMonth(event){
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


	renderMonthAndYear() {
		const shownDate = this.getShownDate()
		const currentYear = (new Date).getFullYear()
		const currentShownYear = shownDate.getFullYear()
		const prefix = `${calendarPrefix}-month-and-year`
		const years = []

		let startYear = Math.max(currentYear-45, 1970)
		let endYear = currentYear + 10


		if (currentShownYear < startYear) {
			years.push(<option key={currentShownYear} value={currentShownYear}>{currentShownYear}</option>)
		}
		for(let i = startYear; i <= endYear; i++ ){
			years.push(<option key={i} value={i}>{i}</option>)
		}
		if (currentShownYear > endYear) {
			years.push(<option key={currentShownYear} value={currentShownYear}>{currentShownYear}</option>)
		}
		let style = {width : '50%',display : 'inline-block'}
		let prevClassName = `${prefix}-button ${prefix}-prev-button`
		let nextClassName = `${prefix}-button ${prefix}-next-button`
		return (
			<div className={prefix}>
				<div style={style}>
					<button type="button" className={prevClassName} onClick={this.handlerChangeShownYear.bind(this, -1)}></button>
					<select value={shownDate.getFullYear()} onChange={this.handlerChangeShownYear.bind(this)}>{years}</select>
					<button type="button" className={nextClassName} onClick={this.handlerChangeShownYear.bind(this, 1)}></button>
				</div>
				<div style={style}>
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
		const { range, minDate, maxDate, invalidDates } = this.props

		const shownDate = this.getShownDate()
		const date = this.getDate() 

		const days = DateHelper.getDatesInCalendarMonth(shownDate)

		const today = new Date
		const className = `${calendarPrefix}-day`
		const dayCells = days.map((_date, index) => {

			const isSelected = !range && date && DateHelper.isSameDate(date,_date)
			//用于范围选择
			const isPassive = !DateHelper.isSameYearAndMonth(shownDate,_date)
			const isInRange = range && DateHelper.isBetween(_date,range.startDate,range.endDate) // checkRange(_date, range)
			const isStartEdge = range && DateHelper.isSameDate(_date,range.startDate)
			const isEndEdge = range && DateHelper.isSameDate(_date,range.endDate)
			const isEdge = isStartEdge || isEndEdge

			const isToday = DateHelper.isSameDate(_date,today)
			let isInvalid = typeof invalidDates === 'function' ? invalidDates(new Date(_date)) : false
			if(minDate || maxDate){
				isInvalid = isInvalid && !DateHelper.isBetween(_date,minDate,maxDate) // isOusideMinMax(_date, minDate, maxDate)
			}
			return  <DayCell
						onSelect={ this.handlerChange.bind(this,'date') }
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
		let {confirm} = this.props
		let btns = []
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
	hideOnChange : true
}