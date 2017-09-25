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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _position = require('./utils/position');

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs'); /*
                                                                 <Trigger target={<DateRange time ranges={defaultRanges} />}  wrapStyle={}>
                                                                 	<input type="text"/>
                                                                 </Trigger>
                                                                 */

var assign = require('beyond-lib/lib/assign');

var Trigger = function (_Component) {
	(0, _inherits3['default'])(Trigger, _Component);

	function Trigger(props) {
		(0, _classCallCheck3['default'])(this, Trigger);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (Trigger.__proto__ || (0, _getPrototypeOf2['default'])(Trigger)).call(this, props));

		_this.state = {
			showTarget: false,
			targetWrapStyle: null
		};
		_this.innerClick = false;
		_this.wrap = null;

		_this.hideTarget = _this.hideTarget.bind(_this);
		_this.handlerInnerClick = _this.handlerInnerClick.bind(_this);
		return _this;
	}

	(0, _createClass3['default'])(Trigger, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener('click', this.hideTarget);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('click', this.hideTarget);
			if (this.wrap) {
				_reactDom2['default'].unmountComponentAtNode(this.wrap);
			}
		}
	}, {
		key: 'handlerInnerClick',
		value: function handlerInnerClick() {
			this.innerClick = true;
		}
	}, {
		key: 'hideTarget',
		value: function hideTarget() {
			var _this2 = this;

			var self = this;
			setTimeout(function () {
				if (!self.innerClick && _this2.wrap) {
					_reactDom2['default'].unmountComponentAtNode(_this2.wrap);
				}
				self.innerClick = false;
			}, 50);
		}
	}, {
		key: 'handlerClick',
		value: function handlerClick(event) {
			var target = this.props.target;

			if (target) {
				this.handlerInnerClick();
				var targetWrapStyle = (0, _position2['default'])(event.target, target);
				this.showTarget(targetWrapStyle);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var children = this.props.children;

			if (children) {
				var props = children.props;
				return _react2['default'].cloneElement(children, { onClick: mergeFuncs(props.onClick, this.handlerClick.bind(this)) });
			}
		}
	}, {
		key: 'showTarget',
		value: function showTarget(targetWrapStyle) {
			if (!this.wrap) {
				this.wrap = document.createElement('div');
				document.body.appendChild(this.wrap);
			} else {
				_reactDom2['default'].unmountComponentAtNode(this.wrap);
			}
			var target = this.props.target;

			if (target) {
				assign(this.wrap.style, targetWrapStyle);
				// this.wrap.style = targetWrapStyle
				var _target$props = target.props,
				    onConfirm = _target$props.onConfirm,
				    onChange = _target$props.onChange;

				var props = {};
				if (onConfirm) {
					props.confirm = true;
					props.onConfirm = mergeFuncs(onConfirm, this.hideTarget);
				} else if (!onConfirm && onChange) {
					props.onChange = mergeFuncs(onChange, this.hideTarget);
				}
				_reactDom2['default'].render(_react2['default'].createElement(
					'div',
					{ onClick: this.handlerInnerClick },
					_react2['default'].cloneElement(target, props)
				), this.wrap);
			}
		}
	}]);
	return Trigger;
}(_react.Component);

exports['default'] = Trigger;


Trigger.defaultProps = {
	type: 'span'
};