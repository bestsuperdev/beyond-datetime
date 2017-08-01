import React, { Component } from 'react'
import classnames from 'classnames'

export default class DayCell extends Component {

	constructor(props) {
		super(props)
	}

	handlerSelect() {
		if(!this.props.isInvalid){
			this.props.onSelect(this.props.dayMoment.clone())
		}
	}

	getClassNames() {
		const { className } = this.props;
		if(className){
			const {isSelected, isInRange, isPassive, isInvalid, isToday } = this.props
			return classnames({
				[className] : true,
				[`${className}-selected`] : !isInvalid && isSelected,
				[`${className}-passive`] : isPassive,
				[`${className}-invalid`] : isInvalid,
				[`${className}-inrange`] : isInRange,
				[`${className}-today`] : isToday
			})
		}
	}

	render() {
		const {dayMoment} = this.props
		if(dayMoment && dayMoment.date){
			return (
				<span onClick={this.handlerSelect.bind(this)} className={this.getClassNames()}>
					{dayMoment.date()}
				</span>
			)
		}
	}
}

// DayCell.propTypes = {
//   dayMoment   : PropTypes.object.isRequired,
//   onSelect    : PropTypes.func,
//   isSelected  : PropTypes.bool,
//   isInRange   : PropTypes.bool,
//   isPassive   : PropTypes.bool,
//   classNames  : PropTypes.string
// }