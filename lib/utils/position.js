'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = position;
function getViewSize() {
	var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	return { width: width, height: height };
}

function getScrollLeft() {
	return Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
}

function getScrollTop() {
	return Math.max(document.body.scrollTop, document.documentElement.scrollTop);
}

var getTargetSize = function getTargetSize(target) {
	var width = void 0,
	    height = void 0;
	var type = target.type.defaultProps.__type;
	var _target$props = target.props,
	    second = _target$props.second,
	    confirm = _target$props.confirm,
	    time = _target$props.time;

	if (type === 'Time') {
		height = 35;
		width = 136;
		if (second) {
			width += 71;
		}
		if (confirm) {
			width += 32;
		}
	} else {
		height = time ? 354 : 322;
		width = type === 'DateRange' ? 560 : 280;
	}
	return { width: width, height: height };
};

/**
 * 
 * @param {Node} node 
 * @param {Boolean} hasRanges   
 */
function position(node, target) {
	if (!node || !node.getBoundingClientRect || !target) {
		return null;
	}
	var style = { position: 'absolute', zIndex: 999 };

	var _node$getBoundingClie = node.getBoundingClientRect(),
	    top = _node$getBoundingClie.top,
	    left = _node$getBoundingClie.left;

	var scrollTop = getScrollTop();
	var scrollLeft = getScrollLeft();
	var height = node.offsetHeight;
	var width = node.offsetWidth;

	var _getViewSize = getViewSize(),
	    vHeight = _getViewSize.height,
	    vWidth = _getViewSize.width;

	var _getTargetSize = getTargetSize(target),
	    targetWidth = _getTargetSize.width,
	    targetHeight = _getTargetSize.height;

	if (top + height / 2 >= vHeight / 2) {
		style.top = top - targetHeight + scrollTop + 'px';
	} else {
		style.top = top + height + scrollTop + 'px';
	}

	if (targetWidth + left > vWidth) {
		style.left = left + width - targetWidth + scrollLeft + 'px';
	} else {
		var hasRanges = target.props.ranges && target.props.ranges.length > 0;
		style.left = (left <= 80 && hasRanges ? 80 : 0) + left + scrollLeft + 'px';
	}

	return style;
}