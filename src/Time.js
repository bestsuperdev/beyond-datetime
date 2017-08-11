import React, { Component } from 'react'
import {timePrefix as prefix} from './utils/consts'
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

	renderSelector(type,count,value){
		const options = []
		for(let i = 0; i < count; i++){
			options.push(<option key={i} value={i}>{toDoubleDigits(i)}</option>)
		}
		return (
			<select disabled={this.props.disabled} value={value} onChange={this.handlerChange.bind(this,type)}>{options}</select>
		)
	}

	render() { 
		let {second,confirm} = this.props
		const date = this.props.date || this.state.date
		return (
			<div className={prefix}>
				<div className={`${prefix}-cell`}>
					{this.renderSelector('setHours',24,date.getHours())}
				</div>
				<div className={`${prefix}-mini-cell`}>:</div>
				<div className={`${prefix}-cell`}>
					{this.renderSelector('setMinutes',60,date.getMinutes())}
				</div>
				{second && <div className={`${prefix}-mini-cell`}>:</div>}
				{second && (
					<div className={`${prefix}-cell`}>
						{this.renderSelector('setSeconds',60,date.getSeconds())}
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
	init : true,
	disabled : false
}