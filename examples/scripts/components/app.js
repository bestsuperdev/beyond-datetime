const React = require('react')
// const moment = require('moment')

import {DateRange, Calendar, defaultRanges, Time,Trigger} from 'src/index'
const isInValidDate = (current)=> current.isBefore(new Date,'day')
const formatStr = 'YYYY.MM.DD HH:mm:ss'
class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			time1 : new Date,
			date : new Date,
			date2 : null,
			date3 : null,
			value : '',
			startDate : null,
			endDate : null
		}
	}

	handlerTriggerChange(date2){
		this.setState((state, props) => ({date2}));
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

	handlerChange(field,value){
		this.setState((state, props) => ({[field] : value}))
		console.log(value)
		return false
	}

	log(v){
		console.log(v)
	}

	render() {
		let {date,value,date2,date3,time1} = this.state
		return (
			<div className='app'>
				<div>
					<p>普通时间选择</p>
					<Time second={false} onChange={this.log} />
					<Time  onChange={this.log} />
				</div>
				<div>
					<p>受控时间选择</p>
					<p>{time1 && time1.format ? time1.format("HH:mm:ss") : ""}</p>
					<Time second={false} date={this.state.time1} onChange={this.handlerChange.bind(this,'time1')} />
					<Time date={this.state.time1} onChange={this.handlerChange.bind(this,'time1')} />
				</div>
				<div style={{height : '20px'}}></div>
				<div >
					<p>普通日期选择</p>

				

					<Calendar  onChange={this.log} />
					<Calendar time second={false}  onChange={this.log} />
					<Calendar time  onChange={this.log} />
				</div>
				<div style={{height : '20px'}}></div>
				<div >
					<p>受控日期选择</p>

					<p>{date && date.format ? date.format(formatStr) : ''}</p>

					<Calendar date={date} onChange={this.handlerChange.bind(this,'date')} />
					<Calendar time second={false} date={date} onChange={this.handlerChange.bind(this,'date')} />
					<Calendar time date={date} onChange={this.handlerChange.bind(this,'date')} />
				</div>

				<div style={{height : '20px'}}></div>
	
				

				<div>
					<p>普通日期范围选择</p>
					<DateRange  onChange={this.log} />
					<DateRange time  onChange={this.log} />
					<DateRange time second={false} onChange={this.log} />
				</div>
				<div style={{height : '20px'}}></div>
				<div>
					<p>受控日期范围选择</p>
					<p>
						{this.state.startDate ? this.state.startDate.format('YYYY.MM.DD HH:mm:ss') : ''}
						{'-'}
						{this.state.endDate ? this.state.endDate.format('YYYY.MM.DD HH:mm:ss') : ''}
					</p>

					<DateRange startDate={this.state.startDate} endDate={this.state.endDate}  onChange={this.handlerRangeChange.bind(this)} />
					<DateRange startDate={this.state.startDate} endDate={this.state.endDate} time onChange={this.handlerRangeChange.bind(this)} />
					<DateRange startDate={this.state.startDate} endDate={this.state.endDate} time onChange={this.handlerRangeChange.bind(this)} />
					<DateRange startDate={this.state.startDate} endDate={this.state.endDate} time second={false} onChange={this.handlerRangeChange.bind(this)} />
				</div>
				<div style={{height : '20px'}}></div>
				<div>
					<Trigger calendar={<Calendar date={this.state.date2}  onChange={this.handlerTriggerChange.bind(this)} />}>
						<input type="text" value={date2 ? date2.format('YYYY.MM.DD') : '' }/>
					</Trigger>
					<Trigger calendar={<Calendar time date={this.state.date3}  onConfirm={this.handlerTriggerChange3.bind(this)} />}>
						<input type="text" value={date3 ? date3.format('YYYY.MM.DD HH:mm:ss') : '' }/>
					</Trigger>
				</div>
			</div>
		)
	}
}

module.exports = App