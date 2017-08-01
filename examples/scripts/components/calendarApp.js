const React = require('react')
import {DateRange, Calendar, defaultRanges, Time,Trigger} from 'src/index'
const isInValidDate = (current)=> current.isBefore(new Date,'day')
const formatStr = 'YYYY.MM.DD HH:mm:ss'
class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			date1 : 'xxx',
			date2 : null,
			date3 : null
        }
        this.log = this.log.bind(this)
	}

	handlerChange(field,value){

		this.setState({[field] : value})
		return false
	}

	log(date){
		if(date && date.format){
			this.logText.innerHTML = date.format(formatStr)
		}else{
			this.logText.innerHTML = date
		}
	}

	render() {
        let {date1,date2,date3} = this.state
        console.log(this.state)
		return (
			<div className='app'  style={{margin : '0 100px'}}>
                <div className="log" ref={(log)=> this.logText = log }></div>
				<div >
					<p>普通日期选择</p>
					<Calendar onChange={this.log} />
					<Calendar time  onChange={this.log} />
					<Calendar isInvalid={isInValidDate} time second={false}  onChange={this.log} />
					<Calendar time second={false} confirm  onConfirm={this.log} />
				</div>
				<div style={{height : '20px'}}></div>
				<div >
					<p>受控日期选择</p>

					

					<Calendar yearLowerLimit={1991} yearUpperLimit={2040} date={date1} onChange={this.handlerChange.bind(this,'date1')} />
					<Calendar time second={false} date={date2} onChange={this.handlerChange.bind(this,'date2')} />
					<Calendar time date={new Date} confirm onConfirm={this.handlerChange.bind(this,'date3')} />
				</div>

			
			</div>
		)
	}
}

module.exports = App
