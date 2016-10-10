/*
<Time format="HH:mm:ss" format="H:m:s" />
*/

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import parseInput from './utils/parseInput';
// import getPos from './utils/position';
import {timePrefix} from './utils/consts'

function toDoubleDigits(number){
	return number < 10 ? `0${number}` : number
}

class Time extends Component {

	constructor(props){
		super(props)
		let {date} = props
		date = parseInput(date,props.format)
		this.state = { date }
		this.mounted = false
	}

	componentWillReceiveProps(nextProps) {
		let {date,format} = nextProps
		if (date != null) {
			date = parseInput(date,format)
			this.setState((state, props) => ({date}))
		}
	}

	handlerChange(type,event){
		let date = this.state.date.clone()
		let number = +event.target.value
		date[`${type}`](number)
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

	render() { 
		const {hour,minute,second} = this.props
		// console.log(this.state)
		const {date } = this.state
		return (
			<div className={timePrefix}>
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
			</div>
		)
	}
}


Time.defaultProps = {
	onChange : function () {},
	hour : true,
	minute : true,
	second : true
}

export default Time