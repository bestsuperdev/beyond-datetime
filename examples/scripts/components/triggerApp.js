const React = require('react')
import {Time,Trigger,Calendar,DateRange,defaultRanges} from 'src/index'

class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			date1 : null,
			date2 : new Date,
			date3  : new Date,
			date4  : new Date,
            date5  : new Date,
            range : null //{defaultStartDate : new Date, defaultEndDate : new Date}
		}
		// this.log = this.log.bind(this)
	}


	handlerChange(field,value){
		this.setState({[field] : value})
    }
    
    handlerRangeChange(range){
        let {startDate : defaultStartDate, endDate : defaultEndDate} = range
        this.setState({range : {defaultStartDate,defaultEndDate}})
    }

    rangeToString(range){
        return `${range.defaultStartDate.toLocaleDateString()}~${range.defaultEndDate.toLocaleDateString()}`
    }

	render() {
		let {date1,date2,date3,date4,date5,range} = this.state
		return (
			<div className='app'>
				<div className="log" ref={(log)=> this.logText = log }></div>
				<div>
					<p>input 触发</p>
					<div>
						<Trigger target={<DateRange {...range} ranges={defaultRanges} onConfirm={this.handlerRangeChange.bind(this)} />}>
							<input style={{width : 150}} type="text" value={range ? this.rangeToString(range) : ''}/>
						</Trigger>
						<Trigger target={<Time defaultDate={date1} onConfirm={this.handlerChange.bind(this,'date1')} />}>
							<input type="text" value={date1 ? date1.toLocaleTimeString() : ''}/>
                        </Trigger>
                        <Trigger target={<Calendar defaultDate={date2} onChange={this.handlerChange.bind(this,'date2')} />}>
							<input type="text" value={date2 ? date2.toLocaleDateString() : ''}/>
						</Trigger>
						<Trigger target={<Calendar defaultDate={date2} hideOnConfirm hideOnChange={false} onConfirm={this.handlerChange.bind(this,'date2')} />}>
							<input type="text" value={date2 ? date2.toLocaleDateString() : ''}/>
						</Trigger>
                        <Trigger target={<DateRange {...range} onConfirm={this.handlerRangeChange.bind(this)} />}>
							<input style={{width : 150}} type="text" value={range ? this.rangeToString(range) : ''}/>
						</Trigger>
						<Trigger target={<DateRange {...range} ranges={defaultRanges} onConfirm={this.handlerRangeChange.bind(this)} />}>
							<input style={{width : 150}} type="text" value={range ? this.rangeToString(range) : ''}/>
						</Trigger>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = App
