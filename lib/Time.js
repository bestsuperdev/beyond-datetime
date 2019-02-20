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

		var date = (0, _DateHelper.isDate)(props.defaultDate) ? (0, _DateHelper.cloneDate)(props.defaultDate) : (0, _DateHelper.getInitTime)();
		_this.handlerChange = _this.handlerChange.bind(_this);
		_this.state = { date: date };
		_this.hour = null;
		_this.minute = null;
		_this.second = null;
		return _this;
	}

	(0, _createClass3['default'])(Time, [{
		key: 'getTime',
		value: function getTime() {
			var date = (0, _DateHelper.cloneDate)(this.props.date || this.state.date);
			date.setHours(this.hour ? +this.hour.value : 0);
			date.setMinutes(this.minute ? +this.minute.value : 0);
			date.setSeconds(this.second ? +this.second.value : 0);
			return date;
		}
	}, {
		key: 'handlerChange',
		value: function handlerChange() {
			var onChange = this.props.onChange;

			var date = this.getTime();
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
				onConfirm(this.getTime());
			}
		}
	}, {
		key: 'renderSelector',
		value: function renderSelector(count, subFilters) {
			var options = void 0;
			if (subFilters) {
				options = subFilters.filter(function (item) {
					return item < count;
				}).map(function (item) {
					return _react2['default'].createElement(
						'option',
						{ key: item, value: item },
						toDoubleDigits(item)
					);
				});
			} else {
				options = [];
				for (var i = 0; i < count; i++) {
					options.push(_react2['default'].createElement(
						'option',
						{ key: i, value: i },
						toDoubleDigits(i)
					));
				}
			}
			return options;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    supportSecond = _props.second,
			    confirm = _props.confirm,
			    filter = _props.filter,
			    disabled = _props.disabled,
			    language = _props.language;

			var date = this.props.date || this.state.date;
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = supportSecond ? date.getSeconds() : 0;
			filter = typeof filter === 'function' ? filter(new Date(date)) : filter;
			filter = Array.isArray(filter) ? filter : [];
			return _react2['default'].createElement(
				'div',
				{ className: _consts.selectPrefix },
				_react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-cell' },
					_react2['default'].createElement(
						'select',
						{ ref: function ref(select) {
								return _this2.hour = select;
							}, disabled: disabled, value: hour, onChange: this.handlerChange },
						this.renderSelector(24, filter[0])
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-mini-cell' },
					':'
				),
				_react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-cell' },
					_react2['default'].createElement(
						'select',
						{ ref: function ref(select) {
								return _this2.minute = select;
							}, disabled: disabled, value: minute, onChange: this.handlerChange },
						this.renderSelector(60, filter[1])
					)
				),
				supportSecond && _react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-mini-cell' },
					':'
				),
				supportSecond && _react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-cell' },
					_react2['default'].createElement(
						'select',
						{ ref: function ref(select) {
								return _this2.second = select;
							}, disabled: disabled, value: second, onChange: this.handlerChange },
						this.renderSelector(60, filter[2])
					)
				),
				confirm && _react2['default'].createElement(
					'div',
					{ className: _consts.selectPrefix + '-cell' },
					_react2['default'].createElement(
						'button',
						{ type: 'button', onClick: this.handlerConfirm.bind(this), className: _consts.selectPrefix + '-confirm-btn' },
						_DateHelper.languages[language].ok
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
	language: 'cn',
	__type: 'Time'
	// hideOnConfirm : true
};