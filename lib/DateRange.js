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

var DateRange = function (_Component) {
	_inherits(DateRange, _Component);

	function DateRange(props, context) {
		_classCallCheck(this, DateRange);

		var _this = _possibleConstructorReturn(this, (DateRange.__proto__ || Object.getPrototypeOf(DateRange)).call(this, props, context));

		var format = props.format,
		    linkedCalendars = props.linkedCalendars,
		    time = props.time;

		var startDate = (0, _parseInput2['default'])(props.startDate, format, true);
		var startTime = time ? (0, _parseInput.parseTimeInput)(startDate) : null;

		var endDate = (0, _parseInput2['default'])(props.endDate, format, true);
		var endTime = time ? (0, _parseInput.parseTimeInput)(endDate) : null;

		_this.state = {
			timeRange: time && startTime && endTime ? { startTime: startTime, endTime: endTime } : null,
			range: { startDate: startDate, endDate: endDate },
			link: linkedCalendars && endDate
		};

		_this.step = 0;
		// this.styles = getTheme(theme);
		return _this;
	}

	_createClass(DateRange, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var onInit = this.props.onInit;
			var range = this.state.range;

			onInit && onInit(range);
		}
	}, {
		key: 'orderRange',
		value: function orderRange(range) {
			var startDate = range.startDate,
			    endDate = range.endDate;

			if (startDate && endDate) {
				var swap = startDate.isAfter(endDate);
				if (!swap) return range;
			}

			return {
				startDate: endDate,
				endDate: startDate
			};
		}
	}, {
		key: 'setTime',
		value: function setTime(range, timeRange) {
			var startDate = range.startDate,
			    endDate = range.endDate;

			var startTime = null;
			var endTime = null;
			if (timeRange) {
				startTime = timeRange.startTime;
				endTime = timeRange.endTime;
			}
			if (startDate && endDate) {
				startDate = startDate.clone();
				endDate = endDate.clone();

				startDate.hour(startTime ? startTime.hour() : 0);
				startDate.minute(startTime ? startTime.minute() : 0);
				startDate.second(startTime ? startTime.second() : 0);

				endDate.hour(endTime ? endTime.hour() : 0);
				endDate.minute(endTime ? endTime.minute() : 0);
				endDate.second(endTime ? endTime.second() : 0);
			}
			return { startDate: startDate, endDate: endDate };
		}
	}, {
		key: 'setRange',
		value: function setRange(range) {
			var _props = this.props,
			    onChange = _props.onChange,
			    time = _props.time;
			var timeRange = this.state.timeRange;

			range = this.orderRange(range);
			var result = null;

			if (typeof onChange === 'function') {
				if (time) {
					range = this.setTime(range, timeRange);
				}
				result = onChange(range);
			}
			if (result !== false) {
				// const state = 
				this.setState({ range: range });
			}
			// onChange && onChange(range);
		}
	}, {
		key: 'handleLinkChange',
		value: function handleLinkChange(direction) {
			var link = this.state.link;


			this.setState({
				link: link.clone().add(direction, 'months')
			});
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
		key: 'handlerTimeChange',
		value: function handlerTimeChange(index, date) {
			var _state = this.state,
			    timeRange = _state.timeRange,
			    range = _state.range;
			var onChange = this.props.onChange;

			var field = index === 0 ? 'startTime' : 'endTime';
			timeRange[field] = date;
			if (range.startDate && range.endDate) {
				var result = void 0;
				if (typeof onChange === 'function') {
					result = onChange(this.setTime(range, timeRange));
				}
				if (result !== false) {
					this.setState({ timeRange: timeRange });
				}
			} else {
				this.setState({ timeRange: timeRange });
			}
			return false;
		}
	}, {
		key: 'handlerDateChange',
		value: function handlerDateChange(index, date) {
			var _state$range = this.state.range,
			    startDate = _state$range.startDate,
			    endDate = _state$range.endDate;

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
		value: function handlerConfirm(event) {
			if (event && event.preventDefault) {
				event.preventDefault();
			}
			if (typeof this.props.onConfirm === 'function') {
				var _state2 = this.state,
				    timeRange = _state2.timeRange,
				    range = _state2.range;

				range = this.setTime(range, timeRange);
				this.props.onConfirm(range);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			// Whenever date props changes, update state with parsed variant
			if (newProps.startDate || newProps.endDate) {
				var startDate = newProps.startDate && (0, _parseInput2['default'])(newProps.startDate, newProps.format, true);
				var endDate = newProps.endDate && (0, _parseInput2['default'])(newProps.endDate, newProps.format, true);
				var oldStartDate = this.props.startDate && (0, _parseInput2['default'])(this.props.startDate, this.props.format, true);
				var oldEndDate = this.props.endDate && (0, _parseInput2['default'])(this.props.endDate, this.props.format, true);

				if (!startDate.isSame(oldStartDate) || !endDate.isSame(oldEndDate)) {
					var state = {};
					var range = {
						startDate: startDate || oldStartDate,
						endDate: endDate || oldEndDate
					};
					state.range = range;
					if (newProps.time) {
						state.timeRange = { startTime: range.startDate, endTime: range.endDate };
					}
					this.setState(state);
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props,
			    ranges = _props2.ranges,
			    format = _props2.format,
			    linkedCalendars = _props2.linkedCalendars,
			    firstDayOfWeek = _props2.firstDayOfWeek,
			    minDate = _props2.minDate,
			    maxDate = _props2.maxDate,
			    isInvalid = _props2.isInvalid,
			    time = _props2.time,
			    hour = _props2.hour,
			    minute = _props2.minute,
			    second = _props2.second,
			    confirm = _props2.confirm;
			var _state3 = this.state,
			    range = _state3.range,
			    link = _state3.link,
			    timeRange = _state3.timeRange;


			return _react2['default'].createElement(
				'div',
				{ className: _consts.dateRangePrefix },
				ranges && _react2['default'].createElement(_PredefinedRanges2['default'], {
					ranges: ranges,
					range: range,
					onSelect: this.handlerRangeChange.bind(this)
				}),
				function () {
					var _calendars = [];
					// const len = 2 //Number(calendars)
					for (var i = 0; i < 2; i++) {
						_calendars.push(_react2['default'].createElement(_Calendar2['default'], {
							key: i,
							offset: i - 1,
							link: linkedCalendars && link,
							linkCB: _this2.handleLinkChange.bind(_this2),
							timeDate: time && timeRange ? i === 0 ? timeRange.startTime : timeRange.endTime : null,
							range: range,
							format: format,
							firstDayOfWeek: firstDayOfWeek,
							isInvalid: isInvalid,
							minDate: minDate,
							maxDate: maxDate,
							time: time,
							hour: hour,
							minute: minute,
							second: second,
							onTimeChange: _this2.handlerTimeChange.bind(_this2, i),
							onDateChange: _this2.handlerDateChange.bind(_this2, i),
							onConfirm: confirm && i === 1 ? _this2.handlerConfirm.bind(_this2) : void 0,
							confirm: confirm && i === 1
						}));
					}
					return _calendars;
				}(),
				confirm && !time && _react2['default'].createElement(
					'div',
					{ style: { padding: '4px 10px', textAlign: 'right' } },
					_react2['default'].createElement(
						'a',
						{ href: '#', className: _consts.dateRangePrefix + '-confirm-btn', onClick: this.handlerConfirm.bind(this) },
						'\u786E\u8BA4'
					)
				)
			);
		}
	}]);

	return DateRange;
}(_react.Component);

DateRange.defaultProps = {
	linkedCalendars: false
};

DateRange.propTypes = {
	format: _react.PropTypes.string,
	time: _react.PropTypes.bool,
	firstDayOfWeek: _react.PropTypes.number,
	startDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
	endDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
	minDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
	maxDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
	dateLimit: _react.PropTypes.func,
	ranges: _react.PropTypes.object,
	linkedCalendars: _react.PropTypes.bool,
	onInit: _react.PropTypes.func,
	onChange: _react.PropTypes.func,
	isInvalid: _react.PropTypes.func
};

exports['default'] = DateRange;