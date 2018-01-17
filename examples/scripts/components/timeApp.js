const React = require('react')
import {Time,Trigger} from 'src/index'
// const formatStr = 'HH:mm:ss'

const filter = ()=> [[3,6,9,12,15,18,21],[0,15,30,45,59,60],[0,15,30,45,59,60]]
const filter2 = filter()
class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			time1 : new Date,
			time2 : null,
			time3  : new Date,
			time4  : new Date,
			time5  : new Date,
			index : 1
		}
		this.log = this.log.bind(this)
	}


	handlerChange(field,value){
		let {index} = this.state
		index++
		this.setState({[field] : value,index})
		this.log(value)
		return false
	}

	log(date){
		this.logText.innerHTML = date
	}

	render() {
		let {time1,time2,time3,time4,index} = this.state
		return (
			<div className='app' style={{margin : '0 100px'}}>
				<div className="log" ref={(log)=> this.logText = log }></div>
				<div>
					<p>普通</p>
					<Time second={false} onChange={this.log} /> 
					<Time defaultDate={new Date} onChange={this.log} />
					<Time confirm onConfirm={this.log} />
					<Time disabled />
				</div>
				<div>
					<p>受控</p>
					<Time date={time1} second={false} onChange={this.handlerChange.bind(this,'time1')} />
					<Time date={time2} onChange={this.handlerChange.bind(this,'time2')} />
					时间固定 <Time date={time3}  />
				</div>
				
				
				<div>
					<p>input 触发</p>
					<div>
						<Trigger target={<Time defaultDate={time4} onConfirm={this.handlerChange.bind(this,'time4')} />}>
							<input type="text" value={time4 ? time4.toLocaleString() : ''}/>
						</Trigger>
					</div>
				</div>
				<div>
					<p> 过滤 </p>
					<Time date={time1} filter={filter} second={false} onChange={this.handlerChange.bind(this,'time1')} />
					<Time date={time2} filter={index % 2 === 0 ? [[3]] : [[6]]} 
						confirm
						onChange={this.handlerChange.bind(this,'time2')}
						onConfirm={this.handlerChange.bind(this,'time2')} />
					<Time date={time3} filter={filter} onChange={this.log}  />
					<Time filter={index % 2 === 0 ? [[3]] : [[6]]} confirm onConfirm={this.log}  />
				</div>
			</div>
		)
	}
}

module.exports = App
