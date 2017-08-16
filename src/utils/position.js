function getViiew(){
	let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
	return {width,height}
}

/**
 * 
 * @param {Node} node 
 * @param {Boolean} hasRanges   
 */
export default function position(node,hasRanges) {
	if (!node || !node.getBoundingClientRect ) {
		return null
	}
	let style = {position : 'absolute',zIndex : 999}
	let positions = node.getBoundingClientRect()
	let {top,left} = positions
	let height = node.offsetHeight
	let width = node.offsetWidth
	let {height : vHeight, width : vWidth } = getViiew()
	if ((top + height / 2) >= vHeight / 2 ) {
		style.bottom = height
	}else{
		style.top = height
	}

	if( vWidth - ( left + width) <= (hasRanges ? 650 : 565) ){
		style.right = 0
	}else{
		style.left = left <= 80 && hasRanges ? 80 : 0
	}
	return style
}