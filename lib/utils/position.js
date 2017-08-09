'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = position;
function position(node) {
	if (!node || !node.getBoundingClientRect) {
		return 'top';
	}
	var positions = node.getBoundingClientRect();
	var top = positions.top,
	    height = positions.height;

	if (top + height / 2 >= window.innerHeight / 2) {
		return 'bottom';
	} else {
		return 'top';
	}
}