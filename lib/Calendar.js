'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Component) {
	_inherits(Calendar, _Component);

	function Calendar(props, context) {
		_classCallCheck(this, Calendar);

		var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props, context));

		var defaultDate = props.defaultDate,
		    defaultShownDate = props.defaultShownDate;

		var date = defaultDate instanceof Date ? new Date(defaultDate) : null;
		var shownDate = defaultShownDate instanceof Date ? new Date(defaultShownDate) : new Date();
		shownDate.setDate(1);

		_this.state = { date: date, shownDate: shownDate };
		return _this;
	}

	_createClass(Calendar, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var onInit = this.props.onInit;

			if (typeof onInit === 'function') {
				onInit(this.getDate());
			}
		}
	}, {
		key: 'getDate',
		value: function getDate() {
			var date = this.props.date || this.state.date;
			return date ? new Date(date) : null;
		}
	}, {
		key: 'getTime',
		value: function getTime() {
			var timeDate = this.props.date || this.state.date || DateHelper.getInitTime();
			return timeDate && this.props.time ? new Date(timeDate) : null;
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
		key: 'handlerDateChange',
		value: function handlerDateChange(date) {
			if (this.props.time) {
				var time = this.getTime();
				date = DateHelper.syncTime(date, time);
			}
			return this.handlerChange(date);
		}
	}, {
		key: 'handlerTimeChange',
		value: function handlerTimeChange(timeDate) {
			var date = this.getDate();
			if (date) {
				date = DateHelper.syncTime(date, timeDate);
				return this.handlerChange(date);
			}
		}
	}, {
		key: 'handlerChange',
		value: function handlerChange(date) {
			var onChange = this.props.onChange;

			var result = null;
			if (typeof onChange === 'function') {
				result = onChange(new Date(date));
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
						{ value: shownDate.getFullYear(), onChange: this.handlerChangeShownYear.bind(this) },
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

			var _props = this.props,
			    range = _props.range,
			    minDate = _props.minDate,
			    maxDate = _props.maxDate,
			    invalidDates = _props.invalidDates;


			var shownDate = this.getShownDate();
			var date = this.getDate();

			var days = DateHelper.getDatesInCalendarMonth(shownDate, this.getTime());

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
					onSelect: _this2.handlerChange.bind(_this2),
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
			var _props2 = this.props,
			    time = _props2.time,
			    second = _props2.second;

			if (time) {
				return _react2['default'].createElement(_Time2['default'], { second: second,
					disabled: !this.getDate(),
					date: this.getTime(),
					onChange: this.handlerChange.bind(this) });
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
	initTime: true,
	second: true
	// yearLowerLimit:-1,
	// yearUpperLimit:-1
};