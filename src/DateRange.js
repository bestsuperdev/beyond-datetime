import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import parseInput,{parseTimeInput} from './utils/parseInput.js';
import Calendar from './Calendar.js';
import PredefinedRanges from './PredefinedRanges.js';
import {dateRangePrefix} from './utils/consts'

class DateRange extends Component {

	constructor(props, context) {
		super(props, context);

		const { format, linkedCalendars, theme, time } = props
		const startDate = parseInput(props.startDate, format,true)
		const startTime = time ? parseTimeInput(startDate) : null

		const endDate   = parseInput(props.endDate, format,true)
		const endTime = time ? parseTimeInput(endDate) : null

		this.state = {
			timeRange : (time && startTime && endTime) ? ({startTime,endTime}) : null,
			range     : { startDate, endDate },
			link      : linkedCalendars && endDate,
		}

		this.step = 0;
		// this.styles = getTheme(theme);
	}

	componentDidMount() {
		const { onInit } = this.props
		const {range} = this.state
		onInit && onInit(range)
	}

	orderRange(range) {
		const { startDate, endDate } = range;
		if (startDate && endDate) {
			const swap = startDate.isAfter(endDate);
			if (!swap) return range;
		}

		return {
			startDate : endDate,
			endDate   : startDate
		}
	}

	setTime(range,timeRange){
		let {startDate,endDate} = range
		let startTime = null
		let endTime = null
		if (timeRange) {
			startTime = timeRange.startTime
			endTime = timeRange.endTime
		}
		if (startDate && endDate) {
			startDate = startDate.clone()
			endDate = endDate.clone()
			
			startDate.hour(startTime ? startTime.hour() : 0)
			startDate.minute(startTime ? startTime.minute() : 0)
			startDate.second(startTime ? startTime.second() : 0)

			endDate.hour(endTime ? endTime.hour() : 0)
			endDate.minute(endTime ? endTime.minute() : 0)
			endDate.second(endTime ? endTime.second() : 0)
		}
		return {startDate,endDate}
	}

	setRange(range) {
		const {onChange, time } = this.props
		const {timeRange} = this.state
		range = this.orderRange(range)
		let result = null

		if (typeof onChange === 'function') {
			if (time) {
				range = this.setTime(range,timeRange)
			}
			result = onChange(range)
		}
		if (result !== false) {
			// const state = 
			this.setState({range})
		}
		// onChange && onChange(range);
	}

	handleLinkChange(direction) {
		const { link } = this.state;

		this.setState({
			link : link.clone().add(direction, 'months')
		});
	}

	handlerRangeChange(date){
		if (date.startDate && date.endDate) {
			this.step = 0;
			this.setRange(date);
			return false
		}
	}

	handlerTimeChange(index,date){
		const {timeRange,range} = this.state
		const {onChange} = this.props
		const field = index === 0 ? 'startTime' : 'endTime'
		timeRange[field] = date
		if (range.startDate && range.endDate) {
			let result
			if (typeof onChange === 'function') {
				result = onChange(this.setTime(range,timeRange))
			}
			if (result !== false) {
				this.setState({timeRange})
			}
		}else{
			this.setState({timeRange})
		}
		return false
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

	handlerConfirm(event){
		if (event && event.preventDefault) {
			event.preventDefault()
		}
		if (typeof this.props.onConfirm === 'function') {
			let {timeRange,range} = this.state
			range = this.setTime(range,timeRange)
			this.props.onConfirm(range)
		}
	}


	componentWillReceiveProps(newProps) {
		// Whenever date props changes, update state with parsed variant
		if (newProps.startDate || newProps.endDate) {
			const startDate    = newProps.startDate   && parseInput(newProps.startDate, newProps.format,true);
			const endDate      = newProps.endDate     && parseInput(newProps.endDate, newProps.format,true);
			const oldStartDate = this.props.startDate && parseInput(this.props.startDate, this.props.format,true)
			const oldEndDate   = this.props.endDate   && parseInput(this.props.endDate, this.props.format,true)

			if (!startDate.isSame(oldStartDate) || !endDate.isSame(oldEndDate)) {
				let state = {}
				let range = {
					startDate: startDate || oldStartDate,
					endDate: endDate || oldEndDate
				}
				state.range = range
				if (newProps.time) {
					state.timeRange = { startTime : range.startDate, endTime : range.endDate}
				}
				this.setState(state)
			}
		}
	}


	render() {
		const { ranges, format, linkedCalendars, calendars, firstDayOfWeek, minDate, maxDate, isInvalid,time,hour,minute,second,confirm } = this.props;
		const { range, link, timeRange } = this.state;

		return (
			<div className={dateRangePrefix}>
				{ ranges && (
					<PredefinedRanges
						ranges={ ranges }
						range={ range }
						onSelect={this.handlerRangeChange.bind(this)}
					/>
				)}

				{(()=>{
					const _calendars = [];
					// const len = 2 //Number(calendars)
					for (let i = 0; i < 2; i++) {
						_calendars.push(
							<Calendar
								key={i}
								offset={ i-1 }
								link={ linkedCalendars && link }
								linkCB={ this.handleLinkChange.bind(this) }
								timeDate={time && timeRange ? (i === 0 ? timeRange.startTime : timeRange.endTime) : null }
								range={ range }
								format={ format }
								firstDayOfWeek={ firstDayOfWeek }
								isInvalid={isInvalid}
								minDate={ minDate }
								maxDate={ maxDate }
								time={time}
								hour={hour}
								minute={minute}
								second={second}
								onTimeChange={ this.handlerTimeChange.bind(this,i) }
								onDateChange={ this.handlerDateChange.bind(this,i) }
								onConfirm={ confirm && i === 1 ? this.handlerConfirm.bind(this) : void(0)}
								confirm={confirm && i === 1}
								/>
						);
					}
					return _calendars;
				})()}
				{(confirm && !time) && (
					<div style={{padding : '4px 10px',textAlign : 'right'}}>
						<a href="#" className={`${dateRangePrefix}-confirm-btn`} onClick={this.handlerConfirm.bind(this)}>确认</a>
					</div>
				)}
			</div>
		);
	}
}

DateRange.defaultProps = {
	linkedCalendars : false
}

DateRange.propTypes = {
	format          : PropTypes.string,
	time : PropTypes.bool,
	firstDayOfWeek  : PropTypes.number,
	startDate       : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
	endDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
	minDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
	maxDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
	dateLimit       : PropTypes.func,
	ranges          : PropTypes.object,
	linkedCalendars : PropTypes.bool,
	onInit          : PropTypes.func,
	onChange        : PropTypes.func,
	isInvalid       : PropTypes.func,
}

export default DateRange;
