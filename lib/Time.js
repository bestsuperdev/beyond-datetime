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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function toDoubleDigits(number) {
	return number < 10 ? '0' + number : number;
} /*
  filter(hour,time,second){
  	return [[1,2,3,4,5,6,7,8,9,10,11,12],[],[]]
  }
  
  */

var Time = function (_Component) {
	(0, _inherits3['default'])(Time, _Component);

	function Time(props) {
		(0, _classCallCheck3['default'])(this, Time);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (Time.__proto__ || (0, _getPrototypeOf2['default'])(Time)).call(this, props));

		var date = props.defaultDate instanceof Date ? new Date(props.defaultDate) : (0, _DateHelper.getInitTime)();
		_this.state = { date: date };
		return _this;
	}

	(0, _createClass3['default'])(Time, [{
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
		value: function renderSelector(type, value, subFilters) {
			var options = [];
			if (subFilters) {
				subFilters.forEach(function (item) {
					options.push(_react2['default'].createElement(
						'option',
						{ key: item, value: item },
						toDoubleDigits(item)
					));
				});
			} else {
				var count = type === 'setHours' ? 24 : 60;
				for (var i = 0; i < count; i++) {
					options.push(_react2['default'].createElement(
						'option',
						{ key: i, value: i },
						toDoubleDigits(i)
					));
				}
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
			    supportSecond = _props.second,
			    confirm = _props.confirm,
			    filter = _props.filter;

			var date = this.props.date || this.state.date;
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = supportSecond ? date.getSeconds() : 0;
			var filters = typeof filter === 'function' ? filter(hour, minute, second) : null;
			return _react2['default'].createElement(
				'div',
				{ className: _consts.selectPrefix },
				_react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-cell' },
					this.renderSelector('setHours', hour, filters ? filters[0] : null)
				),
				_react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-mini-cell' },
					':'
				),
				_react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-cell' },
					this.renderSelector('setMinutes', minute, filters ? filters[1] : null)
				),
				supportSecond && _react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-mini-cell' },
					':'
				),
				supportSecond && _react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-cell' },
					this.renderSelector('setSeconds', second, filters ? filters[2] : null)
				),
				confirm && _react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-cell' },
					_react2['default'].createElement(
						'button',
						{ type: 'button', onClick: this.handlerConfirm.bind(this), className: _consts.selectPrefix + '-confirm-btn' },
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
	__type: 'Time'
	// hideOnConfirm : true
};