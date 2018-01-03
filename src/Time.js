/*
filter(hour,time,second){
	return [[1,2,3,4,5,6,7,8,9,10,11,12],[],[]]
}

*/

import React, { Component } from 'react'
import {selectPrefix as prefix} from './utils/consts'
import {getInitTime} from './utils/DateHelper'
function toDoubleDigits(number){
	return number < 10 ? `0${number}` : number
}


export default class Time extends Component {

	constructor(props){
		super(props)
		let date = props.defaultDate instanceof Date ? new Date(props.defaultDate) : getInitTime()
		this.state = {date}
	}

	getDate(){
		let date = this.props.date || this.state.date
		return new Date(date)
	}

	handlerChange(type,event){
		let {onChange} = this.props
		let number = +event.target.value
		let date = this.getDate()
		date[type](number)
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
			onConfirm(this.getDate())
		}
	}

	renderSelector(type,value,subFilters){
		const options = []
		if(subFilters){
			subFilters.forEach((item)=> {
				options.push(<option key={item} value={item}>{toDoubleDigits(item)}</option>)
			})
		}else{
			const count = type === 'setHours' ? 24 : 60
			for(let i = 0; i < count; i++){
				options.push(<option key={i} value={i}>{toDoubleDigits(i)}</option>)
			}
		}
		return (
			<select disabled={this.props.disabled} value={value} onChange={this.handlerChange.bind(this,type)}>{options}</select>
		)
	}

	render() { 
		let {second : supportSecond,confirm,filter} = this.props
		const date = this.props.date || this.state.date
		const hour = date.getHours()
		const minute = date.getMinutes()
		const second = supportSecond ? date.getSeconds() : 0
		const filters = typeof filter === 'function' ? filter(hour,minute,second) : null
		return (
			<div className={prefix}>
				<div className={`${prefix}-cell`}>
					{this.renderSelector('setHours',hour,filters ? filters[0] : null)}
				</div>
				<div className={`${prefix}-mini-cell`}>:</div>
				<div className={`${prefix}-cell`}>
					{this.renderSelector('setMinutes',minute,filters ? filters[1] : null)}
				</div>
				{supportSecond && <div className={`${prefix}-mini-cell`}>:</div>}
				{supportSecond && (
					<div className={`${prefix}-cell`}>
						{this.renderSelector('setSeconds',second,filters ? filters[2] : null )}
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