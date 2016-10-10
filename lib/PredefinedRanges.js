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

var _consts = require('./utils/consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classnames = require('classnames');

var PredefinedRanges = function (_Component) {
  _inherits(PredefinedRanges, _Component);

  function PredefinedRanges(props, context) {
    _classCallCheck(this, PredefinedRanges);

    return _possibleConstructorReturn(this, (PredefinedRanges.__proto__ || Object.getPrototypeOf(PredefinedRanges)).call(this, props, context));
  }

  _createClass(PredefinedRanges, [{
    key: 'handleSelect',
    value: function handleSelect(name, event) {
      event.preventDefault();

      var range = this.props.ranges[name];

      this.props.onSelect({
        startDate: (0, _parseInput2['default'])(range['startDate']),
        endDate: (0, _parseInput2['default'])(range['endDate'])
      }, 'ranges');
    }
  }, {
    key: 'renderRangeList',
    value: function renderRangeList() {
      var _this2 = this;

      var _props = this.props;
      var ranges = _props.ranges;
      var range = _props.range;
      // const { styles } = this;

      return Object.keys(ranges).map(function (name) {
        var active = (0, _parseInput2['default'])(ranges[name].startDate).isSame(range.startDate, 'day') && (0, _parseInput2['default'])(ranges[name].endDate).isSame(range.endDate, 'day') ? 'active' : null;

        return _react2['default'].createElement(
          'a',
          {
            href: '#',
            key: 'range-' + name,
            className: classnames(_consts.predefinedRangesPrefix + '-item', active)
            // style={ onlyClasses ? undefined : style }
            , onClick: _this2.handleSelect.bind(_this2, name)
          },
          name
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: _consts.predefinedRangesPrefix },
        this.renderRangeList()
      );
    }
  }]);

  return PredefinedRanges;
}(_react.Component);

PredefinedRanges.propTypes = {
  ranges: _react.PropTypes.object.isRequired
};

exports['default'] = PredefinedRanges;