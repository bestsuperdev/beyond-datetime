'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _position = require('./utils/position');

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
<Trigger target={<DateRange time ranges={defaultRanges} />}  wrapStyle={}>
	<input type="text"/>
</Trigger>
*/
var mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs');
var assign = require('beyond-lib/lib/assign');

var Trigger = function (_Component) {
	(0, _inherits3['default'])(Trigger, _Component);

	function Trigger(props) {
		(0, _classCallCheck3['default'])(this, Trigger);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (Trigger.__proto__ || (0, _getPrototypeOf2['default'])(Trigger)).call(this, props));

		_this.state = {
			showTarget: false,
			targetWrapStyle: null
		};
		_this.innerClick = false;
		_this.wrap = null;
		_this.hasEvents = false;
		_this.handlerHideCalendar = _this.handlerHideCalendar.bind(_this);
		_this.handlerInnerClick = _this.handlerInnerClick.bind(_this);
		return _this;
	}

	(0, _createClass3['default'])(Trigger, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.wrap && !this.hasEvents) {
				this.hasEvents = true;
				this.wrap.addEventListener('click', this.handlerInnerClick);
				document.addEventListener('click', this.handlerHideCalendar);
			}
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			if (this.wrap && !nextState.showTarget) {
				this.hasEvents = false;
				this.wrap.removeEventListener('click', this.handlerInnerClick);
				document.removeEventListener('click', this.handlerHideCalendar);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.wrap && this.hasEvents) {
				this.wrap.removeEventListener('click', this.handlerInnerClick);
				document.removeEventListener('click', this.handlerHideCalendar);
			}
		}
	}, {
		key: 'handlerInnerClick',
		value: function handlerInnerClick() {
			this.innerClick = true;
		}
	}, {
		key: 'handlerHideCalendar',
		value: function handlerHideCalendar() {
			var self = this;
			setTimeout(function () {
				if (!self.innerClick) {
					self.setState({ showTarget: false });
				}
				self.innerClick = false;
			}, 50);
		}
	}, {
		key: 'handlerClick',
		value: function handlerClick(event) {
			var target = this.props.target;

			if (target) {
				var hasRanges = target.props.ranges && target.props.ranges.length > 0;
				var targetWrapStyle = (0, _position2['default'])(event.target, hasRanges);
				this.setState({ showTarget: true, targetWrapStyle: targetWrapStyle });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    wrapStyle = _props.wrapStyle,
			    className = _props.className,
			    type = _props.type;


			if (children) {
				var props = children.props;
				children = _react2['default'].cloneElement(children, { onClick: mergeFuncs(props.onClick, this.handlerClick.bind(this)) });
				var style = assign({ display: 'inline-block', position: 'relative' }, wrapStyle);
				return _react2['default'].createElement(type, { style: style, className: className }, children, this.renderTarget());
			}
		}
	}, {
		key: 'renderTarget',
		value: function renderTarget() {
			var _this2 = this;

			var _state = this.state,
			    showTarget = _state.showTarget,
			    targetWrapStyle = _state.targetWrapStyle;
			var target = this.props.target;

			if (showTarget && target) {
				var _target$props = target.props,
				    onConfirm = _target$props.onConfirm,
				    onChange = _target$props.onChange;

				var props = {};
				if (onConfirm) {
					props.confirm = true;
					props.onConfirm = mergeFuncs(onConfirm, this.handlerHideCalendar);
				} else if (!onConfirm && onChange) {
					props.onChange = mergeFuncs(onChange, this.handlerHideCalendar);
				}
				var style = assign({}, targetWrapStyle);
				return _react2['default'].createElement(
					'div',
					{ ref: function ref(wrap) {
							return _this2.wrap = wrap;
						}, style: style },
					_react2['default'].cloneElement(target, props)
				);
			}
		}
	}]);
	return Trigger;
}(_react.Component);

exports['default'] = Trigger;


Trigger.defaultProps = {
	type: 'span'
};