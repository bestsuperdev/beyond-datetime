import React, { Component } from 'react'
import * as DateHelper from './utils/DateHelper'
import Calendar from './Calendar.js'
import PredefinedRanges from './PredefinedRanges.js'
import {dateRangePrefix} from './utils/consts'
const {isDate,cloneDate} = DateHelper

export default class DateRange extends Component {

	constructor(props, context) {
		super(props, context)
		let startShownDate
		let endShownDate

		let {defaultStartDate,defaultEndDate} = props
		let {startDate,endDate} = DateHelper.orderRange(defaultStartDate || defaultEndDate,defaultEndDate || defaultStartDate)
		let {startDate : propsStartDate, endDate : propsEndDate} = DateHelper.orderRange(props.startDate,props.endDate)


		if(isDate(propsStartDate) && isDate(propsEndDate)){
			startShownDate = cloneDate(propsStartDate)
			endShownDate = cloneDate(propsEndDate)
		}else if(isDate(startDate) && isDate(endDate)){
			startShownDate = cloneDate(startDate)
			endShownDate = cloneDate(endDate)
		}else {
			startShownDate = new Date
			endShownDate = DateHelper.addMonth(startShownDate,1)
		}
		if(DateHelper.isSameYearAndMonth(startShownDate,endShownDate)){
			endShownDate = DateHelper.addMonth(startShownDate,1)
		}
		this.state = {startDate,endDate,startShownDate,endShownDate,hoverDate : null}
		this.step = 0
		this.startCalendar = null
		this.endCalendar = null
	}

	getDate(){
		let {startDate : pStartDate ,endDate : pEndDate} = this.props
		let {startDate : sStartDate ,endDate : sEndDate} = this.state
		let startDate,endDate
		if(isDate(pStartDate) && isDate(pEndDate)){
			startDate = cloneDate(pStartDate)
			endDate = cloneDate(pEndDate)
		}else if(isDate(sStartDate) && isDate(sEndDate)){
			startDate = cloneDate(sStartDate)
			endDate = cloneDate(sEndDate)
		}
		return {startDate,endDate}
	}

	getShownDate(){
		let {startShownDate : pStartShownDate ,endShownDate : pEndShownDate} = this.props
		let {startShownDate : sStartShownDate ,endShownDate : sEndShownDate} = this.state
		let startShownDate,endShownDate
		if(isDate(pStartShownDate) && isDate(pEndShownDate)){
			startShownDate = cloneDate(pStartShownDate)
			endShownDate = cloneDate(pEndShownDate)
		}else if(isDate(sStartShownDate) && isDate(sEndShownDate)){
			startShownDate = cloneDate(sStartShownDate)
			endShownDate = cloneDate(sEndShownDate)
		}
		return {startShownDate,endShownDate}
	}

	getTime(){
		return {startTime : this.startCalendar.getTime(), endTime : this.endCalendar.getTime()}
	}

	handlerChange(range) {
		const {onChange} = this.props
		let result
		if (typeof onChange === 'function') {
			result = onChange({startDate : new Date(range.startDate), endDate : new Date(range.endDate)})
		}

		if (result !== false) {
			this.setState(range)
		}
	}

	handlerRangeChange(date){
		if (date.startDate && date.endDate) {
			this.step = 0;
			let timeRange = this.getTime()
			if(timeRange){
				date.startDate = DateHelper.syncTime(date.startDate,timeRange.startTime)
				date.endDate = DateHelper.syncTime(date.endDate,timeRange.endTime)
			}
			this.handlerChange(date);
			return false
		}
	}


	handlerDateChange(prefix,date,changeType){
		let {startDate,endDate} = this.getDate()
		let timeRange = this.getTime()
		if(changeType === 'date'){
			if(this.step === 0){
				startDate = date
				endDate = date
				this.step = 1
			}else if(this.step === 1){
				endDate = date
				this.step = 0
			}
			let range = DateHelper.orderRange(startDate,endDate)

			if(this.props.time){
				range.startDate = DateHelper.syncTime(range.startDate,timeRange.startTime)
				range.endDate = DateHelper.syncTime(range.endDate,timeRange.endTime)
			}
			this.handlerChange(range)

		}else if(changeType === 'time'){
			if(prefix === 'start'){
				startDate = DateHelper.syncTime(startDate,date)
			}else{
				endDate = DateHelper.syncTime(endDate,date)
			}
			this.handlerChange({startDate,endDate})
		}
		return false
	}

	handlerConfirm(){
		let {onConfirm} = this.props
		if (typeof onConfirm === 'function') {
			let {startDate,endDate} = this.getDate()
			this.props.onConfirm({startDate,endDate})
		}
	}

	handlerShownChange(prefix,date){
		this.setState({[`${prefix}ShownDate`] : date})
	}

	handlerHoverDayCell(hoverDate){
		this.setState({hoverDate})
	}

	render() {
		const {ranges, minDate, maxDate, invalidDates, time,timeFilter,startTimeFilter,endTimeFilter, second, confirm,language} = this.props
		const currentRanges = typeof ranges === 'function' ? ranges(this.props) :  ranges
		const {hoverDate} = this.state
		const {startShownDate,endShownDate} = this.getShownDate()
		const {startDate,endDate} = this.getDate()
		const getProps = (key)=>{
			let shownDate,filter
			if(key === 'start'){
				shownDate = startShownDate
				filter = startTimeFilter || timeFilter
			}else{
				shownDate = endShownDate
				filter = endTimeFilter || timeFilter
			}
			let props = {
				language,
				shownDate,
				key,
				range : {startDate,endDate},
				rangePosition : key,
				invalidDates,
				minDate,
				maxDate,
				time,
				second,
				timeFilter : filter ,
				today : false,
				onChange : this.handlerDateChange.bind(this,key),
				onShownChange : this.handlerShownChange.bind(this,key)
			}
			if(confirm &&  key === 'end'){
				props.onConfirm = this.handlerConfirm.bind(this)
				props.confirm = true
			}
			if(this.step === 1){
				props.onHover = this.handlerHoverDayCell.bind(this)
				props.hoverDate = hoverDate
			}
			return props
		}

		return (
			<div className={dateRangePrefix}>
				{currentRanges && <PredefinedRanges
						ranges={currentRanges}
						startDate={startDate}
						endDate={endDate}
						onSelect={this.handlerRangeChange.bind(this)}
					/>}
				<div className={`${dateRangePrefix}-container`}>
					<Calendar  ref={(calendar)=> this.startCalendar = calendar} {...getProps('start')} />
				</div>
				<div className={`${dateRangePrefix}-container`}>
					<Calendar  ref={(calendar)=> this.endCalendar = calendar} {...getProps('end')} />
				</div>
			</div>
		);
	}
}

DateRange.defaultProps = {
	__type : 'DateRange',
	language : 'cn',
}