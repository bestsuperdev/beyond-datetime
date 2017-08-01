import React, { Component } from 'react'
// import parseInput from './utils/parseInput.js'
import {predefinedRangesPrefix} from './utils/consts'
import moment from 'moment'
const classnames = require('classnames')

function parseRange(fn,asyncTimeDate){
	let date = fn(moment())
	// async time
	if(asyncTimeDate){
		date.hours(asyncTimeDate.hours())
		date.minutes(asyncTimeDate.minutes())
		date.seconds(asyncTimeDate.seconds())
	}
	return date
}


export default class PredefinedRanges extends Component {

	constructor(props, context) {
		super(props, context)
	}

	handleSelect(name, event) {
		event.preventDefault()
		const {ranges,range} = this.props
		const rangeFunc = ranges[name]
		let startDate = parseRange(rangeFunc.startDate,range && range.startDate)
		let endDate = parseRange(rangeFunc.endDate,range && range.endDate)
		this.props.onSelect({startDate,endDate})
	}

	renderRangeList() {
		const { ranges, range } = this.props

		return Object.keys(ranges).map(name => {
			const active = (
				parseRange(ranges[name].startDate,range.startDate).isSame(range.startDate,'day') &&
				parseRange(ranges[name].endDate,range.endDate).isSame(range.endDate,'day')
			) ? 'active' : null

			return (
				<a 	href='#'
					key={'range-' + name}
					className={classnames(`${predefinedRangesPrefix}-item`,active)}
					onClick={this.handleSelect.bind(this, name)}>
					{name}
				</a>
			)
		})
	}

	render() {
		let {extraClassName} = this.props
		return (
			<div className={classnames(predefinedRangesPrefix,extraClassName)} style={this.props.style}>
				{ this.renderRangeList() }
			</div>
		);
	}
}