import React, { Component } from 'react'
import {isSameDate} from './utils/DateHelper'
import {predefinedRangesPrefix} from './utils/consts'
const classnames = require('classnames')



export default class PredefinedRanges extends Component {

	constructor(props, context) {
		super(props, context)
	}

	handleSelect(i, event) {
		event.preventDefault()
		let{ranges} = this.props
		let startDate = ranges[i].startDate(new Date)
		let endDate = ranges[i].endDate(new Date)
		this.props.onSelect({startDate,endDate})
	}

	renderRangeList() {
		let { ranges, startDate,endDate } = this.props
		ranges = ranges || []
		return ranges.map((range,i) => {
			let {startDate : startDateFunc, endDate : endDateFunc,name} = range
			const active = 
				isSameDate(startDateFunc(new Date),startDate) &&
				isSameDate(endDateFunc(new Date),endDate) &&
				'active'

			return (
				<a 	href='#'
					key={i+''}
					className={classnames(`${predefinedRangesPrefix}-item`,active)}
					onClick={this.handleSelect.bind(this,i)}>
					{name}
				</a>
			)
		})
	}

	render() {
		return (
			<div className={predefinedRangesPrefix} style={this.props.style}>
				{this.renderRangeList()}
			</div>
		);
	}
}