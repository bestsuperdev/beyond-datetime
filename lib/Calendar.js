'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _consts = require('./utils/consts');

var _parseInput = require('./utils/parseInput.js');

var _parseInput2 = _interopRequireDefault(_parseInput);

var _DayCell = require('./DayCell.js');

var _DayCell2 = _interopRequireDefault(_DayCell);

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('moment/locale/zh-cn');


_moment2['default'].locale('zh-cn');
function checkRange(dayMoment, range) {
  return dayMoment.isBetween(range['startDate'], range['endDate']) || dayMoment.isBetween(range['endDate'], range['startDate']);
}

function checkStartEdge(dayMoment, range) {
  var startDate = range.startDate;

  return dayMoment.isSame(startDate, 'day');
  // return dayMoment.diff(startDate,'date') === 0;
}

function checkEndEdge(dayMoment, range) {
  var endDate = range.endDate;

  return dayMoment.isSame(endDate, 'day');
  // return dayMoment.diff(endDate,'date') === 0;
}

function isOusideMinMax(dayMoment, minDate, maxDate, format) {
  return minDate && dayMoment.isBefore((0, _parseInput2['default'])(minDate, format)) || maxDate && dayMoment.isAfter((0, _parseInput2['default'])(maxDate, format));
}

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props, context) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props, context));

    var date = props.date;
    var format = props.format;
    var range = props.range;
    var offset = props.offset;
    var firstDayOfWeek = props.firstDayOfWeek;
    var time = props.time;
    // console.log(date)
    // date = 

    date = (0, _parseInput2['default'])(date, format);
    _this.state = {
      date: date,
      timeDate: time ? date : null,
      shownDate: (range && range['endDate'] || date || (0, _moment2['default'])()).clone().add(offset, 'months'),
      firstDayOfWeek: firstDayOfWeek || _moment2['default'].localeData().firstDayOfWeek()
    };

    // this.state  = state;
    // this.styles = getTheme(theme);
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var date = nextProps.date;
      var isInvalid = nextProps.isInvalid;
      var format = nextProps.format;
      var time = nextProps.time;

      if (date != null) {
        // date = parseInput(date,format)
        if (typeof isInvalid !== 'function' || !isInvalid(date)) {
          this.setState(function (state, props) {
            return { date: (0, _parseInput2['default'])(date, format), timeDate: time ? (0, _parseInput.parseTimeInput)(date, format) : null };
          });
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var onInit = _props.onInit;
      var format = _props.format;
      var date = this.state.date;

      onInit && onInit(date);
    }
  }, {
    key: 'getShownDate',
    value: function getShownDate() {
      var _props2 = this.props;
      var link = _props2.link;
      var offset = _props2.offset;


      var shownDate = link ? link.clone().add(offset, 'months') : this.state.shownDate;

      return shownDate;
    }
  }, {
    key: 'handlerConfirm',
    value: function handlerConfirm() {
      // event.preventDefault()
      var onConfirm = this.props.onConfirm;
      var date = this.state.date;

      onConfirm && onConfirm(date);
    }
  }, {
    key: 'handlerDateSelect',
    value: function handlerDateSelect(newDate, type) {
      var _props3 = this.props;
      var link = _props3.link;
      var onChange = _props3.onChange;
      var time = _props3.time;

      var result = null;
      var _state = this.state;
      var date = _state.date;
      var timeDate = _state.timeDate;


      newDate.hours(timeDate ? timeDate.hours() : 0);
      newDate.minutes(timeDate ? timeDate.minutes() : 0);
      newDate.seconds(timeDate ? timeDate.seconds() : 0);

      if (typeof onChange === 'function') {
        result = onChange(newDate.clone(), type);
      }

      if (!link && result !== false) {
        this.setState({ date: newDate });
      }

      return false;
    }
  }, {
    key: 'handlerTimeSelect',
    value: function handlerTimeSelect(newDate, type) {
      var _props4 = this.props;
      var link = _props4.link;
      var onChange = _props4.onChange;
      var time = _props4.time;

      var result = null;
      var _state2 = this.state;
      var date = _state2.date;
      var timeDate = _state2.timeDate;

      if (date == null) {
        this.setState(function (state, props) {
          return { timeDate: newDate };
        });
      } else {
        // newDate =
        var _date = this.state.date.clone();

        _date.hours(newDate ? newDate.hours() : 0);
        _date.minutes(newDate ? newDate.minutes() : 0);
        _date.seconds(newDate ? newDate.seconds() : 0);
        // let date = newDate.
        // const { date } = this.state;
        if (typeof onChange === 'function') {
          result = onChange(_date.clone(), type);
        }
        // onChange && ;

        if (!link && result !== false) {
          this.setState({ date: _date, timeDate: newDate });
        }
      }
      return false;
    }
  }, {
    key: 'changeMonth',
    value: function changeMonth(direction, event) {
      event.preventDefault();
      var _props5 = this.props;
      var link = _props5.link;
      var linkCB = _props5.linkCB;


      if (link && linkCB) {
        return linkCB(direction);
      }

      var current = this.state.shownDate.month();
      var newMonth = this.state.shownDate.clone().add(direction, 'months');

      this.setState({
        shownDate: newMonth
      });
    }
  }, {
    key: 'changeYear',
    value: function changeYear(direction, event) {
      event.preventDefault();
      var _props6 = this.props;
      var link = _props6.link;
      var linkCB = _props6.linkCB;


      if (link && linkCB) {
        return linkCB(direction);
      }

      var current = this.state.shownDate.year();
      var shownDate = this.state.shownDate.clone().add(direction, 'years');

      this.setState({ shownDate: shownDate });
    }
  }, {
    key: 'handlerChangeShownMonth',
    value: function handlerChangeShownMonth(event) {
      var month = +event.target.value;
      var shownDate = this.getShownDate();
      shownDate = shownDate.clone().month(month);
      this.setState(function (state, props) {
        return { shownDate: shownDate };
      });
    }
  }, {
    key: 'handlerChangeShownYear',
    value: function handlerChangeShownYear(event) {
      var year = +event.target.value;
      var shownDate = this.getShownDate();
      shownDate = shownDate.clone().year(year);
      this.setState(function (state, props) {
        return { shownDate: shownDate };
      });
    }
  }, {
    key: 'renderMonthAndYear',
    value: function renderMonthAndYear() {
      var shownDate = this.getShownDate();
      var currentYear = (0, _moment2['default'])().year();
      var currentShownYear = shownDate.year();
      var prefix = _consts.calendarPrefix + '-month-and-year';
      var months = [];
      var years = [];
      for (var i = 0; i < 12; i++) {
        months.push(_react2['default'].createElement(
          'option',
          { key: i, value: i },
          _moment2['default'].months(i)
        ));
      }
      var startYear = currentYear - 45;
      var endYear = currentYear + 10;
      if (currentShownYear < startYear) {
        years.push(_react2['default'].createElement(
          'option',
          { key: currentShownYear, value: currentShownYear },
          currentShownYear
        ));
      }
      for (var _i = startYear; _i <= endYear; _i++) {
        years.push(_react2['default'].createElement(
          'option',
          { key: _i, value: _i },
          _i
        ));
      }
      if (currentShownYear > endYear) {
        years.push(_react2['default'].createElement(
          'option',
          { key: currentShownYear, value: currentShownYear },
          currentShownYear
        ));
      }
      var style = { width: '50%', display: 'inline-block', verticalAlign: 'top' };
      return _react2['default'].createElement(
        'div',
        { className: prefix },
        _react2['default'].createElement(
          'div',
          { style: style },
          _react2['default'].createElement(
            'button',
            { className: prefix + '-button ' + prefix + '-prev-button', onClick: this.changeMonth.bind(this, -1) },
            _react2['default'].createElement('i', null)
          ),
          _react2['default'].createElement(
            'select',
            { onChange: this.handlerChangeShownMonth.bind(this), value: shownDate.month() },
            months
          ),
          _react2['default'].createElement(
            'button',
            { className: prefix + '-button ' + prefix + '-next-button', onClick: this.changeMonth.bind(this, 1) },
            _react2['default'].createElement('i', null)
          )
        ),
        _react2['default'].createElement(
          'div',
          { style: style },
          _react2['default'].createElement(
            'button',
            { className: prefix + '-button ' + prefix + '-prev-button', onClick: this.changeYear.bind(this, -1) },
            _react2['default'].createElement('i', null)
          ),
          _react2['default'].createElement(
            'select',
            { value: shownDate.year(), onChange: this.handlerChangeShownYear.bind(this) },
            years
          ),
          _react2['default'].createElement(
            'button',
            { className: prefix + '-button ' + prefix + '-next-button', onClick: this.changeYear.bind(this, 1) },
            _react2['default'].createElement('i', null)
          )
        )
      );
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays() {
      var dow = this.state.firstDayOfWeek;
      var weekdays = [];
      // const { styles }      = this;
      // const { onlyClasses } = this.props;

      for (var i = dow; i < 7 + dow; i++) {
        var day = _moment2['default'].weekdaysMin(i);

        weekdays.push(_react2['default'].createElement(
          'span',
          { key: day },
          day
        ));
      }

      return _react2['default'].createElement(
        'div',
        { className: _consts.calendarPrefix + '-weekdays' },
        weekdays
      );
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _this2 = this;

      // TODO: Split this logic into smaller chunks
      // const { styles }               = this;

      var _props7 = this.props;
      var range = _props7.range;
      var minDate = _props7.minDate;
      var maxDate = _props7.maxDate;
      var format = _props7.format;
      var isInvalid = _props7.isInvalid;


      var shownDate = this.getShownDate();
      var _state3 = this.state;
      var date = _state3.date;
      var firstDayOfWeek = _state3.firstDayOfWeek;


      var monthNumber = shownDate.month();
      var dayCount = shownDate.daysInMonth();
      var startOfMonth = shownDate.clone().startOf('month').isoWeekday();

      var lastMonth = shownDate.clone().month(monthNumber - 1);
      var lastMonthNumber = lastMonth.month();
      var lastMonthDayCount = lastMonth.daysInMonth();

      var nextMonth = shownDate.clone().month(monthNumber + 1);
      var nextMonthNumber = nextMonth.month();

      var days = [];

      // Previous month's days
      var diff = Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7;
      for (var i = diff - 1; i >= 0; i--) {
        var dayMoment = lastMonth.clone().date(lastMonthDayCount - i);
        days.push({ dayMoment: dayMoment, isPassive: true });
      }

      // Current month's days
      for (var _i2 = 1; _i2 <= dayCount; _i2++) {
        var _dayMoment = shownDate.clone().date(_i2);
        days.push({ dayMoment: _dayMoment });
      }

      // Next month's days
      var remainingCells = 42 - days.length; // 42cells = 7days * 6rows
      for (var _i3 = 1; _i3 <= remainingCells; _i3++) {
        var _dayMoment2 = nextMonth.clone().date(_i3);
        days.push({ dayMoment: _dayMoment2, isPassive: true });
      }

      var today = (0, _moment2['default'])(); //.startOf('day');
      return days.map(function (data, index) {
        var dayMoment = data.dayMoment;
        var isPassive = data.isPassive;

        var isSelected = !range && dayMoment.isSame(date, 'day');
        //用于范围选择
        var isInRange = range && checkRange(dayMoment, range);
        var isStartEdge = range && checkStartEdge(dayMoment, range);
        var isEndEdge = range && checkEndEdge(dayMoment, range);
        var isEdge = isStartEdge || isEndEdge;

        var isToday = today.isSame(dayMoment, 'day');
        var invalid = isInvalid ? isInvalid(dayMoment) : false;
        var isOutsideMinMax = isOusideMinMax(dayMoment, minDate, maxDate, format);
        // console.log(isOutsideMinMax)
        // console.log(isEdge)
        return _react2['default'].createElement(_DayCell2['default'], _extends({
          onSelect: _this2.handlerDateSelect.bind(_this2)
        }, data, {
          // theme={ styles }
          //用于范围选择
          isStartEdge: isStartEdge,
          isEndEdge: isEndEdge,
          isSelected: isSelected || isEdge,
          isInRange: isInRange,

          isToday: isToday,
          key: index,
          isPassive: isPassive,
          isInvalid: invalid || isOutsideMinMax
          // onlyClasses = { onlyClasses }
          , classNames: _consts.calendarPrefix + '-day'
        }));
      });
    }
  }, {
    key: 'renderTime',
    value: function renderTime() {
      var _props8 = this.props;
      var time = _props8.time;
      var hour = _props8.hour;
      var minute = _props8.minute;
      var second = _props8.second;
      var confirm = _props8.confirm;

      if (time) {
        return _react2['default'].createElement(
          'div',
          { style: { position: 'relative' } },
          _react2['default'].createElement(_Time2['default'], {
            confirm: confirm,
            date: this.state.timeDate,
            hour: hour,
            minute: minute,
            second: second,
            onChange: this.handlerTimeSelect.bind(this),
            onConfirm: this.handlerConfirm.bind(this) })
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: '' + _consts.calendarPrefix },
        this.renderMonthAndYear(),
        this.renderWeekdays(),
        _react2['default'].createElement(
          'div',
          null,
          this.renderDays()
        ),
        this.renderTime()
      );
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.defaultProps = {
  format: _consts.dateFormat,
  classNames: {},
  hour: true,
  minute: true,
  second: true
};

Calendar.propTypes = {
  sets: _react.PropTypes.string,
  range: _react.PropTypes.shape({
    startDate: _react.PropTypes.object,
    endDate: _react.PropTypes.object
  }),
  minDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  maxDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  date: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string, _react.PropTypes.func]),
  format: _react.PropTypes.string.isRequired,
  firstDayOfWeek: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  onChange: _react.PropTypes.func,
  onInit: _react.PropTypes.func,
  isInvalid: _react.PropTypes.func,
  link: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    startDate: _react.PropTypes.object,
    endDate: _react.PropTypes.object
  }), _react.PropTypes.bool]),
  linkCB: _react.PropTypes.func,
  // theme          : PropTypes.object,
  // onlyClasses    : PropTypes.bool,
  classNames: _react.PropTypes.object,
  time: _react.PropTypes.bool
};

exports['default'] = Calendar;