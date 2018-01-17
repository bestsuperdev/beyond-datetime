import React, { Component } from 'react'
import {calendarPrefix} from './utils/consts'
import * as DateHelper  from './utils/DateHelper'
import DayCell from './DayCell.js'
import Time from './Time'

const {cloneDate} = DateHelper

export default class Calendar extends Component {

	constructor(props, context) {
		super(props, context)
		let {defaultDate,defaultShownDate} = props
		let date = cloneDate(defaultDate)
		let shownDate = cloneDate(defaultShownDate,props.date,defaultDate) || new Date
		shownDate.setDate(1)
		this.time = null
		this.state = {date,shownDate}
	}

	getDate(){
		let {range,rangePosition,date} = this.props
		return cloneDate(range && range[`${rangePosition}Date`],date,this.state.date)
	}

	getTime(){
		return this.time ? this.time.getTime() : null
	}

	getShownDate() {
		return cloneDate(this.props.shownDate,this.state.shownDate)
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
		if(type === 'time'){
			date = this.getDate()
		}
		date = DateHelper.syncTime(date,this.getTime())
		if (typeof onChange === 'function') {
			result = onChange(cloneDate(date),type)
		}
		if (result !== false) {
			this.setState({date})
		}
		return false
	}

	

	handlerChangeShownDate(type,event){
		let value,shownDate,result
		let {onShownChange} = this.props
		if(event && event.preventDefault){
			event.preventDefault()
			value = event.target.value
		}else{
			value = event
		}
		if(type === 'month'){
			if(typeof value === 'string'){
				shownDate = DateHelper.setMonth(this.state.shownDate, +value)
			}else {
				shownDate = DateHelper.addMonth(this.state.shownDate, value)
			}
		}else if(type === 'year'){
			if(typeof value === 'string'){
				shownDate = DateHelper.setYear(this.state.shownDate, +value)
			}else{
				shownDate = DateHelper.addYear(this.state.shownDate, value)
			}
		}else if(type === 'date'){
			shownDate = event 	
		}
		shownDate.setDate(1)
		if(typeof onShownChange === 'function'){
			result = onShownChange(shownDate)
		}
		if(result !== false){
			this.setState({shownDate})
		}
	}

	handlerToggelToday(){
		this.handlerChangeShownDate('date',new Date)
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
					<button type="button" className={prevClassName} onClick={this.handlerChangeShownDate.bind(this,'year', -1)}></button>
					<select value={currentShownYear} onChange={this.handlerChangeShownDate.bind(this,'year')}>{years}</select>
					<button type="button" className={nextClassName} onClick={this.handlerChangeShownDate.bind(this,'year', 1)}></button>
				</div>
				<div className={`${prefix}-months`}>
					<button type="button" className={prevClassName} onClick={this.handlerChangeShownDate.bind(this,'month', -1)}></button>
					<select onChange={this.handlerChangeShownDate.bind(this,'month')} value={shownDate.getMonth()}>
						{DateHelper.Months.map((month,i)=> <option key={i+''} value={i}>{month}</option> )}
					</select>
					<button type="button" className={nextClassName} onClick={this.handlerChangeShownDate.bind(this,'month', 1)}></button>
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
		let {time,second,range,rangePosition,timeFilter} = this.props
		if (time) {
			let date = this.getDate()
			let disabled = !date && (!range || !range.startDate)
			if(typeof timeFilter === 'function'){
				let shownDate = this.getShownDate()
				let range = range && range.startDate ? {startDate : cloneDate(range.startDate), endDate : cloneDate(range.endDate)} : null
				timeFilter = timeFilter({date, shownDate, range, rangePosition })
			}
			return (
				<Time 
					ref={(time)=> this.time = time  }
					second={second} 
					filter={timeFilter}
					disabled={disabled}
					date={this.getDate()} 
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
			return <div style={{padding : 4, textAlign : 'right'}}>{btns}</div>
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
	second : false,
	today : true,
	__type : 'Calendar'
}