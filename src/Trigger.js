/*
<Trigger target={<DateRange time ranges={defaultRanges} />}  wrapStyle={}>
	<input type="text"/>
</Trigger>
*/
import React, { Component } from 'react'
import getPosStyle from './utils/position'
const mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs')
const assign = require('beyond-lib/lib/assign')
export default class Trigger extends Component {

	constructor(props){
		super(props)
		this.state = {
			showTarget : false,
			targetWrapStyle : null
		}
		this.innerClick = false
		this.wrap = null
		this.hasEvents = false
		this.handlerHideCalendar = this.handlerHideCalendar.bind(this)
		this.handlerInnerClick = this.handlerInnerClick.bind(this)
	}

	componentDidUpdate(){
		if(this.wrap && !this.hasEvents){
			this.hasEvents = true
			this.wrap.addEventListener('click',this.handlerInnerClick)
			document.addEventListener('click',this.handlerHideCalendar)
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if(this.wrap && !nextState.showTarget){
			this.hasEvents = false
			this.wrap.removeEventListener('click',this.handlerInnerClick)
			document.removeEventListener('click',this.handlerHideCalendar)
		}
	}
	

	componentWillUnmount() {
		if(this.wrap && this.hasEvents){
			this.wrap.removeEventListener('click',this.handlerInnerClick)
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
				self.setState({showTarget : false})
			}
			self.innerClick = false
		}, 50)
	}

	handlerClick(event){
		let targetWrapStyle = getPosStyle(event.target,this.props.target.props.ranges && this.props.target.props.ranges.length > 0)
		this.setState({showTarget : true, targetWrapStyle})
	}

	render() {
		let {children,wrapStyle} = this.props
		
		if (children) {
			let props = children.props
			children = React.cloneElement(children,{onClick : mergeFuncs(props.onClick,this.handlerClick.bind(this)) })
			return (
				<span style={assign({display : 'inline-block',position : 'relative'},wrapStyle)}>
					{children}
					{this.renderTarget()}
				</span>
			)
		}
	}

	renderTarget(){
		let {showTarget,targetWrapStyle} = this.state
		let {target,wrapStyle} = this.props
		if (showTarget && target) {
			let {onConfirm,onChange} = target.props
			let {hideOnConfirm,hideOnChange} = target.props
			let props = {}
			if(hideOnConfirm){
				props.confirm = true
				props.onConfirm = mergeFuncs(onConfirm,this.handlerHideCalendar)
			}
			if (hideOnChange) {
				props.onChange = mergeFuncs(onChange,this.handlerHideCalendar)
			}
			let style = assign({},targetWrapStyle,wrapStyle)
			return (
				<div ref={(wrap)=> this.wrap = wrap} style={style}>
					{React.cloneElement(target,props)}
				</div>
			)
		}
	}
}