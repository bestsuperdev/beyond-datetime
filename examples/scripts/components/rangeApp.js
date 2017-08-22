const React = require('react')
import {DateRange, Calendar, defaultRanges, Time,Trigger} from 'src/index'
const isInValidDate = (current)=> current.isBefore(new Date,'day')
class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			startDate : null,
			endDate : null
		}
		this.log = this.log.bind(this)
	}

	handlerRangeChange(range){
		this.log(range)
		this.setState(range)
		return false
	}



	log(v){
		console.log(`${v.startDate}~${v.endDate}`)
		this.logText.innerHTML = `${v.startDate}~${v.endDate}`
	}

	render() {
		let {startDate,endDate} = this.state
		return (
			<div className='app' style={{padding : '0',margin : '0 auto',width : '80%'}}>
				<div>
					<p>普通日期范围选择</p>
					<div className="log" ref={(log)=> this.logText = log }></div>
					<DateRange  onChange={this.log} />
					<div style={{height : '20px'}}></div>
					<DateRange time  onChange={this.log} />
					<div style={{height : '20px'}}></div>
					<DateRange time second={false} onChange={this.log} />
					<div style={{height : '20px'}}></div>
					<DateRange ranges={defaultRanges} time second={false} onChange={this.log} />
				</div>
				<div style={{height : '20px'}}></div>
				<div>
					<p>受控日期范围选择</p>
					<DateRange 
						time 
						confirm 
						ranges={defaultRanges} 
						startDate={startDate} 
						endDate={endDate} 
						onChange={this.handlerRangeChange.bind(this)}
						onConfirm={this.handlerRangeChange.bind(this)} />
					<div style={{height : '20px'}}></div>
					<DateRange ranges={defaultRanges} startDate={startDate} endDate={endDate} time onChange={this.handlerRangeChange.bind(this)} />
					<div style={{height : '20px'}}></div>
					<DateRange startDate={startDate} endDate={endDate} time onChange={this.handlerRangeChange.bind(this)} />
					<div style={{height : '20px'}}></div>
					<DateRange startDate={startDate} endDate={endDate} time second={false} onChange={this.handlerRangeChange.bind(this)} />
					<div style={{height : '20px'}}></div>
					<DateRange startDate={startDate} endDate={endDate}  onChange={this.handlerRangeChange.bind(this)} />
				</div>
			
			</div>
		)
	}
}

module.exports = App
