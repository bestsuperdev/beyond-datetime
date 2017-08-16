'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = position;
function getViiew() {
	var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	return { width: width, height: height };
}

/**
 * 
 * @param {Node} node 
 * @param {Boolean} hasRanges   
 */
function position(node, hasRanges) {
	if (!node || !node.getBoundingClientRect) {
		return null;
	}
	var style = { position: 'absolute', zIndex: 999 };
	var positions = node.getBoundingClientRect();
	var top = positions.top,
	    left = positions.left;

	var height = node.offsetHeight;
	var width = node.offsetWidth;

	var _getViiew = getViiew(),
	    vHeight = _getViiew.height,
	    vWidth = _getViiew.width;

	if (top + height / 2 >= vHeight / 2) {
		style.bottom = height;
	} else {
		style.top = height;
	}

	if (vWidth - (left + width) <= (hasRanges ? 650 : 565)) {
		style.right = 0;
	} else {
		style.left = left <= 80 && hasRanges ? 80 : 0;
	}
	return style;
}