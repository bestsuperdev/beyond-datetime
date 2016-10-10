const React = require('react')
// const moment = require('moment')

import {DateRange, Calendar, defaultRanges, Time,Trigger} from 'src/index'
const isInValidDate = (current)=> current.isBefore(new Date,'day')

class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			date : null,
			date2 : null,
			value : '',
			startDate : null,
			endDate : null
		}
	}

	handlerChange(date,value){
		// console.log(source)
		this.setState((state, props) => ({date,value}));
		// return false
	}

	handlerTriggerChange(date2){
		this.setState((state, props) => ({date2}));
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
		this.setState((state, props) => ({startDate,endDate}))
		// return false
	}

	render() {
		let {date,value,date2} = this.state
		return (
			<div className='app'>
				<Time />
				<div>{date ? date.format('YYYY.MM.DD HH:mm:ss') : ''}</div>
				<Calendar 
					// date={this.state.date}
					time
					// second={false}
					// format="HH:mm:ss"
					// timeFormat="HH:mm:ss"
					// isInvalid={isInValidDate} 
					onChange={this.handlerChange.bind(this)} 
					/>

				<div style={{height : '20px'}}></div>
	
				<div style={{height : '20px'}}>
					{this.state.startDate ? this.state.startDate.format('YYYY.MM.DD HH:mm:ss') : ''}
					{'-'}
					{this.state.endDate ? this.state.endDate.format('YYYY.MM.DD HH:mm:ss') : ''}
				</div>
				<DateRange 
					time 
					second={false}
					// startDate={this.state.startDate}
					// endDate={this.state.endDate}
					onChange={this.handlerRangeChange.bind(this)} 
					ranges={defaultRanges} />
				<Trigger calendar={<Calendar date={this.state.date2} time onChange={this.handlerTriggerChange.bind(this)} />}>
					<input type="text" value={date2 ? date2.format('YYYY.MM.DD HH:mm:ss') : '' }/>
				</Trigger>
			</div>
		)
	}
}

module.exports = App