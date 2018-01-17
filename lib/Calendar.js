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

var _consts = require('./utils/consts');

var _DateHelper = require('./utils/DateHelper');

var DateHelper = _interopRequireWildcard(_DateHelper);

var _DayCell = require('./DayCell.js');

var _DayCell2 = _interopRequireDefault(_DayCell);

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var cloneDate = DateHelper.cloneDate;

var Calendar = function (_Component) {
	(0, _inherits3['default'])(Calendar, _Component);

	function Calendar(props, context) {
		(0, _classCallCheck3['default'])(this, Calendar);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (Calendar.__proto__ || (0, _getPrototypeOf2['default'])(Calendar)).call(this, props, context));

		var defaultDate = props.defaultDate,
		    defaultShownDate = props.defaultShownDate;

		var date = cloneDate(defaultDate);
		var shownDate = cloneDate(defaultShownDate, props.date, defaultDate) || new Date();
		shownDate.setDate(1);
		_this.time = null;
		_this.state = { date: date, shownDate: shownDate };
		return _this;
	}

	(0, _createClass3['default'])(Calendar, [{
		key: 'getDate',
		value: function getDate() {
			var _props = this.props,
			    range = _props.range,
			    rangePosition = _props.rangePosition,
			    date = _props.date;

			return cloneDate(range && range[rangePosition + 'Date'], date, this.state.date);
		}
	}, {
		key: 'getTime',
		value: function getTime() {
			return this.time ? this.time.getTime() : null;
		}
	}, {
		key: 'getShownDate',
		value: function getShownDate() {
			return cloneDate(this.props.shownDate, this.state.shownDate);
		}
	}, {
		key: 'handlerConfirm',
		value: function handlerConfirm() {
			var onConfirm = this.props.onConfirm;

			if (typeof onConfirm === 'function') {
				onConfirm(this.getDate());
			}
		}
	}, {
		key: 'handlerChange',
		value: function handlerChange(type, date) {
			var onChange = this.props.onChange;

			var result = null;
			if (type === 'time') {
				date = this.getDate();
			}
			date = DateHelper.syncTime(date, this.getTime());
			if (typeof onChange === 'function') {
				result = onChange(cloneDate(date), type);
			}
			if (result !== false) {
				this.setState({ date: date });
			}
			return false;
		}
	}, {
		key: 'handlerChangeShownDate',
		value: function handlerChangeShownDate(type, event) {
			var value = void 0,
			    shownDate = void 0,
			    result = void 0;
			var onShownChange = this.props.onShownChange;

			if (event && event.preventDefault) {
				event.preventDefault();
				value = event.target.value;
			} else {
				value = event;
			}
			if (type === 'month') {
				if (typeof value === 'string') {
					shownDate = DateHelper.setMonth(this.state.shownDate, +value);
				} else {
					shownDate = DateHelper.addMonth(this.state.shownDate, value);
				}
			} else if (type === 'year') {
				if (typeof value === 'string') {
					shownDate = DateHelper.setYear(this.state.shownDate, +value);
				} else {
					shownDate = DateHelper.addYear(this.state.shownDate, value);
				}
			} else if (type === 'date') {
				shownDate = event;
			}
			shownDate.setDate(1);
			if (typeof onShownChange === 'function') {
				result = onShownChange(shownDate);
			}
			if (result !== false) {
				this.setState({ shownDate: shownDate });
			}
		}
	}, {
		key: 'handlerToggelToday',
		value: function handlerToggelToday() {
			this.handlerChangeShownDate('date', new Date());
			this.handlerChange('date', new Date());
		}
	}, {
		key: 'handlerHoverCell',
		value: function handlerHoverCell(date) {
			var onHover = this.props.onHover;

			if (typeof onHover === 'function') {
				onHover(date);
			}
		}
	}, {
		key: 'renderMonthAndYear',
		value: function renderMonthAndYear() {
			var shownDate = this.getShownDate();
			var currentShownYear = shownDate.getFullYear();
			var prefix = _consts.calendarPrefix + '-month-and-year';
			var years = [];

			var _DateHelper$getYearRa = DateHelper.getYearRange(),
			    startYear = _DateHelper$getYearRa.startYear,
			    endYear = _DateHelper$getYearRa.endYear;

			if (currentShownYear < startYear) {
				years.push(_react2['default'].createElement(
					'option',
					{ key: currentShownYear, value: currentShownYear },
					currentShownYear
				));
			}
			for (var i = startYear; i <= endYear; i++) {
				years.push(_react2['default'].createElement(
					'option',
					{ key: i, value: i },
					i
				));
			}
			if (currentShownYear > endYear) {
				years.push(_react2['default'].createElement(
					'option',
					{ key: currentShownYear, value: currentShownYear },
					currentShownYear
				));
			}

			var prevClassName = prefix + '-button ' + prefix + '-prev-button';
			var nextClassName = prefix + '-button ' + prefix + '-next-button';
			return _react2['default'].createElement(
				'div',
				{ className: prefix },
				_react2['default'].createElement(
					'div',
					{ className: prefix + '-years' },
					_react2['default'].createElement('button', { type: 'button', className: prevClassName, onClick: this.handlerChangeShownDate.bind(this, 'year', -1) }),
					_react2['default'].createElement(
						'select',
						{ value: currentShownYear, onChange: this.handlerChangeShownDate.bind(this, 'year') },
						years
					),
					_react2['default'].createElement('button', { type: 'button', className: nextClassName, onClick: this.handlerChangeShownDate.bind(this, 'year', 1) })
				),
				_react2['default'].createElement(
					'div',
					{ className: prefix + '-months' },
					_react2['default'].createElement('button', { type: 'button', className: prevClassName, onClick: this.handlerChangeShownDate.bind(this, 'month', -1) }),
					_react2['default'].createElement(
						'select',
						{ onChange: this.handlerChangeShownDate.bind(this, 'month'), value: shownDate.getMonth() },
						DateHelper.Months.map(function (month, i) {
							return _react2['default'].createElement(
								'option',
								{ key: i + '', value: i },
								month
							);
						})
					),
					_react2['default'].createElement('button', { type: 'button', className: nextClassName, onClick: this.handlerChangeShownDate.bind(this, 'month', 1) })
				)
			);
		}
	}, {
		key: 'renderWeekdays',
		value: function renderWeekdays() {

			return _react2['default'].createElement(
				'div',
				{ className: _consts.calendarPrefix + '-weekdays' },
				DateHelper.Weeks.map(function (week, i) {
					return _react2['default'].createElement(
						'span',
						{ key: i + '' },
						week
					);
				})
			);
		}
	}, {
		key: 'renderDays',
		value: function renderDays() {
			var _this2 = this;

			var _props2 = this.props,
			    range = _props2.range,
			    minDate = _props2.minDate,
			    maxDate = _props2.maxDate,
			    invalidDates = _props2.invalidDates,
			    hoverDate = _props2.hoverDate;


			var shownDate = this.getShownDate();
			var date = this.getDate();

			var days = DateHelper.getDatesInCalendarMonth(shownDate);

			var today = new Date();
			var className = _consts.calendarPrefix + '-day';
			var dayCells = days.map(function (_date, index) {

				var isSelected = !range && date && DateHelper.isSameDate(date, _date);
				//用于范围选择
				var isPassive = !DateHelper.isSameYearAndMonth(shownDate, _date);
				var isStartEdge = range && DateHelper.isSameDate(_date, range.startDate);
				var isEndEdge = range && DateHelper.isSameDate(_date, range.endDate);
				var isEdge = isStartEdge || isEndEdge;

				var isToday = DateHelper.isSameDate(_date, today);
				var isInvalid = typeof invalidDates === 'function' ? invalidDates(cloneDate(_date)) : false;
				if (minDate || maxDate) {
					isInvalid = isInvalid && !DateHelper.isBetween(_date, minDate, maxDate); // isOusideMinMax(_date, minDate, maxDate)
				}
				var isInRange = void 0; //=  range && DateHelper.isBetween(_date,range.startDate,range.endDate) // checkRange(_date, range)
				if (range) {
					var _range = hoverDate ? DateHelper.orderRange(hoverDate, range.startDate) : range;
					isInRange = DateHelper.isBetween(_date, _range.startDate, _range.endDate);
				} else {
					isInRange = false;
				}
				return _react2['default'].createElement(_DayCell2['default'], {
					onSelect: _this2.handlerChange.bind(_this2, 'date'),
					onHover: _this2.handlerHoverCell.bind(_this2),
					date: _date,
					isStartEdge: isStartEdge,
					isEndEdge: isEndEdge,
					isSelected: isSelected || isEdge,
					isInRange: isInRange,
					isToday: isToday,
					key: index,
					isPassive: isPassive,
					isInvalid: isInvalid,
					className: className
				});
			});
			return _react2['default'].createElement(
				'div',
				null,
				dayCells
			);
		}
	}, {
		key: 'renderTime',
		value: function renderTime() {
			var _this3 = this;

			var _props3 = this.props,
			    time = _props3.time,
			    second = _props3.second,
			    range = _props3.range,
			    rangePosition = _props3.rangePosition,
			    timeFilter = _props3.timeFilter;

			if (time) {
				var date = this.getDate();
				var disabled = !date && (!range || !range.startDate);
				if (typeof timeFilter === 'function') {
					var shownDate = this.getShownDate();
					var _range2 = _range2 && _range2.startDate ? { startDate: cloneDate(_range2.startDate), endDate: cloneDate(_range2.endDate) } : null;
					timeFilter = timeFilter({ date: date, shownDate: shownDate, range: _range2, rangePosition: rangePosition });
				}
				return _react2['default'].createElement(_Time2['default'], {
					ref: function ref(time) {
						return _this3.time = time;
					},
					second: second,
					filter: timeFilter,
					disabled: disabled,
					date: this.getDate(),
					onChange: this.handlerChange.bind(this, 'time') });
			}
		}
	}, {
		key: 'renderBtns',
		value: function renderBtns() {
			var _props4 = this.props,
			    confirm = _props4.confirm,
			    today = _props4.today;

			var btns = [];
			if (today) {
				btns.push(_react2['default'].createElement(
					'button',
					{ onClick: this.handlerToggelToday.bind(this), key: 'today', className: 'bdt-btn bdt-btn-today', type: 'button' },
					'\u4ECA\u5929'
				));
			}
			if (confirm) {
				btns.push(_react2['default'].createElement(
					'button',
					{ onClick: this.handlerConfirm.bind(this), key: 'confirm', className: 'bdt-btn', type: 'button' },
					'\u786E\u5B9A'
				));
			}
			if (btns.length > 0) {
				return _react2['default'].createElement(
					'div',
					{ style: { padding: 4, textAlign: 'right' } },
					btns
				);
			}
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2['default'].createElement(
				'div',
				{ className: _consts.calendarPrefix, style: this.props.style },
				this.renderMonthAndYear(),
				this.renderWeekdays(),
				this.renderDays(),
				this.renderTime(),
				this.renderBtns()
			);
		}
	}]);
	return Calendar;
}(_react.Component);

exports['default'] = Calendar;


Calendar.defaultProps = {
	time: false,
	second: false,
	today: true,
	__type: 'Calendar'
};