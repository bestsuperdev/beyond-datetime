import React, { Component } from 'react'
import * as DateHelper from './utils/DateHelper'
import Calendar from './Calendar.js'
import PredefinedRanges from './PredefinedRanges.js'
import {dateRangePrefix} from './utils/consts'
const {isDate} = DateHelper

export default class DateRange extends Component {

	constructor(props, context) {
		super(props, context)
		let startShownDate
		let endShownDate

		let {defaultStartDate,defaultEndDate} = props
		let {startDate,endDate} = DateHelper.orderRange(defaultStartDate || defaultEndDate,defaultEndDate || defaultStartDate)
		let {startDate : propsStartDate, endDate : propsEndDate} = DateHelper.orderRange(props.startDate,props.endDate)

		if(isDate(propsStartDate) && isDate(propsEndDate)){
			startShownDate = new Date(propsStartDate)
			endShownDate = new Date(propsEndDate)
		}else if(isDate(startDate) && isDate(endDate)){
			startShownDate = new Date(startDate)
			endShownDate = new Date(endDate)
		}else {
			startShownDate = DateHelper.addMonth(new Date,-1)
			endShownDate = new Date
		}
		if(DateHelper.isSameYearAndMonth(startShownDate,endShownDate)){
			endShownDate = DateHelper.addMonth(endShownDate,1)
		}
		this.state = {startDate,endDate,startShownDate,endShownDate,hoverDate : null}
		this.step = 0
	}

	getDate(){
		let {startDate : pStartDate ,endDate : pEndDate} = this.props
		let {startDate : sStartDate ,endDate : sEndDate} = this.state
		let startDate,endDate
		if(isDate(pStartDate) && isDate(pEndDate)){
			startDate = new Date(pStartDate)
			endDate = new Date(pEndDate)
		}else if(isDate(sStartDate) && isDate(sEndDate)){
			startDate = new Date(sStartDate)
			endDate = new Date(sEndDate)
		}
		return {startDate,endDate}
	}

	getTime(){
		if(this.props.time){
			let startTime,endTime
			let {startDate : pStartDate ,endDate : pEndDate} = this.props
			let {startDate : sStartDate ,endDate : sEndDate} = this.state
			if(isDate(pStartDate) && isDate(pEndDate)){
				startTime = new Date(pStartDate)
				endTime = new Date(pEndDate)
			}else if(isDate(sStartDate) && isDate(sEndDate)){
				startTime = new Date(sStartDate)
				endTime = new Date(sEndDate)
			}else{
				startTime = DateHelper.getInitTime()
				endTime = DateHelper.getInitTime()
			}
			return {startTime,endTime}
		}
	}

	handlerSetRange(range) {
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
			this.handlerSetRange(date);
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

			if(timeRange){
				range.startDate = DateHelper.syncTime(range.startDate,timeRange.startTime)
				range.endDate = DateHelper.syncTime(range.endDate,timeRange.endTime)
			}
			this.handlerSetRange(range)

		}else if(changeType === 'time'){
			if(prefix === 'start'){
				startDate = DateHelper.syncTime(startDate,date)
			}else{
				endDate = DateHelper.syncTime(endDate,date)
			}
			this.handlerSetRange({startDate,endDate})
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
		const {ranges, minDate, maxDate, invalidDates, time, second, confirm} = this.props
		const {startShownDate,endShownDate,hoverDate} = this.state
		let {startDate,endDate} = this.getDate()
		let getProps = (i)=>{
			let key = i === 0 ? 'start' : 'end'
			let props = {
				shownDate : key === 'start' ? startShownDate : endShownDate,
				key,
				range : {startDate,endDate},
				rangePosition : key,
				invalidDates,
				minDate,
				maxDate,
				time,
				second,
				today : false,
				onChange : this.handlerDateChange.bind(this,key),
				onShownChange : this.handlerShownChange.bind(this,key)
			}
			if(confirm && i == 1){
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
				{ranges && <PredefinedRanges
						ranges={ ranges }
						startDate={startDate}
						endDate={endDate}
						onSelect={this.handlerRangeChange.bind(this)}
					/>}
				<div className={`${dateRangePrefix}-container`}>
					<Calendar  {...getProps(0)} />
				</div>
				<div className={`${dateRangePrefix}-container`}>
					<Calendar  {...getProps(1)} />
				</div>
			</div>
		);
	}
}

DateRange.defaultProps = {
	__type : 'DateRange'
}