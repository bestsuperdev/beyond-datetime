'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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

    var format = props.format;
    var linkedCalendars = props.linkedCalendars;
    var theme = props.theme;

    var startDate = (0, _parseInput2['default'])(props.startDate, format);
    var endDate = (0, _parseInput2['default'])(props.endDate, format);

    _this.state = {
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
      var startDate = range.startDate;
      var endDate = range.endDate;

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
    key: 'setRange',
    value: function setRange(range, force) {
      var onChange = this.props.onChange;

      range = this.orderRange(range);
      var result = null;
      if (typeof onChange === 'function' && !force) {
        result = onChange(range);
      }
      if (result !== false || force) {
        this.setState({ range: range });
      }
      // onChange && onChange(range);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(index, date, type) {
      // console.log(index)
      if (type === 'time') {
        var _state$range = this.state.range;
        var _startDate = _state$range.startDate;
        var _endDate = _state$range.endDate;
        // let nextS

        if (index === 0) {
          _startDate = date;
        } else if (index === 1) {
          _endDate = date;
        }
        if (index === 0 || index === 1) {
          return this.setRange({ startDate: _startDate, endDate: _endDate });
        }
      }

      // if (type === 'ranges') {
      //   let {range} = this.state
      //   date
      // }

      if (date.startDate && date.endDate) {
        if (type === 'ranges') {
          var _range = this.state.range;

          date.startDate.hour(_range.startDate.hour());
          date.startDate.minute(_range.startDate.minute());
          date.startDate.second(_range.startDate.second());

          date.endDate.hour(_range.endDate.hour());
          date.endDate.minute(_range.endDate.minute());
          date.endDate.second(_range.endDate.second());
        }
        this.step = 0;
        return this.setRange(date);
      }

      var _state$range2 = this.state.range;
      var startDate = _state$range2.startDate;
      var endDate = _state$range2.endDate;


      var range = {
        startDate: startDate,
        endDate: endDate
      };

      switch (this.step) {
        case 0:
          range['startDate'] = date;
          range['endDate'] = date;
          this.step = 1;
          break;

        case 1:
          range['endDate'] = date;
          this.step = 0;
          break;
      }

      this.setRange(range);
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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      // Whenever date props changes, update state with parsed variant
      if (newProps.startDate || newProps.endDate) {
        var startDate = newProps.startDate && (0, _parseInput2['default'])(newProps.startDate, newProps.format);
        var endDate = newProps.endDate && (0, _parseInput2['default'])(newProps.endDate, newProps.format);
        var oldStartDate = this.props.startDate && (0, _parseInput2['default'])(this.props.startDate, this.props.format);
        var oldEndDate = this.props.endDate && (0, _parseInput2['default'])(this.props.endDate, this.props.format);

        if (!startDate.isSame(oldStartDate) || !endDate.isSame(oldEndDate)) {
          this.setRange({
            startDate: startDate || oldStartDate,
            endDate: endDate || oldEndDate
          }, true);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var ranges = _props.ranges;
      var format = _props.format;
      var linkedCalendars = _props.linkedCalendars;
      var calendars = _props.calendars;
      var firstDayOfWeek = _props.firstDayOfWeek;
      var minDate = _props.minDate;
      var maxDate = _props.maxDate;
      var isInvalid = _props.isInvalid;
      var time = _props.time;
      var hour = _props.hour;
      var minute = _props.minute;
      var second = _props.second;
      var _state = this.state;
      var range = _state.range;
      var link = _state.link;
      // const { styles } = this;

      // const classes = { ...defaultClasses, ...classNames };

      return _react2['default'].createElement(
        'div',
        { className: _consts.dateRangePrefix },
        ranges && _react2['default'].createElement(_PredefinedRanges2['default'], {
          ranges: ranges,
          range: range,
          onSelect: this.handleSelect.bind(this, -1)
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
              range: range,
              format: format,
              firstDayOfWeek: firstDayOfWeek,
              isInvalid: isInvalid
              // theme={ styles }
              , minDate: minDate,
              maxDate: maxDate,
              time: time,
              hour: hour,
              minute: minute,
              second: second

              // onlyClasses={ onlyClasses }
              // classNames={ classes }
              , onChange: _this2.handleSelect.bind(_this2, i) }));
          }
          return _calendars;
        }()
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
  // calendars       : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  endDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  minDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  maxDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  dateLimit: _react.PropTypes.func,
  ranges: _react.PropTypes.object,
  linkedCalendars: _react.PropTypes.bool,
  // theme           : PropTypes.object,
  onInit: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  isInvalid: _react.PropTypes.func
};

exports['default'] = DateRange;