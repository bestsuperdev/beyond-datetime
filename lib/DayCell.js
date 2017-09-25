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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DayCell = function (_Component) {
	(0, _inherits3['default'])(DayCell, _Component);

	function DayCell(props) {
		(0, _classCallCheck3['default'])(this, DayCell);
		return (0, _possibleConstructorReturn3['default'])(this, (DayCell.__proto__ || (0, _getPrototypeOf2['default'])(DayCell)).call(this, props));
	}

	(0, _createClass3['default'])(DayCell, [{
		key: 'handlerSelect',
		value: function handlerSelect() {
			var _props = this.props,
			    isInvalid = _props.isInvalid,
			    date = _props.date,
			    onSelect = _props.onSelect;

			if (!isInvalid && typeof onSelect === 'function') {
				onSelect(new Date(date));
			}
		}
	}, {
		key: 'handlerMouseEnter',
		value: function handlerMouseEnter() {
			var _props2 = this.props,
			    isInvalid = _props2.isInvalid,
			    date = _props2.date,
			    onHover = _props2.onHover;

			if (!isInvalid && typeof onHover === 'function') {
				onHover(new Date(date));
			}
		}
	}, {
		key: 'getClassNames',
		value: function getClassNames() {
			var className = this.props.className;

			if (className) {
				var _classnames;

				var _props3 = this.props,
				    isSelected = _props3.isSelected,
				    isInRange = _props3.isInRange,
				    isPassive = _props3.isPassive,
				    isInvalid = _props3.isInvalid,
				    isToday = _props3.isToday;

				return (0, _classnames3['default'])((_classnames = {}, (0, _defineProperty3['default'])(_classnames, className, true), (0, _defineProperty3['default'])(_classnames, className + '-selected', !isInvalid && isSelected), (0, _defineProperty3['default'])(_classnames, className + '-passive', isPassive), (0, _defineProperty3['default'])(_classnames, className + '-invalid', isInvalid), (0, _defineProperty3['default'])(_classnames, className + '-inrange', isInRange), (0, _defineProperty3['default'])(_classnames, className + '-today', isToday), _classnames));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props4 = this.props,
			    date = _props4.date,
			    isInvalid = _props4.isInvalid;

			if (date) {
				var props = {
					className: this.getClassNames()
				};
				if (!isInvalid) {
					props.onClick = this.handlerSelect.bind(this);
					props.onMouseEnter = this.handlerMouseEnter.bind(this);
				}
				return _react2['default'].createElement(
					'span',
					props,
					date.getDate()
				);
			}
		}
	}]);
	return DayCell;
}(_react.Component);

// DayCell.propTypes = {
//   dayMoment   : PropTypes.object.isRequired,
//   onSelect    : PropTypes.func,
//   isSelected  : PropTypes.bool,
//   isInRange   : PropTypes.bool,
//   isPassive   : PropTypes.bool,
//   classNames  : PropTypes.string
// }


exports['default'] = DayCell;