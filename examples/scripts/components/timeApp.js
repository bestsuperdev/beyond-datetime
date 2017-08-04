const React = require('react')
import {Time,Trigger} from 'src/index'
const formatStr = 'HH:mm:ss'
class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			time1 : new Date,
			time2 : null,
			time3  : new Date
		}
		this.log = this.log.bind(this)
	}


	handlerChange(field,value){
		this.setState({[field] : value})
		this.log(value)
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
		let {time1,time2,time3} = this.state
		return (
			<div className='app' style={{margin : '0 100px'}}>
				<div className="log" ref={(log)=> this.logText = log }></div>
				<div>
					<p>普通时间选择</p>
					<Time second={false} onChange={this.log} /> 
					<Time defaultDate={new Date} onChange={this.log} />
					<Time confirm onConfirm={this.log} />
					<Time disabled />
				</div>
				<div>
					<p>受控时间选择</p>
					<Time date={time1} second={false} onChange={this.handlerChange.bind(this,'time1')} />
					<Time date={time2} onChange={this.handlerChange.bind(this,'time2')} />
					<Time date={time3}  />
				</div>
			</div>
		)
	}
}

module.exports = App
