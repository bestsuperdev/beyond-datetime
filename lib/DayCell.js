'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DayCell = function (_Component) {
  _inherits(DayCell, _Component);

  function DayCell(props, context) {
    _classCallCheck(this, DayCell);

    return _possibleConstructorReturn(this, (DayCell.__proto__ || Object.getPrototypeOf(DayCell)).call(this, props, context));
  }

  _createClass(DayCell, [{
    key: 'handleSelect',
    value: function handleSelect(event) {
      event.preventDefault();

      if (this.props.isInvalid) return null;

      this.props.onSelect(this.props.dayMoment, 'date');
    }
  }, {
    key: 'getClassNames',
    value: function getClassNames() {
      var _classnames;

      var classNames = this.props.classNames;
      var _props = this.props,
          isSelected = _props.isSelected,
          isInRange = _props.isInRange,
          isPassive = _props.isPassive,
          isInvalid = _props.isInvalid,
          isStartEdge = _props.isStartEdge,
          isEndEdge = _props.isEndEdge,
          isToday = _props.isToday;


      return (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, classNames, true), _defineProperty(_classnames, classNames + '-selected', !isInvalid && isSelected), _defineProperty(_classnames, classNames + '-passive', isPassive), _defineProperty(_classnames, classNames + '-invalid', isInvalid), _defineProperty(_classnames, classNames + '-inrange', isInRange), _defineProperty(_classnames, classNames + '-today', isToday), _classnames));
    }
  }, {
    key: 'render',
    value: function render() {
      var dayMoment = this.props.dayMoment;

      // const { styles } = this;
      // const stateStyle = this.getStateStyles();

      var classes = this.getClassNames();

      return _react2['default'].createElement(
        'span',
        {
          onClick: this.handleSelect.bind(this),
          className: classes
        },
        dayMoment.date()
      );
    }
  }]);

  return DayCell;
}(_react.Component);

DayCell.propTypes = {
  dayMoment: _react.PropTypes.object.isRequired,
  onSelect: _react.PropTypes.func,
  isSelected: _react.PropTypes.bool,
  isInRange: _react.PropTypes.bool,
  isPassive: _react.PropTypes.bool,
  classNames: _react.PropTypes.string
};

exports['default'] = DayCell;