/*
<Trigger calendar={<DateRange time ranges={defaultRanges} />}  wrapStyle={}>
	<input type="text"/>
</Trigger>
*/
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import Calendar from './Calendar.js'
import getPos from './utils/position'
// import parseInput from './utils/parseInput.js'
// import {dateFormat,timeFormat} from './utils/consts'
const mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs')
const assign = require('beyond-lib/lib/assign')
class Trigger extends Component {

	constructor(props){
		super(props)
		this.state = {
			showCalendar : false,
			position : null,
			inputHeight : 30
		}
		this.innerClick = false
		this.handlerHideCalendar = this.handlerHideCalendar.bind(this)
		this.handlerInnerClick = this.handlerInnerClick.bind(this)
	}

	componentDidMount() {
		let wrap = ReactDOM.findDOMNode(this)
		if (wrap) {
			wrap.addEventListener('click',this.handlerInnerClick)
			document.addEventListener('click',this.handlerHideCalendar)
		}
	}

	componentWillUnmount() {
		let wrap = ReactDOM.findDOMNode(this)
		if (wrap) {
			wrap.removeEventListener('click',this.handlerInnerClick)
			document.removeEventListener('click',this.handlerHideCalendar)
		}
	}

	handlerInnerClick(){
		this.innerClick = true
	}

	handlerHideCalendar(){
		let self = this
		setTimeout(()=>{
			if (!self.innerClick) {
				self.setState((state, props) => ({showCalendar : false}))
			}
			self.innerClick = false
		}, 100);
	}

	handlerClick(event){
		let showCalendar = true
		let target = event.target
		let position = getPos(target)
		let inputHeight = target.offsetHeight
		this.setState((state, props) => ({showCalendar,position,inputHeight}))
	}

	render() {
		let {children,wrapStyle} = this.props
		
		if (children) {
			let props = children.props
			children = React.cloneElement(children,{onClick : mergeFuncs(props.onClick,this.handlerClick.bind(this)) })
			return (
				<span style={assign({display : 'inline-block',position : 'relative'},wrapStyle)}>
					{children}
					{this.renderCalendar()}
				</span>
			)
		}
	}

	renderCalendar(){
		let {showCalendar,position,inputHeight} = this.state
		let {target,wrapStyle} = this.props
		if (showCalendar && target) {
			let {confirm,onConfirm,onChange} = target.props
			if (confirm == null) {
				confirm = true
			}
			let calendarWrapStyle = {}
			if (position === 'top') {
				calendarWrapStyle.top = inputHeight
			}else if( position === 'bottom'){
				calendarWrapStyle.bottom = inputHeight
			}
			let props = {confirm, onConfirm : mergeFuncs(onConfirm,this.handlerHideCalendar) }
			if (!confirm) {
				props.onChange = mergeFuncs(onChange,this.handlerHideCalendar)
			}
			return (
				<div style={assign({position : 'absolute',left : '0',zIndex : 999},calendarWrapStyle,wrapStyle)}>
					{React.cloneElement(target,props)}
				</div>
			)
		}
	}
}

Trigger.defaultProps = {
	onChange : function () {}
}


export default Trigger