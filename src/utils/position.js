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
export default function position(node, hasRanges) {
	if (!node || !node.getBoundingClientRect ) {
		return null
	}
	let style = {position : 'absolute',zIndex : 999}
	let {top,left} = node.getBoundingClientRect()
	let height = node.offsetHeight
	let {height : vHeight, width : vWidth } = getViiew()
	if ((top + height / 2) >= vHeight / 2 ) {
		style.bottom = height
	}else{
		style.top = height
	}


	if((left / vWidth) > 0.5 || (vWidth - left) < 280 ){
		style.right = 0
	}else{
		style.left = left <= 80 && hasRanges && vWidth >= 640 ? 80 : 0
	}
	return style
}