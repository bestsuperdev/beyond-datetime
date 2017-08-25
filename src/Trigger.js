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
		let {target} = this.props
		if(target){
			let hasRanges = target.props.ranges && target.props.ranges.length > 0
			let targetWrapStyle = getPosStyle(event.target,hasRanges)
			this.setState({showTarget : true, targetWrapStyle})
		}
	}

	render() {
		let {children,wrapStyle,className,type} = this.props
		
		if (children) {
			let props = children.props
			children = React.cloneElement(children,{onClick : mergeFuncs(props.onClick,this.handlerClick.bind(this)) })
			let style = assign({display : 'inline-block',position : 'relative'},wrapStyle)
			return React.createElement(type,{style,className},children,this.renderTarget())
		}
	}

	renderTarget(){
		let {showTarget,targetWrapStyle} = this.state
		let {target} = this.props
		if (showTarget && target) {
			let {onConfirm,onChange} = target.props
			let props = {}
			if(onConfirm){
				props.confirm = true
				props.onConfirm = mergeFuncs(onConfirm,this.handlerHideCalendar)
			}else if (!onConfirm && onChange) {
				props.onChange = mergeFuncs(onChange,this.handlerHideCalendar)
			}
			let style = assign({},targetWrapStyle)
			return (
				<div ref={(wrap)=> this.wrap = wrap} style={style}>
					{React.cloneElement(target,props)}
				</div>
			)
		}
	}
}

Trigger.defaultProps = {
	type : 'span'
}