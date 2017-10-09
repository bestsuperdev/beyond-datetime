/*
<Trigger target={<DateRange time ranges={defaultRanges} />}  wrapStyle={}>
	<input type="text"/>
</Trigger>
*/
import React, { Component } from 'react'
import ReactDOM	 from 'react-dom'
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
		
		this.hideTarget = this.hideTarget.bind(this)
		this.handlerInnerClick = this.handlerInnerClick.bind(this)
	}

	componentDidMount(){
		document.addEventListener('click',this.hideTarget)
	}

	componentWillUnmount() {
		document.removeEventListener('click',this.hideTarget)
		if(this.wrap){
			ReactDOM.unmountComponentAtNode(this.wrap)
		}
	}

	handlerInnerClick(){
		this.innerClick = true
	}

	hideTarget(e){
		if(e && e.button == 2){
			return
		}
		let self = this
		setTimeout(()=>{
			if (!self.innerClick && this.wrap) {
				ReactDOM.unmountComponentAtNode(this.wrap)
			}
			self.innerClick = false
		}, 50)
	}

	handlerClick(event){
		let {target} = this.props
		if(target){
			this.handlerInnerClick()
			let targetWrapStyle = getPosStyle(event.target,target)
			this.showTarget(targetWrapStyle)
		}
	}

	render() {
		let {children} = this.props
		if (children) {
			let props = children.props
			return React.cloneElement(children,{onClick : mergeFuncs(props.onClick,this.handlerClick.bind(this)) })
		}
	}

	showTarget(targetWrapStyle){
		if(!this.wrap){
			this.wrap = document.createElement('div')
			document.body.appendChild(this.wrap)
		}else{
			ReactDOM.unmountComponentAtNode(this.wrap)
		}
		let {target} = this.props
		if(target){
			assign(this.wrap.style,targetWrapStyle,this.props.wrapStyle)
			let {onConfirm,onChange} = target.props
			let props = {}
			if(onConfirm){
				props.confirm = true
				props.onConfirm = mergeFuncs(onConfirm,this.hideTarget)
			}else if (!onConfirm && onChange) {
				props.onChange = mergeFuncs(onChange,this.hideTarget)
			}
			ReactDOM.render(<div onClick={this.handlerInnerClick}>{React.cloneElement(target,props)}</div>,this.wrap)
		}
	}
}

Trigger.defaultProps = {
	type : 'span'
}