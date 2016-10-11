'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Calendar = require('./Calendar.js');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _position = require('./utils/position');

var _position2 = _interopRequireDefault(_position);

var _parseInput = require('./utils/parseInput.js');

var _parseInput2 = _interopRequireDefault(_parseInput);

var _consts = require('./utils/consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <Trigger calendar={<DateRange time ranges={defaultRanges} />}  wrapStyle={}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	<input type="text"/>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               </Trigger>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


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
			if (this.refs.wrap) {
				this.refs.wrap.addEventListener('click', this.handlerInnerClick);
				document.addEventListener('click', this.handlerHideCalendar);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.refs.wrap) {
				this.refs.wrap.removeEventListener('click', this.handlerInnerClick);
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
			var _props = this.props;
			var children = _props.children;
			var calendar = _props.calendar;
			var wrapStyle = _props.wrapStyle; //.children

			var _state = this.state;
			var showCalendar = _state.showCalendar;
			var value = _state.value;


			if (children) {
				var props = children.props;
				children = _react2['default'].cloneElement(children, { onClick: mergeFuncs(props.onClick, this.handlerClick.bind(this)) });
				return _react2['default'].createElement(
					'span',
					{ ref: 'wrap', style: assign({ display: 'inline-block', position: 'relative' }, wrapStyle) },
					children,
					this.renderCalendar()
				);
			}
		}
	}, {
		key: 'renderCalendar',
		value: function renderCalendar() {
			var _state2 = this.state;
			var showCalendar = _state2.showCalendar;
			var position = _state2.position;
			var inputHeight = _state2.inputHeight;
			var calendar = this.props.calendar;

			if (showCalendar && calendar) {
				var _calendar$props = calendar.props;
				var timeConfirm = _calendar$props.timeConfirm;
				var onConfirm = _calendar$props.onConfirm;
				var onChange = _calendar$props.onChange;
				var time = _calendar$props.time;

				if (time && timeConfirm == null) {
					timeConfirm = true;
				}
				var calendarWrapStyle = {};
				if (position === 'top') {
					calendarWrapStyle.top = inputHeight;
				} else if (position === 'bottom') {
					calendarWrapStyle.bottom = inputHeight;
				}
				var props = { timeConfirm: timeConfirm, onConfirm: mergeFuncs(onConfirm, this.handlerHideCalendar) };
				if (!time) {
					props.onChange = mergeFuncs(onChange, this.handlerHideCalendar);
				}
				return _react2['default'].createElement(
					'div',
					{ style: assign({ position: 'absolute', left: '0', zIndex: 999 }, calendarWrapStyle) },
					_react2['default'].cloneElement(calendar, props)
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