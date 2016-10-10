'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = position;
function position(node) {
	if (!node || !node.getBoundingClientRect) {
		return 'top';
	}
	var result = void 0;
	// let height = window.innerHeight
	var positions = node.getBoundingClientRect();
	var top = positions.top;
	var height = positions.height;

	if (top + height / 2 >= window.innerHeight / 2) {
		return 'bottom';
	} else {
		return 'top';
	}
}