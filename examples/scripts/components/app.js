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
					<p>普通时间选择</p>
					<Time second={false} onChange={this.log} />
					<Time  onChange={this.log} />
					<Time  confirm onChange={this.log} />
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
					<Calendar yearLowerLimit={1991} yearUpperLimit={2040} isInvalid={isInValidDate} time second={false}  onChange={this.log} />
					<Calendar time  onChange={this.log} />
					<Calendar  onChange={this.log} />
				</div>
				<div style={{height : '20px'}}></div>
				<div >
					<p>受控日期选择</p>

					<p>{date && date.format ? date.format(formatStr) : ''}</p>

					<Calendar yearLowerLimit={1991} yearUpperLimit={2040} date={date} onChange={this.handlerChange.bind(this,'date')} />
					<Calendar time second={false} date={date} onChange={this.handlerChange.bind(this,'date')} />
					<Calendar time date={date} onChange={this.handlerChange.bind(this,'date')} />
				</div>

				<div style={{height : '20px'}}></div>
	
				

				<div>
					<p>普通日期范围选择</p>
					<DateRange yearLowerLimit={1991} yearUpperLimit={2040} time  onChange={this.log} />
					<DateRange time second={false} onChange={this.log} />
					<DateRange  onChange={this.log} />
				</div>
				<div style={{height : '20px'}}></div>
				<div>
					<p>受控日期范围选择</p>
					<p>
						{this.state.startDate ? this.state.startDate.format('YYYY.MM.DD HH:mm:ss') : ''}
						{'-'}
						{this.state.endDate ? this.state.endDate.format('YYYY.MM.DD HH:mm:ss') : ''}
					</p>
					<DateRange yearLowerLimit={1991} yearUpperLimit={2040} ranges={defaultRanges} startDate={this.state.startDate} endDate={this.state.endDate} time onChange={this.handlerRangeChange.bind(this)} />
					<DateRange startDate={this.state.startDate} endDate={this.state.endDate} time onChange={this.handlerRangeChange.bind(this)} />
					<DateRange startDate={this.state.startDate} endDate={this.state.endDate} time second={false} onChange={this.handlerRangeChange.bind(this)} />
					<DateRange startDate={this.state.startDate} endDate={this.state.endDate}  onChange={this.handlerRangeChange.bind(this)} />


				</div>
				<div style={{height : '20px'}}></div>
				<div>
					<Trigger target={<Calendar yearLowerLimit={1991} yearUpperLimit={2040} isInvalid={isInValidDate} date={this.state.date1 || ''}  onConfirm={this.handlerTriggerChange1.bind(this)} />}>
						<input type="text" value={date1 && date1.format ? date1.format('YYYY.MM.DD') : date1 } onChange={this.handlerChange.bind(this,'date1')} />
					</Trigger>
					<Trigger target={<Calendar yearLowerLimit={1991} yearUpperLimit={2040} date={this.state.date2 || ''}  onConfirm={this.handlerTriggerChange.bind(this)} />}>
						<input type="text" value={date2 ? date2.format('YYYY.MM.DD') : '' }/>
					</Trigger>
					<Trigger target={<Calendar yearLowerLimit={1991} yearUpperLimit={2040} time date={this.state.date3}  onConfirm={this.handlerTriggerChange3.bind(this)} />}>
						<input type="text" value={date3 ? date3.format('YYYY.MM.DD HH:mm:ss') : '' }/>
					</Trigger>
					<Trigger target={<Time yearLowerLimit={1991} yearUpperLimit={2040} date={this.state.time2} onConfirm={this.handlerChange.bind(this,'time2')} />}>
						<input type="text" value={this.state.time2 ? this.state.time2.format('HH:mm:ss') : '' }/>
					</Trigger>
					<Trigger target={<DateRange yearLowerLimit={1991} yearUpperLimit={2040} time startDate={this.state.startDate} endDate={this.state.endDate} onConfirm={this.handlerRangeChange.bind(this)} />}>
						<input type="text" value={(this.state.startDate && this.state.endDate) ? `${this.state.startDate.format(formatStr)}-${this.state.endDate.format(formatStr)}` : '' }/>
					</Trigger>									
					<Trigger target={<DateRange yearLowerLimit={1991} yearUpperLimit={2040} ranges={defaultRanges} startDate={this.state.startDate2} endDate={this.state.endDate2} onConfirm={this.handlerRangeChange2.bind(this)} />}>
						<input type="text" value={(this.state.startDate2 && this.state.endDate2) ? `${this.state.startDate2.format(formatStr)}-${this.state.endDate2.format(formatStr)}` : '' }/>
					</Trigger>
				</div>
				<div style={{height : '20px'}}></div>
				<div>
					<h3>时间</h3>
					<Trigger target={<Time date={this.state.time2} onConfirm={this.handlerChange.bind(this,'time2')} />}>
						<input type="text" value={this.state.time2 ? this.state.time2.format('HH:mm:ss') : '' }/>
					</Trigger>
					<Trigger target={<Time date={this.state.time3} onConfirm={this.handlerChange.bind(this,'time3')} />}>
						<input type="text" value={this.state.time3 && this.state.time3.format ? this.state.time3.format('HH:mm:ss') : this.state.time3 }/>
					</Trigger>
				</div>
			</div>
		)
	}
}

module.exports = App
