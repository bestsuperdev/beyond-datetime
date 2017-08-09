'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _parseInput = require('./utils/parseInput.js');

var _parseInput2 = _interopRequireDefault(_parseInput);

var _Calendar = require('./Calendar.js');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _PredefinedRanges = require('./PredefinedRanges.js');

var _PredefinedRanges2 = _interopRequireDefault(_PredefinedRanges);

var _consts = require('./utils/consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import classnames from 'classnames'


var DateRange = function (_Component) {
	_inherits(DateRange, _Component);

	function DateRange(props, context) {
		_classCallCheck(this, DateRange);

		var _this = _possibleConstructorReturn(this, (DateRange.__proto__ || Object.getPrototypeOf(DateRange)).call(this, props, context));

		var time = props.time,
		    initTime = props.initTime;

		var startDate = (0, _parseInput2['default'])(props.startDate, time && initTime);
		var endDate = (0, _parseInput2['default'])(props.endDate, time && initTime);
		_this.state = { startDate: startDate, endDate: endDate };
		_this.step = 0;
		return _this;
	}

	_createClass(DateRange, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var onInit = this.props.onInit;
			var _state = this.state,
			    startDate = _state.startDate,
			    endDate = _state.endDate;

			typeof onInit === 'function' && onInit({ startDate: startDate, endDate: endDate });
		}
	}, {
		key: 'orderRange',
		value: function orderRange(range) {
			var startDate = range.startDate,
			    endDate = range.endDate;

			startDate = startDate.clone();
			endDate = endDate.clone();
			if (!startDate.isAfter(endDate)) {
				return { startDate: startDate, endDate: endDate };
			} else {
				return {
					startDate: endDate,
					endDate: startDate
				};
			}
		}
	}, {
		key: 'setRange',
		value: function setRange(range) {
			var onChange = this.props.onChange;

			range = this.orderRange(range);
			var result = null;
			if (typeof onChange === 'function') {
				result = onChange(range);
			}

			if (result !== false) {
				this.setState(range);
			}
		}
	}, {
		key: 'handlerRangeChange',
		value: function handlerRangeChange(date) {
			if (date.startDate && date.endDate) {
				this.step = 0;
				this.setRange(date);
				return false;
			}
		}
	}, {
		key: 'handlerDateChange',
		value: function handlerDateChange(date) {
			var _state2 = this.state,
			    startDate = _state2.startDate,
			    endDate = _state2.endDate;

			switch (this.step) {
				case 0:
					startDate = date;
					endDate = date;
					this.step = 1;
					break;
				case 1:
					endDate = date;
					this.step = 0;
					break;
			}
			this.setRange({ startDate: startDate, endDate: endDate });
			return false;
		}
	}, {
		key: 'handlerConfirm',
		value: function handlerConfirm() {
			var onConfirm = this.props.onConfirm;

			if (typeof onConfirm === 'function') {
				var _state3 = this.state,
				    startDate = _state3.startDate,
				    endDate = _state3.endDate;

				startDate = startDate.clone();
				endDate = endDate.clone();
				this.props.onConfirm({ startDate: startDate, endDate: endDate });
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			// Whenever date props changes,	 update state with parsed variant
			if ('startDate' in nextProps || 'endDate' in nextProps) {
				var time = nextProps.time,
				    initTime = nextProps.initTime;

				var startDate = (0, _parseInput2['default'])(nextProps.startDate, time && initTime);
				var endDate = (0, _parseInput2['default'])(nextProps.endDate, time && initTime);
				this.setState({ startDate: startDate, endDate: endDate });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    ranges = _props.ranges,
			    firstDayOfWeek = _props.firstDayOfWeek,
			    minDate = _props.minDate,
			    maxDate = _props.maxDate,
			    invalid = _props.invalid,
			    time = _props.time,
			    second = _props.second,
			    confirm = _props.confirm,
			    yearLowerLimit = _props.yearLowerLimit,
			    yearUpperLimit = _props.yearUpperLimit;
			var _state4 = this.state,
			    startDate = _state4.startDate,
			    endDate = _state4.endDate;

			var getProps = function getProps(i) {
				var props = {
					key: i + '',
					offset: i - 1,
					range: { startDate: startDate, endDate: endDate },
					firstDayOfWeek: firstDayOfWeek,
					invalid: invalid,
					minDate: minDate,
					maxDate: maxDate,
					time: time,
					second: second,
					onChange: _this2.handlerDateChange.bind(_this2),
					yearLowerLimit: yearLowerLimit,
					yearUpperLimit: yearUpperLimit
				};
				if (confirm && i == 1) {
					props.onConfirm = _this2.handlerConfirm.bind(_this2);
					props.confirm = true;
				}
				return props;
			};

			return _react2['default'].createElement(
				'div',
				{ className: _consts.dateRangePrefix },
				ranges && _react2['default'].createElement(_PredefinedRanges2['default'], {
					ranges: ranges,
					startDate: startDate,
					endDate: endDate,
					onSelect: this.handlerRangeChange.bind(this)
				}),
				_react2['default'].createElement(
					'div',
					{ className: _consts.dateRangePrefix + '-container' },
					_react2['default'].createElement(_Calendar2['default'], getProps(0))
				),
				_react2['default'].createElement(
					'div',
					{ className: _consts.dateRangePrefix + '-container' },
					_react2['default'].createElement(_Calendar2['default'], getProps(1))
				)
			);
		}
	}]);

	return DateRange;
}(_react.Component);

// DateRange.propTypes = {
// 	format          : PropTypes.string,
// 	time : PropTypes.bool,
// 	firstDayOfWeek  : PropTypes.number,
// 	startDate       : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
// 	endDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
// 	minDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
// 	maxDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
// 	dateLimit       : PropTypes.func,
// 	ranges          : PropTypes.object,
// 	linkedCalendars : PropTypes.bool,
// 	onInit          : PropTypes.func,
// 	onChange        : PropTypes.func,
// 	isInvalid       : PropTypes.func,	
// }


exports['default'] = DateRange;