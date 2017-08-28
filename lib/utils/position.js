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

	var _node$getBoundingClie = node.getBoundingClientRect(),
	    top = _node$getBoundingClie.top,
	    left = _node$getBoundingClie.left;

	var height = node.offsetHeight;

	var _getViiew = getViiew(),
	    vHeight = _getViiew.height,
	    vWidth = _getViiew.width;

	if (top + height / 2 >= vHeight / 2) {
		style.bottom = height;
	} else {
		style.top = height;
	}

	if (left / vWidth > 0.5 || vWidth - left < 280) {
		style.right = 0;
	} else {
		style.left = left <= 80 && hasRanges && vWidth >= 640 ? 80 : 0;
	}
	return style;
}