const React = require('react')
import {DateRange, Calendar, defaultRanges, Time,Trigger} from 'src/index'
const isInValidDate = (current)=> current.isBefore(new Date,'day')
const formatStr = 'YYYY.MM.DD HH:mm:ss'
class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			time1 : new Date,
			time3 : 'dd',
			date : new Date,
			date1 : 'xxx',
			date2 : null,
			date3 : null,
			value : '',
			startDate : null,
			endDate : null,
			startDate2 : null,
			endDate2 : null
		}
	}

	handlerTriggerChange(date2){
		this.setState((state, props) => ({date2}));
		return false
	}

	handlerTriggerChange1(date1){
		if (date1 != null) {
			this.setState((state, props) => ({date1}))

		}
		return false
	}

	handlerTriggerChange3(date3){
		this.setState((state, props) => ({date3}));
		return false
	}

	handlerAddOneDay(){
		let {date} = this.state
		if (date) {

			date = date.clone()//.day(+1)
			date.date(date.date()+1)
			this.setState((state, props) => ({date}));
		}
	}

	handlerRangeChange(range){
		let {startDate,endDate} = range
		console.log(startDate,endDate)
		this.setState((state, props) => ({startDate,endDate}))
		return false
	}

	handlerRangeChange2(range){
		let {startDate,endDate} = range
		console.log(startDate,endDate)
		this.setState((state, props) => ({startDate2 : startDate,endDate2 : endDate}))
		return false
	}

	handlerChange(field,value){
		// console.log(arguments)
		if (value.target) {
			value = value.target.value
		}
		this.setState((state, props) => ({[field] : value}))
		console.log(value)
		return false
	}

	log(v){
		if (v && (v.startDate || v.endDate) ) {
			console.log(v.startDate && v.startDate.format(formatStr),v.endDate && v.endDate.format(formatStr))
		}else if(v.format) {
			console.log(v.format(formatStr))
		}
	}

	render() {
		let {date1,date,value,date2,date3,time1} = this.state
		return (
			<div className='app'>
				<div>
					<p>普通日期范围选择</p>
					<DateRange yearLowerLimit={1991} yearUpperLimit={2040} time  onChange={this.log} />
					<div style={{height : '20px'}}></div>
					<DateRange time second={false} onChange={this.log} />
					<div style={{height : '20px'}}></div>
					<DateRange  onChange={this.log} />
				</div>
				<div style={{height : '20px'}}></div>
				<div>
					<p>受控日期范围选择</p>
			
					<DateRange yearLowerLimit={1991} yearUpperLimit={2040} ranges={defaultRanges} startDate={this.state.startDate} endDate={this.state.endDate} time onChange={this.handlerRangeChange.bind(this)} />
					<div style={{height : '20px'}}></div>
					<DateRange startDate={this.state.startDate} endDate={this.state.endDate} time onChange={this.handlerRangeChange.bind(this)} />
					<div style={{height : '20px'}}></div>
					<DateRange startDate={this.state.startDate} endDate={this.state.endDate} time second={false} onChange={this.handlerRangeChange.bind(this)} />
					<div style={{height : '20px'}}></div>
					<DateRange startDate={this.state.startDate} endDate={this.state.endDate}  onChange={this.handlerRangeChange.bind(this)} />
				</div>
			
			</div>
		)
	}
}

module.exports = App
