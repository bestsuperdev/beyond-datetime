import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames'
import parseInput,{parseTimeInput} from './utils/parseInput.js';
import Calendar from './Calendar.js';
import PredefinedRanges from './PredefinedRanges.js';
import {dateRangePrefix} from './utils/consts'
var $ = require('jquery')
class DateRange extends Component {

	constructor(props, context) {
		super(props, context)

		const { format, linkedCalendars, time } = props
		const startDate = parseInput(props.startDate, format,true)
		const startTime = time ? parseTimeInput(startDate) : null

		const endDate   = parseInput(props.endDate, format,true)
		const endTime = time ? parseTimeInput(endDate) : null

		this.state = {
			timeRange : (time && startTime && endTime) ? ({startTime,endTime}) : null,
			range     : { startDate, endDate },
			link      : linkedCalendars && endDate,
			leftPosition :-1
		}

		this.step = 0;
		// this.styles = getTheme(theme);
		this.leftPosition = -1
		this.rightPosition = -1
		this.box = null
		this.boxWidth = 0
		this.isRelative = false
	}
	resize(){
		this.leftPosition = $(this.box).offset().left//box.getBoundingClientRect().left
		// console.log(this.leftPosition)
		this.boxWidth = this.box.clientWidth
		this.setState({leftPosition:this.leftPosition})		
	}
	componentDidMount() {
		// debugger
		// this.resize()
		let box = ReactDom.findDOMNode(this)
		this.box = box
		this.boxWidth = box.clientWidth
		this.leftPosition = $(box).offset().left//box.getBoundingClientRect().left
		// console.log(this.leftPosition)
		this.setState({leftPosition:this.leftPosition})			
		window.addEventListener("resize",this.resize.bind(this))
		const { onInit } = this.props
		const {range} = this.state
		onInit && onInit(range)
	}
	componentWillUnmount(){
		window.removeEventListener("resize",this.resize.bind(this))
	}
	// componentDidUpdate(){
	// 	this.leftPosition = $(this.box).offset().left//box.getBoundingClientRect().left
	// 	// console.log(this.leftPosition)
	// 	this.boxWidth = this.box.clientWidth
	// 	this.setState({leftPosition:this.leftPosition})	
	// }
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

	// setCalendarsWidth(wrapWidth){
	// 	let widthCalendars
	// 	let countCaldendars = (Math.floor((wrapWidth)/281))
	// 	if(countCaldendars == 0){
	// 		countCaldendars = 1
			
	// 	}else if(countCaldendars > 2) {
	// 		countCaldendars = 2
	// 	}
		
	// 	return {width:281*countCaldendars + "px",count:countCaldendars}
	// 	// return  (280*(Math.floor((wrapWidth)/280) != 0 ? Math.floor((wrapWidth)/280):1))+"px"
		
	// 	// return {leftCalendars:widthCalendars,leftCalendars:leftCalendars}

	// }
	// setCalendarsLeft(wrapWidth){
	// 	return (this.props.ranges &&(Math.floor((wrapWidth)/281) != 0 ) &&'-2px') || "0px"
	// }
	render() {
		const { ranges, format, linkedCalendars,  firstDayOfWeek, minDate, maxDate, isInvalid,time,hour,minute,second,confirm,yearLowerLimit,yearUpperLimit } = this.props
		const { range, link, timeRange } = this.state
		// console.log(this.leftPosition)
		let tabsWidth = 81
		// let stylePredefinedRanges = {position:"relative",top:"0px",left:"0px",width:tabsWidth+"px",borderBottom:"1px solid rgba(0, 0, 0, 0.15)",
		// 							// float:"left"
		// 							paddingRight:"0px",
		// 							paddingBottom:"0px"									
		// 						}
		let predefinedRanges
		// let widthCalendars 
		// let leftCalendars
		// let styleCalendarsWrap = { display:"inline-block",
		// 							boxShadow: "0 0px 4px rgba(0, 0, 0, 0.2)",
		// 							borderRadius: "2px",
									
		// 							border: "1px solid rgba(0, 0, 0, 0.15)",
		// 							width:widthCalendars,
		// 							position:'relative',
		// 							left:leftCalendars,
		// 							borderTop:"1px solid rgba(0, 0, 0, 0.15)",

		// 							// top:(Math.floor((this.boxWidth-tabsWidth)/284) == 0 &&'-2px') ||"0px"
		// 						}			 
		// console.log(this.leftPosition)
		if(this.leftPosition > 0 && this.leftPosition < tabsWidth ){//148 this.leftPosition
			// styleCalendarsWrap.width = this.setCalendarsWidth(this.boxWidth - tabsWidth).width
			// styleCalendarsWrap.left = this.setCalendarsLeft(this.boxWidth - tabsWidth)
			// console.log(styleCalendarsWrap)
			// // let styleWidth
			// if(this.setCalendarsWidth(this.boxWidth).count == 1){
			// 	stylePredefinedRanges.width = styleCalendarsWrap.width
			// 	styleCalendarsWrap.left ="0px"
			// 	styleCalendarsWrap.borderTop = "none"
			// 	stylePredefinedRanges.paddingBottom ="10px"
			// 	stylePredefinedRanges.paddingRight = "10px"
			// 	stylePredefinedRanges.borderBottom ="none"
			// }
			this.isRelative = true
			predefinedRanges=(ranges && (
					<PredefinedRanges
						// style={stylePredefinedRanges}
						extraClassName={this.isRelative &&`rdr-predefined-ranges-relative`}
						ranges={ ranges }
						range={ range }
						onSelect={this.handlerRangeChange.bind(this)}
					/>
			))
			
		}else{	
			// styleCalendarsWrap.width = this.setCalendarsWidth(this.boxWidth).width
			// // this.setCalendarsWidth(this.boxWidth)
			// styleCalendarsWrap.left = this.setCalendarsLeft(this.boxWidth)
			this.isRelative = false
			predefinedRanges=(ranges && (
					<PredefinedRanges
						ranges={ ranges }
						range={ range }
						onSelect={this.handlerRangeChange.bind(this)}
					/>
			))			
		}
		// console.log(predefinedRanges)
		let _calendars = []
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
					yearLowerLimit={yearLowerLimit}
					yearUpperLimit={yearUpperLimit}
					/>
			)
		}	

// style={styleCalendarsWrap}
		return (
			<div className={classnames(dateRangePrefix,this.isRelative && "rdr-date-range-width-both",!this.isRelative && "rdr-date-range-width" )}>
				{predefinedRanges}
				{(<div className={`rdr-calendar-list`}>
					{_calendars}
					{(confirm && !time) && (
						<div style={{padding : '4px 10px',textAlign : 'right',float:"right"}}>
							<a href="#" className={`${dateRangePrefix}-confirm-btn`} onClick={this.handlerConfirm.bind(this)}>确认</a>
						</div>
					)}
				</div>)}
			</div>
		);
	}
}

DateRange.defaultProps = {
	linkedCalendars : false,
	yearLowerLimit : -1,
	yearUpperLimit : -1
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
