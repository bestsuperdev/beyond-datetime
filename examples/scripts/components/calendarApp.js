const React = require('react')
import { Calendar } from 'src/index'
const invalidDates = (dayCell) => {
	let date = new Date
	date.setHours(0)
	date.setMinutes(0)
	date.setSeconds(0)
	date.setMilliseconds(0)
	return +dayCell < +date
}

const filter = () => [[3, 6, 9, 12, 15, 18, 21], [15, 30, 45, 60], [15, 30, 45, 60]]
const filter2 = [[3, 6, 9, 12, 15, 18, 21], [15, 30, 45, 60], [15, 30, 45, 60]]
class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			date1: 'xxx',
			date2: null,
			date3: null,
			date4: null
		}
		this.log = this.log.bind(this)
		this.log2 = this.log2.bind(this)
	}

	handlerChange(field, value) {

		this.setState({ [field]: value })
		this.log2(value)
		return false
	}

	log(date) {
		this.logText.innerHTML = date
	}

	log2(date) {
		this.logText2.innerHTML = date
	}

	render() {
		let { date1, date2, date3, date4 } = this.state
		console.log(this.state)
		return (
			<div className='app' style={{ margin: '0 100px' }}>
				<div>
					<p>普通日期选择</p>
					<div className="log" ref={(log) => this.logText = log}></div>
					<div style={{ display: 'inline-block' }}><Calendar onChange={this.log} /></div>
					<div style={{ display: 'inline-block' }}><Calendar defaultDate={new Date} onChange={this.log} /></div>
					<div style={{ display: 'inline-block' }}><Calendar time onChange={this.log} /></div>
					<div style={{ display: 'inline-block' }}>
						<Calendar
							timeFilter={filter}
							invalidDates={invalidDates}
							time
							second={false}
							onChange={this.log} />
					</div>
					<div style={{ display: 'inline-block' }}><Calendar time second={false} confirm cancel clear onConfirm={this.log} /></div>
				</div>
				<div style={{ height: '20px' }}></div>
				<div >
					<p>受控日期选择</p>
					<div className="log" ref={(log) => this.logText2 = log}></div>
					<div style={{ display: 'inline-block' }}><Calendar date={date1} onChange={this.handlerChange.bind(this, 'date1')} /></div>
					<div style={{ display: 'inline-block' }}><Calendar time second={false} date={date2} onChange={this.handlerChange.bind(this, 'date2')} /></div>

					<div style={{ display: 'inline-block' }}>
						<Calendar date={date3} time timeFilter={filter2} confirm cancel clear onConfirm={this.handlerChange.bind(this, 'date3')} />
					</div>
					<br />
					<div style={{ display: 'inline-block' }}>
						<Calendar date={date4} time cancel clear onChange={this.handlerChange.bind(this, 'date4')} />
					</div>
					<div style={{ display: 'inline-block' }}>
						<Calendar date={date4} timeFilter={filter2} time cancel clear onChange={this.handlerChange.bind(this, 'date4')} />
					</div>
				</div>
				<div style={{ height: '20px' }}></div>
				<div >
					<p>语言（只支持英文）</p>
					<div className="log" ref={(log) => this.logText2 = log}></div>
					<div style={{ display: 'inline-block' }}><Calendar language="en" date={date1} onChange={this.handlerChange.bind(this, 'date1')} /></div>
					<div style={{ display: 'inline-block' }}><Calendar language="en" time second={false} date={date2} onChange={this.handlerChange.bind(this, 'date2')} /></div>

					<div style={{ display: 'inline-block' }}>
						<Calendar language="en" date={date3} time timeFilter={filter2} confirm cancel clear onConfirm={this.handlerChange.bind(this, 'date3')} />
					</div>
					<br />
					<div style={{ display: 'inline-block' }}>
						<Calendar language="en" date={date4} time cancel clear onChange={this.handlerChange.bind(this, 'date4')} />
					</div>
					<div style={{ display: 'inline-block' }}>
						<Calendar language="en" date={date4} timeFilter={filter2} time cancel clear onChange={this.handlerChange.bind(this, 'date4')} />
					</div>
				</div>
				
			</div>
		)
	}
}

module.exports = App
