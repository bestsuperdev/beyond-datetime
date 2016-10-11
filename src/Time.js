/*
<Time format="HH:mm:ss" format="H:m:s" />
*/

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import moment from 'moment'
import {parseTimeInput} from './utils/parseInput';
// import getPos from './utils/position';
import {timePrefix,timeFormat} from './utils/consts'

function toDoubleDigits(number){
	return number < 10 ? `0${number}` : number
}

class Time extends Component {

	constructor(props){
		super(props)
		let {date,format} = props
		date = parseTimeInput(date,format)
		this.state = { date }
		this.mounted = false
	}

	componentWillReceiveProps(nextProps) {
		let {date,format} = nextProps
		if (date != null) {
			date = parseTimeInput(date,format)
			this.setState((state, props) => ({date}))
		}
	}

	handlerChange(type,event){
		let {second} = this.props
		let date = this.state.date.clone()
		let number = +event.target.value
		date[`${type}`](number)
		if (!second) {
			date.second(0)
		}
		let result = this.props.onChange(date, 'time')
		if (result !== false) {
			this.setState((state, props) => ({date}))
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

	handlerConfirm(event){
		event.preventDefault()
		let {onConfirm} = this.props
		let {date} = this.state
		onConfirm && onConfirm(date)
	}

	getWidth(){
		const {second,confirm} = this.props
		let width = 133
		if (second) {
			width += 70
		}
		if (confirm) {
			width += 63
		}
		return width
	}


	render() { 
		const {hour,minute,second,confirm} = this.props
		// console.log(this.state)
		const {date } = this.state
		return (
			<div className={timePrefix} style={{width : this.getWidth()}}>
				{hour && (
					<div className={`${timePrefix}-cell`}>
						{this.renderSelector('hour',24,date.hour())}
					</div>
				)}
				{minute && <div className={`${timePrefix}-mini-cell`}>:</div>}
				{minute && (
					<div className={`${timePrefix}-cell`}>
						{this.renderSelector('minute',60,date.minute())}
					</div>
				)}
				{second && <div className={`${timePrefix}-mini-cell`}>:</div>}
				{second && (
					<div className={`${timePrefix}-cell`}>
						{this.renderSelector('second',60,date.second())}
					</div>
				)}
				{confirm && (
					<div className={`${timePrefix}-cell`}>
						<a href="#" onClick={this.handlerConfirm.bind(this)} className={`${timePrefix}-confirm-btn`}>确定</a>
					</div>
				)}
			</div>
		)
	}
}


Time.defaultProps = {
	onChange : function () {},
	hour : true,
	minute : true,
	second : true,
	format : timeFormat
}

export default Time