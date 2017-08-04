/*

<Calendar />

*/


import React, { Component } from 'react'
import {calendarPrefix} from './utils/consts'
import * as DateHelper from './utils/DateHelper'
import DayCell from './DayCell.js'
import Time from './Time'


function checkRange(date, range) {
	return DateHelper.isBetween(date,range.startDate,range.endDate)
}

function checkEdge(date1, date2) {
	return DateHelper.isSameDate(date1,date2)
}

function isOusideMinMax(date, minDate, maxDate) {
	return !DateHelper.isBetween(date,minDate,maxDate)
}

export default class Calendar extends Component {

	constructor(props, context) {
		super(props, context)
		let {defaultDate,defaultShownDate} = props
		let date = defaultDate instanceof Date ? new Date(defaultDate) : new Date
		let shownDate = defaultShownDate instanceof Date ? new Date(defaultShownDate) : new Date
		shownDate.setDate(1)
		this.state = {date, shownDate}
	}

	componentDidMount() {
		const { onInit } = this.props
		if(typeof onInit === 'function'){
			onInit(this.getDate())
		}
	}

	getDate(){
		return new Date(this.props.date || this.state.date)
	}

	getShownDate() {
		return new Date(this.props.shownDate || this.state.shownDate)
	}

	handlerConfirm(){
		const {onConfirm} = this.props
		if(typeof onConfirm === 'function'){
			onConfirm(this.getDate())
		}
	}

	handlerSelect(date) {
		const {onChange} = this.props
		let result = null
		if (typeof onChange === 'function') {
			result = onChange(date.clone())
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
			shownDate = DateHelper.addMonth(shownDate,event)
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
			shownDate = DateHelper.addYear(shownDate,event)
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

		let startYear = this.props.yearLowerLimit || Math.max(currentYear - 45,1970)
		let endYear = this.props.yearUpperLimit || (currentYear + 10)


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
		const { range, minDate, maxDate,  invalid } = this.props

		const shownDate = this.getShownDate()
		const date = this.getDate() 

		const days = DateHelper.getDatesInCalendarMonth(shownDate)

		const today = new Date
		const className = `${calendarPrefix}-day`
		const dayCells = days.map((_date, index) => {

			const isSelected = !range && DateHelper.isSameDate(date,_date)
			//用于范围选择
			const isPassive = DateHelper.isSameMonth(shownDate,_date)
			const isInRange = range && checkRange(_date, range)
			const isStartEdge = range && checkEdge(_date, range.startDate)
			const isEndEdge = range && checkEdge(_date, range.endDate)
			const isEdge = isStartEdge || isEndEdge

			const isToday = DateHelper.isSameDate(_date,today)
			const isInvalid = typeof invalid === 'function' ? invalid(new Date(_date)) : false
			const isOutsideMinMax = isOusideMinMax(_date, minDate, maxDate)
			return  <DayCell
						onSelect={ this.handlerSelect.bind(this) }
						date={_date}
						isStartEdge = { isStartEdge }
						isEndEdge = { isEndEdge }
						isSelected={ isSelected || isEdge }
						isInRange={ isInRange }
						isToday={ isToday }
						key={ index }
						isPassive = { isPassive  }
						isInvalid={isInvalid || isOutsideMinMax}
						className = {className}
					/>
		})
		return <div>{dayCells}</div>
	}

	renderTime(){
		let {time,second} = this.props
		if (time) {
			return (
				<Time second={second}/>
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
	initTime : true,
	second : true,
	yearLowerLimit:-1,
	yearUpperLimit:-1
}