'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _position = require('./utils/position');

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <Trigger calendar={<DateRange time ranges={defaultRanges} />}  wrapStyle={}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	<input type="text"/>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               </Trigger>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// import Calendar from './Calendar.js'


// import parseInput from './utils/parseInput.js'
// import {dateFormat,timeFormat} from './utils/consts'
var mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs');
var assign = require('beyond-lib/lib/assign');

var Trigger = function (_Component) {
	_inherits(Trigger, _Component);

	function Trigger(props) {
		_classCallCheck(this, Trigger);

		var _this = _possibleConstructorReturn(this, (Trigger.__proto__ || Object.getPrototypeOf(Trigger)).call(this, props));

		_this.state = {
			showCalendar: false,
			position: null,
			inputHeight: 30
		};
		_this.innerClick = false;
		_this.handlerHideCalendar = _this.handlerHideCalendar.bind(_this);
		_this.handlerInnerClick = _this.handlerInnerClick.bind(_this);
		return _this;
	}

	_createClass(Trigger, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var wrap = _reactDom2['default'].findDOMNode(this);
			if (wrap) {
				wrap.addEventListener('click', this.handlerInnerClick);
				document.addEventListener('click', this.handlerHideCalendar);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var wrap = _reactDom2['default'].findDOMNode(this);
			if (wrap) {
				wrap.removeEventListener('click', this.handlerInnerClick);
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
					self.setState(function (state, props) {
						return { showCalendar: false };
					});
				}
				self.innerClick = false;
			}, 100);
		}
	}, {
		key: 'handlerClick',
		value: function handlerClick(event) {
			var showCalendar = true;
			var target = event.target;
			var position = (0, _position2['default'])(target);
			var inputHeight = target.offsetHeight;
			this.setState(function (state, props) {
				return { showCalendar: showCalendar, position: position, inputHeight: inputHeight };
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    wrapStyle = _props.wrapStyle;


			if (children) {
				var props = children.props;
				children = _react2['default'].cloneElement(children, { onClick: mergeFuncs(props.onClick, this.handlerClick.bind(this)) });
				return _react2['default'].createElement(
					'span',
					{ style: assign({ display: 'inline-block', position: 'relative' }, wrapStyle) },
					children,
					this.renderCalendar()
				);
			}
		}
	}, {
		key: 'renderCalendar',
		value: function renderCalendar() {
			var _state = this.state,
			    showCalendar = _state.showCalendar,
			    position = _state.position,
			    inputHeight = _state.inputHeight;
			var _props2 = this.props,
			    target = _props2.target,
			    wrapStyle = _props2.wrapStyle;

			if (showCalendar && target) {
				var _target$props = target.props,
				    confirm = _target$props.confirm,
				    onConfirm = _target$props.onConfirm,
				    onChange = _target$props.onChange;

				if (confirm == null) {
					confirm = true;
				}
				var calendarWrapStyle = {};
				if (position === 'top') {
					calendarWrapStyle.top = inputHeight;
				} else if (position === 'bottom') {
					calendarWrapStyle.bottom = inputHeight;
				}
				var props = { confirm: confirm, onConfirm: mergeFuncs(onConfirm, this.handlerHideCalendar) };
				if (!confirm) {
					props.onChange = mergeFuncs(onChange, this.handlerHideCalendar);
				}
				return _react2['default'].createElement(
					'div',
					{ style: assign({ position: 'absolute', left: '0', zIndex: 999 }, calendarWrapStyle, wrapStyle) },
					_react2['default'].cloneElement(target, props)
				);
			}
		}
	}]);

	return Trigger;
}(_react.Component);

Trigger.defaultProps = {
	onChange: function onChange() {}
};

exports['default'] = Trigger;