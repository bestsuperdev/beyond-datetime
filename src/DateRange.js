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
		this.state = {
			range : {startDate,endDate}
		}
		this.step = 0
	}

	componentDidMount() {		
		const { onInit } = this.props
		const {range} = this.state
		typeof onInit === 'function' && onInit(range)
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
			this.setState({range})
		}
	}

	handlerRangeChange(date){
		if (date.startDate && date.endDate) {
			this.step = 0;
			this.setRange(date);
			return false
		}
	}


	handlerDateChange(index,date){
		let { startDate, endDate } = this.state.range
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
			let {startDate,endDate} = this.state.range
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
		const {ranges, firstDayOfWeek, minDate, maxDate, isInvalid, time, second, confirm, yearLowerLimit, yearUpperLimit } = this.props
		const {range} = this.state

		let predefinedRanges=(ranges && (
			<PredefinedRanges
				// extraClassName={leftPosition > 0 && leftPosition < tabsWidth && `rdr-predefined-ranges-relative`}
				ranges={ ranges }
				range={ range }
				onSelect={this.handlerRangeChange.bind(this)}
			/>
		))
		// console.log(predefinedRanges)
		let _calendars = []
		for (let i = 0; i < 2; i++) {
			_calendars.push(
				<Calendar
					key={i}
					offset={ i-1 }
					range={ range }
					firstDayOfWeek={ firstDayOfWeek }
					isInvalid={isInvalid}
					minDate={ minDate }
					maxDate={ maxDate }
					time={time}
					second={second}
					onChange={ this.handlerDateChange.bind(this,i) }
					onConfirm={ confirm && i === 1 ? this.handlerConfirm.bind(this) : void(0)}
					confirm={confirm && i === 1}
					yearLowerLimit={yearLowerLimit}
					yearUpperLimit={yearUpperLimit}/>
			)
		}	

		return (
			<div className={dateRangePrefix}>
				{predefinedRanges}
				{(<div className={`rdr-calendar-list`}>
					{_calendars}
					{(confirm && !time) && (
						<div style={{padding : '5px 15px',textAlign :'right',}}>
							<a href="#" className={`${dateRangePrefix}-confirm-btn`} onClick={this.handlerConfirm.bind(this)}>确认</a>
						</div>
					)}
				</div>)}
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