/*
filter(hour,time,second){
	return [[1,2,3,4,5,6,7,8,9,10,11,12],[],[]]
}

*/

import React, { Component } from 'react'
import {selectPrefix as prefix} from './utils/consts'
import {getInitTime, isDate, cloneDate, isSameTime} from './utils/DateHelper'
function toDoubleDigits(number){
	return number < 10 ? `0${number}` : number
}


export default class Time extends Component {

	constructor(props){
		super(props)
		let date = isDate(props.defaultDate) ? cloneDate(props.defaultDate) : getInitTime()
		this.handlerChange = this.handlerChange.bind(this)
		this.state = {date}
		this.hour = null
		this.minute = null
		this.second = null
	}

	getTime(){
		let date = cloneDate(this.props.date || this.state.date)
		date.setHours(this.hour ? +this.hour.value : 0)
		date.setMinutes(this.minute ? +this.minute.value : 0)
		date.setSeconds(this.second ? +this.second.value : 0)
		return date
	}

	handlerChange(){
		let {onChange} = this.props
		let date = this.getTime()
		let result
		if(typeof onChange === 'function'){
			result = onChange(date)
		}
		if (result !== false) {
			this.setState({date : new Date(date)})
		}
	}

	handlerConfirm(){
		let {onConfirm} = this.props
		if(typeof onConfirm === 'function' ){
			onConfirm(this.getTime())
		}
	}

	renderSelector(count,subFilters){
		let options
		if(subFilters){
			options = subFilters
					.filter((item)=> item < count )
					.map((item)=> <option key={item} value={item}>{toDoubleDigits(item)}</option> )
		}else{
			options = []
			for(let i = 0; i < count; i++){
				options.push(<option key={i} value={i}>{toDoubleDigits(i)}</option>)
			}
		}
		return options
	}

	render() { 
		let {second : supportSecond,confirm,filter,disabled} = this.props
		const date = this.props.date || this.state.date
		const hour = date.getHours()
		const minute = date.getMinutes()
		const second = supportSecond ? date.getSeconds() : 0
		filter = typeof filter === 'function' ? filter(new Date(date)) : filter
		filter = Array.isArray(filter) ? filter : []
		return (
			<div className={prefix}>
				<div className={`${prefix}-cell`}>
					<select ref={(select)=> this.hour = select } disabled={disabled} value={hour} onChange={this.handlerChange}>
						{this.renderSelector(24,filter[0])}
					</select>
				</div>
				<div className={`${prefix}-mini-cell`}>:</div>
				<div className={`${prefix}-cell`}>
					<select ref={(select)=> this.minute = select } disabled={disabled} value={minute} onChange={this.handlerChange}>
						{this.renderSelector(60,filter[1])}
					</select>
				</div>
				{supportSecond && <div className={`${prefix}-mini-cell`}>:</div>}
				{supportSecond && (
					<div className={`${prefix}-cell`}>
						<select ref={(select)=> this.second = select } disabled={disabled} value={second} onChange={this.handlerChange}>
							{this.renderSelector(60,filter[2])}
						</select>
					</div>
				)}
				{confirm && (
					<div className={`${prefix}-cell`}>
						<button type="button" onClick={this.handlerConfirm.bind(this)} className={`${prefix}-confirm-btn`}>确定</button>
					</div>
				)}
			</div>
		)
	}
}


Time.defaultProps = {
	second : true,
	disabled : false,
	__type : 'Time'
	// hideOnConfirm : true
}