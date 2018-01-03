'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var isDate = DateHelper.isDate;

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
			startShownDate = new Date(propsStartDate);
			endShownDate = new Date(propsEndDate);
		} else if (isDate(startDate) && isDate(endDate)) {
			startShownDate = new Date(startDate);
			endShownDate = new Date(endDate);
		} else {
			startShownDate = DateHelper.addMonth(new Date(), -1);
			endShownDate = new Date();
		}
		if (DateHelper.isSameYearAndMonth(startShownDate, endShownDate)) {
			endShownDate = DateHelper.addMonth(endShownDate, 1);
		}
		_this.state = { startDate: startDate, endDate: endDate, startShownDate: startShownDate, endShownDate: endShownDate, hoverDate: null };
		_this.step = 0;
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
				startDate = new Date(pStartDate);
				endDate = new Date(pEndDate);
			} else if (isDate(sStartDate) && isDate(sEndDate)) {
				startDate = new Date(sStartDate);
				endDate = new Date(sEndDate);
			}
			return { startDate: startDate, endDate: endDate };
		}
	}, {
		key: 'getTime',
		value: function getTime() {
			if (this.props.time) {
				var startTime = void 0,
				    endTime = void 0;
				var _props2 = this.props,
				    pStartDate = _props2.startDate,
				    pEndDate = _props2.endDate;
				var _state2 = this.state,
				    sStartDate = _state2.startDate,
				    sEndDate = _state2.endDate;

				if (isDate(pStartDate) && isDate(pEndDate)) {
					startTime = new Date(pStartDate);
					endTime = new Date(pEndDate);
				} else if (isDate(sStartDate) && isDate(sEndDate)) {
					startTime = new Date(sStartDate);
					endTime = new Date(sEndDate);
				} else {
					startTime = DateHelper.getInitTime();
					endTime = DateHelper.getInitTime();
				}
				return { startTime: startTime, endTime: endTime };
			}
		}
	}, {
		key: 'handlerSetRange',
		value: function handlerSetRange(range) {
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
				this.handlerSetRange(date);
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

				if (timeRange) {
					range.startDate = DateHelper.syncTime(range.startDate, timeRange.startTime);
					range.endDate = DateHelper.syncTime(range.endDate, timeRange.endTime);
				}
				this.handlerSetRange(range);
			} else if (changeType === 'time') {
				if (prefix === 'start') {
					startDate = DateHelper.syncTime(startDate, date);
				} else {
					endDate = DateHelper.syncTime(endDate, date);
				}
				this.handlerSetRange({ startDate: startDate, endDate: endDate });
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
			    second = _props3.second,
			    confirm = _props3.confirm;
			var _state3 = this.state,
			    startShownDate = _state3.startShownDate,
			    endShownDate = _state3.endShownDate,
			    hoverDate = _state3.hoverDate;

			var _getDate3 = this.getDate(),
			    startDate = _getDate3.startDate,
			    endDate = _getDate3.endDate;

			var getProps = function getProps(i) {
				var key = i === 0 ? 'start' : 'end';
				var props = {
					shownDate: key === 'start' ? startShownDate : endShownDate,
					key: key,
					range: { startDate: startDate, endDate: endDate },
					rangePosition: key,
					invalidDates: invalidDates,
					minDate: minDate,
					maxDate: maxDate,
					time: time,
					second: second,
					timeFilter: timeFilter,
					today: false,
					onChange: _this2.handlerDateChange.bind(_this2, key),
					onShownChange: _this2.handlerShownChange.bind(_this2, key)
				};
				if (confirm && i == 1) {
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

exports['default'] = DateRange;


DateRange.defaultProps = {
	__type: 'DateRange'
};