import React, { Component } from 'react'
import {selectPrefix as prefix} from './utils/consts'
import * as DateHelper  from './utils/DateHelper'
// import {getInitTime} from './utils/DateHelper'

function toDoubleDigits(number){
	return number < 10 ? `0${number}` : number
}

const {isDate,cloneDate} = DateHelper

export default class MCalendar extends Component {

	constructor(props){
		super(props)
		let date = isDate(props.defaultDate) ? cloneDate(props.defaultDate) : new Date
		this.state = {date}
	}

    /**
     * @return {Date}
     */
	getDate(){
		let date = this.props.date || this.state.date
		return isDate(date) ? cloneDate(date) : new Date
	}

	handlerChange(type,event){
		let {onChange} = this.props
		let value = +event.target.value
        let date = this.getDate()
        if(type === 'year'){
            date = DateHelper.setYear(date,value)
        }else if(type === 'month'){
            date = DateHelper.setMonth(date,value)
        }else if(type === 'date'){
            date.setDate(value)
        }

		let result
		if(typeof onChange === 'function'){
			result = onChange(date)
		}
		if (result !== false) {
			this.setState({date : cloneDate(date)})
		}
	}

	handlerConfirm(){
		let {onConfirm} = this.props
		if(typeof onConfirm === 'function' ){
			onConfirm(this.getDate())
		}
    }


	render() { 
        let {confirm,disabled} = this.props
        let date = this.getDate()
        let {startYear,endYear} = DateHelper.getYearRange()
        let years = []
        let months = []
		let dates = []
		const daysCountInMonth = DateHelper.daysInMonth(date)
        
        
        for(let i = startYear; i <= endYear; i++){
            years.push(<option key={i} value={i}>{i}</option>)
        }
        
        for(let i = 0; i < 12; i++  ){
            months.push(<option key={i} value={i}>{toDoubleDigits(i+1)}</option>)
		}
		
		for(let i = 1; i <= daysCountInMonth; i++ ){
			dates.push(<option key={i} value={i}>{toDoubleDigits(i)}</option>)
		}
        
		return (
			<div className={prefix}>
				<div className={`${prefix}-cell`}>
					<select onChange={this.handlerChange.bind(this,'year')} disabled={disabled} value={date.getFullYear()}>
						{years}
					</select>
				</div>
                <div className={`${prefix}-cell`}>
					<select onChange={this.handlerChange.bind(this,'month')} disabled={disabled} value={date.getMonth()}>
						{months}
					</select>
				</div>
                <div className={`${prefix}-cell`}>
                    <select onChange={this.handlerChange.bind(this,'date')} disabled={disabled} value={date.getDate()}>
                        {dates}
                    </select>
                </div>
				{confirm && (
					<div className={`${prefix}-cell`}>
						<button type="button" onClick={this.handlerConfirm.bind(this)} className={`${prefix}-confirm-btn`}>确定</button>
					</div>
				)}
			</div>
		)
	}
}


MCalendar.defaultProps = {
	disabled : false
}