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

var isDate = DateHelper.isDate;

var Calendar = function (_Component) {
	(0, _inherits3['default'])(Calendar, _Component);

	function Calendar(props, context) {
		(0, _classCallCheck3['default'])(this, Calendar);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (Calendar.__proto__ || (0, _getPrototypeOf2['default'])(Calendar)).call(this, props, context));

		var defaultDate = props.defaultDate;

		var date = isDate(defaultDate) ? new Date(defaultDate) : null;
		var shownDate = isDate(props.date) ? new Date(props.date) : isDate(date) ? new Date(date) : new Date();
		shownDate.setDate(1);
		_this.state = { date: date, shownDate: shownDate };
		return _this;
	}

	(0, _createClass3['default'])(Calendar, [{
		key: 'getDate',
		value: function getDate() {
			var date = this.props.date || this.state.date;
			return date ? new Date(date) : null;
		}
	}, {
		key: 'getTime',
		value: function getTime() {
			if (this.props.time) {
				var _props = this.props,
				    date = _props.date,
				    range = _props.range,
				    rangePosition = _props.rangePosition;

				var timeDate = range && range[rangePosition + 'Date'] || date || this.state.date || DateHelper.getInitTime();
				return new Date(timeDate);
			} else {
				return null;
			}
		}
	}, {
		key: 'getShownDate',
		value: function getShownDate() {
			var date = this.props.shownDate || this.state.shownDate;
			return date ? new Date(date) : null;
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
			var timeDate = void 0;
			if (type === 'date' && null != (timeDate = this.getTime())) {
				date = DateHelper.syncTime(date, timeDate);
			} else if (type === 'time' && this.state.date) {
				date = DateHelper.syncTime(this.state.date, date);
			}
			if (typeof onChange === 'function') {
				result = onChange(new Date(date), type);
			}
			if (result !== false) {
				this.setState({ date: date });
			}
			return false;
		}
	}, {
		key: 'handlerChangeShownMonth',
		value: function handlerChangeShownMonth(event) {
			var shownDate = void 0;
			if (event.target) {
				shownDate = DateHelper.setMonth(this.getShownDate(), +event.target.value);
			} else if (typeof event === 'number') {
				shownDate = DateHelper.addMonth(this.getShownDate(), event);
			}
			if (shownDate) {
				shownDate.setDate(1);
				this.handlerChangeShownDate(shownDate);
			}
		}
	}, {
		key: 'handlerChangeShownYear',
		value: function handlerChangeShownYear(event) {
			var shownDate = void 0;
			if (event.target) {
				shownDate = DateHelper.setYear(this.getShownDate(), +event.target.value);
			} else if (typeof event === 'number') {
				shownDate = DateHelper.addYear(this.getShownDate(), event);
			}
			if (shownDate) {
				shownDate.setDate(1);
				this.handlerChangeShownDate(shownDate);
			}
		}
	}, {
		key: 'handlerChangeShownDate',
		value: function handlerChangeShownDate(shownDate) {
			var onShownChange = this.props.onShownChange;

			var result = void 0;
			if (typeof onShownChange === 'function') {
				result = onShownChange(shownDate);
			}
			if (result !== false) {
				this.setState({ shownDate: shownDate });
			}
		}
	}, {
		key: 'renderMonthAndYear',
		value: function renderMonthAndYear() {
			var shownDate = this.getShownDate();
			var currentYear = new Date().getFullYear();
			var currentShownYear = shownDate.getFullYear();
			var prefix = _consts.calendarPrefix + '-month-and-year';
			var years = [];

			var startYear = Math.max(currentYear - 45, 1970);
			var endYear = currentYear + 10;

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
			var style = { width: '50%', display: 'inline-block' };
			var prevClassName = prefix + '-button ' + prefix + '-prev-button';
			var nextClassName = prefix + '-button ' + prefix + '-next-button';
			return _react2['default'].createElement(
				'div',
				{ className: prefix },
				_react2['default'].createElement(
					'div',
					{ style: style },
					_react2['default'].createElement('button', { type: 'button', className: prevClassName, onClick: this.handlerChangeShownYear.bind(this, -1) }),
					_react2['default'].createElement(
						'select',
						{ style: { fontSize: 14 }, value: shownDate.getFullYear(), onChange: this.handlerChangeShownYear.bind(this) },
						years
					),
					_react2['default'].createElement('button', { type: 'button', className: nextClassName, onClick: this.handlerChangeShownYear.bind(this, 1) })
				),
				_react2['default'].createElement(
					'div',
					{ style: style },
					_react2['default'].createElement('button', { type: 'button', className: prevClassName, onClick: this.handlerChangeShownMonth.bind(this, -1) }),
					_react2['default'].createElement(
						'select',
						{ onChange: this.handlerChangeShownMonth.bind(this), value: shownDate.getMonth() },
						DateHelper.Months.map(function (month, i) {
							return _react2['default'].createElement(
								'option',
								{ key: i + '', value: i },
								month
							);
						})
					),
					_react2['default'].createElement('button', { type: 'button', className: nextClassName, onClick: this.handlerChangeShownMonth.bind(this, 1) })
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
			    invalidDates = _props2.invalidDates;


			var shownDate = this.getShownDate();
			var date = this.getDate();

			var days = DateHelper.getDatesInCalendarMonth(shownDate);

			var today = new Date();
			var className = _consts.calendarPrefix + '-day';
			var dayCells = days.map(function (_date, index) {

				var isSelected = !range && date && DateHelper.isSameDate(date, _date);
				//用于范围选择
				var isPassive = !DateHelper.isSameYearAndMonth(shownDate, _date);
				var isInRange = range && DateHelper.isBetween(_date, range.startDate, range.endDate); // checkRange(_date, range)
				var isStartEdge = range && DateHelper.isSameDate(_date, range.startDate);
				var isEndEdge = range && DateHelper.isSameDate(_date, range.endDate);
				var isEdge = isStartEdge || isEndEdge;

				var isToday = DateHelper.isSameDate(_date, today);
				var isInvalid = typeof invalidDates === 'function' ? invalidDates(new Date(_date)) : false;
				if (minDate || maxDate) {
					isInvalid = isInvalid && !DateHelper.isBetween(_date, minDate, maxDate); // isOusideMinMax(_date, minDate, maxDate)
				}
				return _react2['default'].createElement(_DayCell2['default'], {
					onSelect: _this2.handlerChange.bind(_this2, 'date'),
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
			var _props3 = this.props,
			    time = _props3.time,
			    second = _props3.second,
			    range = _props3.range;

			if (time) {
				var disabled = !this.getDate() && (!range || !range.startDate);
				return _react2['default'].createElement(_Time2['default'], { second: second,
					disabled: disabled,
					date: this.getTime(),
					onChange: this.handlerChange.bind(this, 'time') });
			}
		}
	}, {
		key: 'renderBtns',
		value: function renderBtns() {
			var confirm = this.props.confirm;

			var btns = [];
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
	second: true
};