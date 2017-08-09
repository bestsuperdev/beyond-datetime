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

	function DayCell(props) {
		_classCallCheck(this, DayCell);

		return _possibleConstructorReturn(this, (DayCell.__proto__ || Object.getPrototypeOf(DayCell)).call(this, props));
	}

	_createClass(DayCell, [{
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
		key: 'getClassNames',
		value: function getClassNames() {
			var className = this.props.className;

			if (className) {
				var _classnames;

				var _props2 = this.props,
				    isSelected = _props2.isSelected,
				    isInRange = _props2.isInRange,
				    isPassive = _props2.isPassive,
				    isInvalid = _props2.isInvalid,
				    isToday = _props2.isToday;

				return (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, className, true), _defineProperty(_classnames, className + '-selected', !isInvalid && isSelected), _defineProperty(_classnames, className + '-passive', isPassive), _defineProperty(_classnames, className + '-invalid', isInvalid), _defineProperty(_classnames, className + '-inrange', isInRange), _defineProperty(_classnames, className + '-today', isToday), _classnames));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    date = _props3.date,
			    isInvalid = _props3.isInvalid;

			if (date) {
				var props = {
					className: this.getClassNames()
				};
				if (!isInvalid) {
					props.onClick = this.handlerSelect.bind(this);
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