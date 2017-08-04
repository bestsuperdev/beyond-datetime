import React, { Component } from 'react';
// import classnames from 'classnames'
import parseInput from './utils/parseInput.js';
import Calendar from './Calendar.js';
import PredefinedRanges from './PredefinedRanges.js';
import {dateRangePrefix} from './utils/consts'


export default class DateRange extends Component {

	constructor(props, context) {
		super(props, context)
		const {time,initTime } = props
		const startDate = parseInput(props.startDate,time && initTime)
		const endDate   = parseInput(props.endDate,time && initTime)
		this.state = {startDate,endDate}
		this.step = 0
	}

	componentDidMount() {		
		const { onInit } = this.props
		const {startDate,endDate} = this.state
		typeof onInit === 'function' && onInit({startDate,endDate})
	}

	orderRange(range) {
		let { startDate, endDate } = range
		startDate = startDate.clone()
		endDate = endDate.clone()
		if (!startDate.isAfter(endDate)) {
			return {startDate,endDate}
		}else{
			return {
				startDate : endDate,
				endDate : startDate
			}
		}
	}

	setRange(range) {
		const {onChange} = this.props
		range = this.orderRange(range)
		let result = null
		if (typeof onChange === 'function') {
			result = onChange(range)
		}

		if (result !== false) {
			this.setState(range)
		}
	}

	handlerRangeChange(date){
		if (date.startDate && date.endDate) {
			this.step = 0;
			this.setRange(date);
			return false
		}
	}


	handlerDateChange(date){
		let { startDate, endDate } = this.state
		switch (this.step) {
			case 0:
				startDate = date
				endDate = date
				this.step = 1
				break
			case 1:
				endDate = date
				this.step = 0
				break
		}
		this.setRange({startDate,endDate})
		return false
	}

	handlerConfirm(){
		let {onConfirm} = this.props
		if (typeof onConfirm === 'function') {
			let {startDate,endDate} = this.state
			startDate = startDate.clone()
			endDate = endDate.clone()
			this.props.onConfirm({startDate,endDate})
		}
	}

	componentWillReceiveProps(nextProps) {
		// Whenever date props changes,	 update state with parsed variant
		if('startDate' in nextProps || 'endDate' in nextProps){
			let {time,initTime} = nextProps
			const startDate = parseInput(nextProps.startDate,time && initTime)
			const endDate = parseInput(nextProps.endDate,time && initTime)
			this.setState({startDate,endDate})
		}
	}

	render() {
		const {ranges, firstDayOfWeek, minDate, maxDate, invalid, time, second, confirm, yearLowerLimit, yearUpperLimit } = this.props
		const {startDate,endDate} = this.state
		let getProps = (i)=>{
			let props = {
				key : i+'',
				offset : i-1,
				range : {startDate,endDate},
				firstDayOfWeek,
				invalid,
				minDate,
				maxDate,
				time,
				second,
				onChange : this.handlerDateChange.bind(this),
				yearLowerLimit,
				yearUpperLimit
			}
			if(confirm && i == 1){
				props.onConfirm = this.handlerConfirm.bind(this)
				props.confirm = true
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


// DateRange.propTypes = {
// 	format          : PropTypes.string,
// 	time : PropTypes.bool,
// 	firstDayOfWeek  : PropTypes.number,
// 	startDate       : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
// 	endDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
// 	minDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
// 	maxDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
// 	dateLimit       : PropTypes.func,
// 	ranges          : PropTypes.object,
// 	linkedCalendars : PropTypes.bool,
// 	onInit          : PropTypes.func,
// 	onChange        : PropTypes.func,
// 	isInvalid       : PropTypes.func,	
// }