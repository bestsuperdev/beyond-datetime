'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _consts = require('./utils/consts');

var _DateHelper = require('./utils/DateHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function toDoubleDigits(number) {
	return number < 10 ? '0' + number : number;
}

var Time = function (_Component) {
	_inherits(Time, _Component);

	function Time(props) {
		_classCallCheck(this, Time);

		var _this = _possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this, props));

		var date = props.defaultDate instanceof Date ? new Date(props.defaultDate) : (0, _DateHelper.getInitTime)();
		_this.state = { date: date };
		return _this;
	}

	_createClass(Time, [{
		key: 'getDate',
		value: function getDate() {
			var date = this.props.date || this.state.date;
			return new Date(date);
		}
	}, {
		key: 'handlerChange',
		value: function handlerChange(type, event) {
			var onChange = this.props.onChange;

			var number = +event.target.value;
			var date = this.getDate();
			date[type](number);
			var result = void 0;
			if (typeof onChange === 'function') {
				result = onChange(date);
			}
			if (result !== false) {
				this.setState({ date: new Date(date) });
			}
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
		key: 'renderSelector',
		value: function renderSelector(type, count, value) {
			var options = [];
			for (var i = 0; i < count; i++) {
				options.push(_react2['default'].createElement(
					'option',
					{ key: i, value: i },
					toDoubleDigits(i)
				));
			}
			return _react2['default'].createElement(
				'select',
				{ disabled: this.props.disabled, value: value, onChange: this.handlerChange.bind(this, type) },
				options
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    second = _props.second,
			    confirm = _props.confirm;

			var date = this.props.date || this.state.date;
			return _react2['default'].createElement(
				'div',
				{ className: _consts.timePrefix },
				_react2['default'].createElement(
					'div',
					{ className: _consts.timePrefix + '-cell' },
					this.renderSelector('setHours', 24, date.getHours())
				),
				_react2['default'].createElement(
					'div',
					{ className: _consts.timePrefix + '-mini-cell' },
					':'
				),
				_react2['default'].createElement(
					'div',
					{ className: _consts.timePrefix + '-cell' },
					this.renderSelector('setMinutes', 60, date.getMinutes())
				),
				second && _react2['default'].createElement(
					'div',
					{ className: _consts.timePrefix + '-mini-cell' },
					':'
				),
				second && _react2['default'].createElement(
					'div',
					{ className: _consts.timePrefix + '-cell' },
					this.renderSelector('setSeconds', 60, date.getSeconds())
				),
				confirm && _react2['default'].createElement(
					'div',
					{ className: _consts.timePrefix + '-cell' },
					_react2['default'].createElement(
						'button',
						{ type: 'button', onClick: this.handlerConfirm.bind(this), className: _consts.timePrefix + '-confirm-btn' },
						'\u786E\u5B9A'
					)
				)
			);
		}
	}]);

	return Time;
}(_react.Component);

exports['default'] = Time;


Time.defaultProps = {
	second: true,
	disabled: false,
	hideOnConfirm: true
};