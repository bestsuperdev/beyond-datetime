/*
<Time format="HH:mm:ss" format="H:m:s" />
*/

import React, { Component } from 'react'
import parseInput from './utils/parseInput';
import {timePrefix,timeFormat} from './utils/consts'

function toDoubleDigits(number){
	return number < 10 ? `0${number}` : number
}


export default class Time extends Component {

	constructor(props){
		super(props)
		let {date,format} = props
		date = parseInput(date,format,true,true)
		this.state = { date }
	}

	componentWillReceiveProps(nextProps) {
		let {date,format} = nextProps
		if (date != null) {
			date = parseInput(date,format,true,true)
			this.setState({date})
		}
	}

	handlerChange(type,event){
		let {second,onChange} = this.props
		let date = this.state.date.clone()
		let number = +event.target.value
		date[`${type}`](number)
		if (!second) {
			date.second(0)
		}
		let result
		if(typeof onChange === 'function'){
			result = onChange(date)
		}
		if (result !== false) {
			this.setState({date})
		}
	}

	renderSelector(type,count,value){
		const options = []
		for(let i = 0; i < count; i++){
			options.push(<option key={i} value={i}>{toDoubleDigits(i)}</option>)
		}
		return (
			<select value={value} onChange={this.handlerChange.bind(this,type)}>{options}</select>
		)
	}

	handlerConfirm(){
		let {onConfirm} = this.props
		if(typeof onConfirm === 'function' ){
			let {date} = this.state
			onConfirm(date)
		}
	}

	render() { 
		const {second,confirm} = this.props
		const {date } = this.state
		return (
			<div className={timePrefix}>
				<div className={`${timePrefix}-cell`}>
					{this.renderSelector('hour',24,date.hour())}
				</div>
				<div className={`${timePrefix}-mini-cell`}>:</div>
				<div className={`${timePrefix}-cell`}>
					{this.renderSelector('minute',60,date.minute())}
				</div>
				{second && <div className={`${timePrefix}-mini-cell`}>:</div>}
				{second && (
					<div className={`${timePrefix}-cell`}>
						{this.renderSelector('second',60,date.second())}
					</div>
				)}
				{confirm && (
					<div className={`${timePrefix}-cell`}>
						<button type="button" onClick={this.handlerConfirm.bind(this)} className={`${timePrefix}-confirm-btn`}>确定</button>
					</div>
				)}
			</div>
		)
	}
}


Time.defaultProps = {
	second : true,
	confirm : true,
	format : timeFormat
}
