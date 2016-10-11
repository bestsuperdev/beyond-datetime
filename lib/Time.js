'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _parseInput = require('./utils/parseInput');

var _consts = require('./utils/consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <Time format="HH:mm:ss" format="H:m:s" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// import moment from 'moment'

// import getPos from './utils/position';


var texts = {
	hour: '小时',
	minute: '分钟',
	second: '秒'
};

function toDoubleDigits(number) {
	return number < 10 ? '0' + number : number;
}

var Time = function (_Component) {
	_inherits(Time, _Component);

	function Time(props) {
		_classCallCheck(this, Time);

		var _this = _possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this, props));

		var date = props.date;

		date = (0, _parseInput.parseTimeInput)(date, props.format);
		_this.state = { date: date };
		_this.mounted = false;
		return _this;
	}

	_createClass(Time, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var date = nextProps.date;
			var format = nextProps.format;

			if (date != null) {
				date = (0, _parseInput.parseTimeInput)(date, format);
				this.setState(function (state, props) {
					return { date: date };
				});
			}
		}
	}, {
		key: 'handlerChange',
		value: function handlerChange(type, event) {
			var second = this.props.second;

			var date = this.state.date.clone();
			var number = +event.target.value;
			date['' + type](number);
			if (!second) {
				date.second(0);
			}
			var result = this.props.onChange(date, 'time');
			if (result !== false) {
				this.setState(function (state, props) {
					return { date: date };
				});
			}
		}
	}, {
		key: 'renderSelector',
		value: function renderSelector(type, count, value) {
			var options = [];
			for (var i = 0; i < count; i++) {
				options.push(_react2['default'].createElement(
					'option',
					{ key: i, value: i },
					toDoubleDigits(i)
				));
			}
			return _react2['default'].createElement(
				'select',
				{ value: value, onChange: this.handlerChange.bind(this, type) },
				options
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var hour = _props.hour;
			var minute = _props.minute;
			var second = _props.second;
			// console.log(this.state)

			var date = this.state.date;

			return _react2['default'].createElement(
				'div',
				{ className: _consts.timePrefix },
				hour && _react2['default'].createElement(
					'div',
					{ className: _consts.timePrefix + '-cell' },
					this.renderSelector('hour', 24, date.hour())
				),
				minute && _react2['default'].createElement(
					'div',
					{ className: _consts.timePrefix + '-mini-cell' },
					':'
				),
				minute && _react2['default'].createElement(
					'div',
					{ className: _consts.timePrefix + '-cell' },
					this.renderSelector('minute', 60, date.minute())
				),
				second && _react2['default'].createElement(
					'div',
					{ className: _consts.timePrefix + '-mini-cell' },
					':'
				),
				second && _react2['default'].createElement(
					'div',
					{ className: _consts.timePrefix + '-cell' },
					this.renderSelector('second', 60, date.second())
				)
			);
		}
	}]);

	return Time;
}(_react.Component);

Time.defaultProps = {
	onChange: function onChange() {},
	hour: true,
	minute: true,
	second: true
};

exports['default'] = Time;