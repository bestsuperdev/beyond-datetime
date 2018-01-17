'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _DateHelper = require('./utils/DateHelper');

var DateHelper = _interopRequireWildcard(_DateHelper);

var _Calendar = require('./Calendar.js');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _PredefinedRanges = require('./PredefinedRanges.js');

var _PredefinedRanges2 = _interopRequireDefault(_PredefinedRanges);

var _consts = require('./utils/consts');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var isDate = DateHelper.isDate,
    cloneDate = DateHelper.cloneDate;

var DateRange = function (_Component) {
	(0, _inherits3['default'])(DateRange, _Component);

	function DateRange(props, context) {
		(0, _classCallCheck3['default'])(this, DateRange);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (DateRange.__proto__ || (0, _getPrototypeOf2['default'])(DateRange)).call(this, props, context));

		var startShownDate = void 0;
		var endShownDate = void 0;

		var defaultStartDate = props.defaultStartDate,
		    defaultEndDate = props.defaultEndDate;

		var _DateHelper$orderRang = DateHelper.orderRange(defaultStartDate || defaultEndDate, defaultEndDate || defaultStartDate),
		    startDate = _DateHelper$orderRang.startDate,
		    endDate = _DateHelper$orderRang.endDate;

		var _DateHelper$orderRang2 = DateHelper.orderRange(props.startDate, props.endDate),
		    propsStartDate = _DateHelper$orderRang2.startDate,
		    propsEndDate = _DateHelper$orderRang2.endDate;

		if (isDate(propsStartDate) && isDate(propsEndDate)) {
			startShownDate = cloneDate(propsStartDate);
			endShownDate = cloneDate(propsEndDate);
		} else if (isDate(startDate) && isDate(endDate)) {
			startShownDate = cloneDate(startDate);
			endShownDate = cloneDate(endDate);
		} else {
			startShownDate = new Date();
			endShownDate = DateHelper.addMonth(startShownDate, 1);
		}
		if (DateHelper.isSameYearAndMonth(startShownDate, endShownDate)) {
			endShownDate = DateHelper.addMonth(startShownDate, 1);
		}
		_this.state = { startDate: startDate, endDate: endDate, startShownDate: startShownDate, endShownDate: endShownDate, hoverDate: null };
		_this.step = 0;
		_this.startCalendar = null;
		_this.endCalendar = null;
		return _this;
	}

	(0, _createClass3['default'])(DateRange, [{
		key: 'getDate',
		value: function getDate() {
			var _props = this.props,
			    pStartDate = _props.startDate,
			    pEndDate = _props.endDate;
			var _state = this.state,
			    sStartDate = _state.startDate,
			    sEndDate = _state.endDate;

			var startDate = void 0,
			    endDate = void 0;
			if (isDate(pStartDate) && isDate(pEndDate)) {
				startDate = cloneDate(pStartDate);
				endDate = cloneDate(pEndDate);
			} else if (isDate(sStartDate) && isDate(sEndDate)) {
				startDate = cloneDate(sStartDate);
				endDate = cloneDate(sEndDate);
			}
			return { startDate: startDate, endDate: endDate };
		}
	}, {
		key: 'getShownDate',
		value: function getShownDate() {
			var _props2 = this.props,
			    pStartShownDate = _props2.startShownDate,
			    pEndShownDate = _props2.endShownDate;
			var _state2 = this.state,
			    sStartShownDate = _state2.startShownDate,
			    sEndShownDate = _state2.endShownDate;

			var startShownDate = void 0,
			    endShownDate = void 0;
			if (isDate(pStartShownDate) && isDate(pEndShownDate)) {
				startShownDate = cloneDate(pStartShownDate);
				endShownDate = cloneDate(pEndShownDate);
			} else if (isDate(sStartShownDate) && isDate(sEndShownDate)) {
				startShownDate = cloneDate(sStartShownDate);
				endShownDate = cloneDate(sEndShownDate);
			}
			return { startShownDate: startShownDate, endShownDate: endShownDate };
		}
	}, {
		key: 'getTime',
		value: function getTime() {
			return { startTime: this.startCalendar.getTime(), endTime: this.endCalendar.getTime() };
		}
	}, {
		key: 'handlerChange',
		value: function handlerChange(range) {
			var onChange = this.props.onChange;

			var result = void 0;
			if (typeof onChange === 'function') {
				result = onChange({ startDate: new Date(range.startDate), endDate: new Date(range.endDate) });
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
				var timeRange = this.getTime();
				if (timeRange) {
					date.startDate = DateHelper.syncTime(date.startDate, timeRange.startTime);
					date.endDate = DateHelper.syncTime(date.endDate, timeRange.endTime);
				}
				this.handlerChange(date);
				return false;
			}
		}
	}, {
		key: 'handlerDateChange',
		value: function handlerDateChange(prefix, date, changeType) {
			var _getDate = this.getDate(),
			    startDate = _getDate.startDate,
			    endDate = _getDate.endDate;

			var timeRange = this.getTime();
			if (changeType === 'date') {
				if (this.step === 0) {
					startDate = date;
					endDate = date;
					this.step = 1;
				} else if (this.step === 1) {
					endDate = date;
					this.step = 0;
				}
				var range = DateHelper.orderRange(startDate, endDate);

				if (this.props.time) {
					range.startDate = DateHelper.syncTime(range.startDate, timeRange.startTime);
					range.endDate = DateHelper.syncTime(range.endDate, timeRange.endTime);
				}
				this.handlerChange(range);
			} else if (changeType === 'time') {
				if (prefix === 'start') {
					startDate = DateHelper.syncTime(startDate, date);
				} else {
					endDate = DateHelper.syncTime(endDate, date);
				}
				this.handlerChange({ startDate: startDate, endDate: endDate });
			}
			return false;
		}
	}, {
		key: 'handlerConfirm',
		value: function handlerConfirm() {
			var onConfirm = this.props.onConfirm;

			if (typeof onConfirm === 'function') {
				var _getDate2 = this.getDate(),
				    startDate = _getDate2.startDate,
				    endDate = _getDate2.endDate;

				this.props.onConfirm({ startDate: startDate, endDate: endDate });
			}
		}
	}, {
		key: 'handlerShownChange',
		value: function handlerShownChange(prefix, date) {
			this.setState((0, _defineProperty3['default'])({}, prefix + 'ShownDate', date));
		}
	}, {
		key: 'handlerHoverDayCell',
		value: function handlerHoverDayCell(hoverDate) {
			this.setState({ hoverDate: hoverDate });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props3 = this.props,
			    ranges = _props3.ranges,
			    minDate = _props3.minDate,
			    maxDate = _props3.maxDate,
			    invalidDates = _props3.invalidDates,
			    time = _props3.time,
			    timeFilter = _props3.timeFilter,
			    startTimeFilter = _props3.startTimeFilter,
			    endTimeFilter = _props3.endTimeFilter,
			    second = _props3.second,
			    confirm = _props3.confirm;
			var hoverDate = this.state.hoverDate;

			var _getShownDate = this.getShownDate(),
			    startShownDate = _getShownDate.startShownDate,
			    endShownDate = _getShownDate.endShownDate;

			var _getDate3 = this.getDate(),
			    startDate = _getDate3.startDate,
			    endDate = _getDate3.endDate;

			var getProps = function getProps(key) {
				var shownDate = void 0,
				    filter = void 0;
				if (key === 'start') {
					shownDate = startShownDate;
					filter = startTimeFilter || timeFilter;
				} else {
					shownDate = endShownDate;
					filter = endTimeFilter || timeFilter;
				}
				var props = {
					shownDate: shownDate,
					key: key,
					range: { startDate: startDate, endDate: endDate },
					rangePosition: key,
					invalidDates: invalidDates,
					minDate: minDate,
					maxDate: maxDate,
					time: time,
					second: second,
					timeFilter: filter,
					today: false,
					onChange: _this2.handlerDateChange.bind(_this2, key),
					onShownChange: _this2.handlerShownChange.bind(_this2, key)
				};
				if (confirm && key === 'end') {
					props.onConfirm = _this2.handlerConfirm.bind(_this2);
					props.confirm = true;
				}
				if (_this2.step === 1) {
					props.onHover = _this2.handlerHoverDayCell.bind(_this2);
					props.hoverDate = hoverDate;
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
					_react2['default'].createElement(_Calendar2['default'], (0, _extends3['default'])({ ref: function ref(calendar) {
							return _this2.startCalendar = calendar;
						} }, getProps('start')))
				),
				_react2['default'].createElement(
					'div',
					{ className: _consts.dateRangePrefix + '-container' },
					_react2['default'].createElement(_Calendar2['default'], (0, _extends3['default'])({ ref: function ref(calendar) {
							return _this2.endCalendar = calendar;
						} }, getProps('end')))
				)
			);
		}
	}]);
	return DateRange;
}(_react.Component);

exports['default'] = DateRange;


DateRange.defaultProps = {
	__type: 'DateRange'
};