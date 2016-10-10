export default function position(node) {
	if (!node || !node.getBoundingClientRect ) {
		return 'top'
	}
	let result
	// let height = window.innerHeight
	let positions = node.getBoundingClientRect()
	let {top,height} = positions
	if ((top + height / 2) >= window.innerHeight / 2 ) {
		return 'bottom'
	}else{
		return 'top'
	}
}