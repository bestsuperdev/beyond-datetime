function getViiew(){
	let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
	return {width,height}
}

function getScrollLeft(){
	return Math.max(document.body.scrollLeft,document.documentElement.scrollLeft)
}

function getScrollTop(){
	return Math.max(document.body.scrollTop,document.documentElement.scrollTop)
}

const TimeHeight = 35
const CalendarHeight = 322
const CalendarWidth = 280
const DateRangeWidth = CalendarWidth * 2
const DateRangeHeight = 354

/**
 * 
 * @param {Node} node 
 * @param {Boolean} hasRanges   
 */
export default function position(node, target) {
	if (!node || !node.getBoundingClientRect || !target) {
		return null
	}
	let type = target.type.defaultProps.__type
	let style = {position : 'absolute',zIndex : 999}
	let {top,left} = node.getBoundingClientRect()
	let scrollTop = getScrollTop()
	let scrollLeft = getScrollLeft()
	let height = node.offsetHeight
	let width = node.offsetWidth
	let {height : vHeight, width : vWidth } = getViiew()
	let targetWidth = type === 'DateRange' ? DateRangeWidth : CalendarWidth
	let targetHeight = type === 'Time' ? TimeHeight : (target.props.time ? DateRangeHeight : CalendarHeight ) 

	if ((top + height / 2) >= vHeight / 2 ) {
		style.top = (top - targetHeight + scrollTop) + 'px'
	}else{
		style.top = (top + height + scrollTop) + 'px'
	}

	if(targetWidth + left > vWidth){
		style.left = (left + width - targetWidth + scrollLeft) + 'px'
	}else{
		let hasRanges = target.props.ranges && target.props.ranges.length > 0	
		style.left = ((left <= 80 && hasRanges ? 80 : 0 ) + left + scrollLeft) + 'px' 
		//   left + scrollLeft
	}

	return style
}