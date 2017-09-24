const React = require('react')
import {Time,Trigger,Calendar,DateRange,defaultRanges} from 'src/index'

class TriggerApp extends React.Component {

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

    rangeToString(range,time){
		if(range && range.defaultStartDate){

			if(!time){
				return `${range.defaultStartDate.toLocaleDateString()}~${range.defaultEndDate.toLocaleDateString()}`
			}else{
				return `${range.defaultStartDate.toLocaleString()}~${range.defaultEndDate.toLocaleString()}`
			}
		}
		return ''
    }

	render() {
		let {date1,date2,date3,date4,date5,range} = this.state
		return (
			<div className='app'>
				<div className="log" ref={(log)=> this.logText = log }></div>
				<div>
					<p>input 触发</p>
					<div>
						<Trigger wrapStyle={{display : 'block'}} target={<DateRange {...range} time ranges={defaultRanges} onConfirm={this.handlerRangeChange.bind(this)} />}>
							<input style={{width : '100%'}} type="text" value={range && range.defaultStartDate ? this.rangeToString(range,true) : ''}/>
						</Trigger>
						<Trigger target={<Time defaultDate={date1} onConfirm={this.handlerChange.bind(this,'date1')} />}>
							<input type="text" value={date1 ? date1.toLocaleTimeString() : ''}/>
						</Trigger>
						
                        <Trigger target={<Calendar defaultDate={date2} onChange={this.handlerChange.bind(this,'date2')} />}>
							<input type="text" value={date2 ? date2.toLocaleDateString() : ''}/>
						</Trigger>
						<Trigger target={<Calendar defaultDate={date2} time onConfirm={this.handlerChange.bind(this,'date2')} />}>
							<input type="text" value={date2 ? date2.toLocaleString() : ''}/>
						</Trigger>

						<Trigger target={<Calendar defaultDate={date2}  onConfirm={this.handlerChange.bind(this,'date2')} />}>
							<input type="text" value={date2 ? date2.toLocaleDateString() : ''}/>
						</Trigger>
		
						
						<Trigger target={<DateRange {...range} onConfirm={this.handlerRangeChange.bind(this)} />}>
							<input style={{width : 150}} type="text" value={range ? this.rangeToString(range) : ''}/>
						</Trigger>

						
						<Trigger type="div" className="trigger"  target={<DateRange {...range} ranges={defaultRanges} onConfirm={this.handlerRangeChange.bind(this)} />}>
							<input style={{width : 150}} type="text" value={range ? this.rangeToString(range) : ''}/>
						</Trigger>

					
					</div>
				</div>
			</div>
		)
	}
}

module.exports = TriggerApp
