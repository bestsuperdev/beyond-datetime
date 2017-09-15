import React, { Component } from 'react'
import classnames from 'classnames'

export default class DayCell extends Component {

	constructor(props) {
		super(props)
	}

	handlerSelect() {
		let {isInvalid,date,onSelect} = this.props
		if(!isInvalid && typeof onSelect === 'function'){
			onSelect(new Date(date))
		}
	}

	handlerMouseEnter(){
		let {isInvalid,date,onHover} = this.props
		if(!isInvalid && typeof onHover === 'function'){
			onHover(new Date(date))
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
		const {date,isInvalid} = this.props
		if(date){
			let props = {
				className : this.getClassNames()
			}
			if(!isInvalid){
				props.onClick = this.handlerSelect.bind(this)
				props.onMouseEnter = this.handlerMouseEnter.bind(this)
			}
			return (
				<span {...props}>{date.getDate()}</span>
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