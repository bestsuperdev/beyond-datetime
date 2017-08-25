'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _position = require('./utils/position');

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <Trigger target={<DateRange time ranges={defaultRanges} />}  wrapStyle={}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	<input type="text"/>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               </Trigger>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs');
var assign = require('beyond-lib/lib/assign');

var Trigger = function (_Component) {
	_inherits(Trigger, _Component);

	function Trigger(props) {
		_classCallCheck(this, Trigger);

		var _this = _possibleConstructorReturn(this, (Trigger.__proto__ || Object.getPrototypeOf(Trigger)).call(this, props));

		_this.state = {
			showTarget: false,
			targetWrapStyle: null
		};
		_this.innerClick = false;
		_this.wrap = null;
		_this.hasEvents = false;
		_this.handlerHideCalendar = _this.handlerHideCalendar.bind(_this);
		_this.handlerInnerClick = _this.handlerInnerClick.bind(_this);
		return _this;
	}

	_createClass(Trigger, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.wrap && !this.hasEvents) {
				this.hasEvents = true;
				this.wrap.addEventListener('click', this.handlerInnerClick);
				document.addEventListener('click', this.handlerHideCalendar);
			}
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			if (this.wrap && !nextState.showTarget) {
				this.hasEvents = false;
				this.wrap.removeEventListener('click', this.handlerInnerClick);
				document.removeEventListener('click', this.handlerHideCalendar);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.wrap && this.hasEvents) {
				this.wrap.removeEventListener('click', this.handlerInnerClick);
				document.removeEventListener('click', this.handlerHideCalendar);
			}
		}
	}, {
		key: 'handlerInnerClick',
		value: function handlerInnerClick() {
			this.innerClick = true;
		}
	}, {
		key: 'handlerHideCalendar',
		value: function handlerHideCalendar() {
			var self = this;
			setTimeout(function () {
				if (!self.innerClick) {
					self.setState({ showTarget: false });
				}
				self.innerClick = false;
			}, 50);
		}
	}, {
		key: 'handlerClick',
		value: function handlerClick(event) {
			var targetWrapStyle = (0, _position2['default'])(event.target, this.props.target.props.ranges && this.props.target.props.ranges.length > 0);
			this.setState({ showTarget: true, targetWrapStyle: targetWrapStyle });
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    wrapStyle = _props.wrapStyle,
			    className = _props.className,
			    type = _props.type;


			if (children) {
				var props = children.props;
				children = _react2['default'].cloneElement(children, { onClick: mergeFuncs(props.onClick, this.handlerClick.bind(this)) });
				var style = assign({ display: 'inline-block', position: 'relative' }, wrapStyle);
				return _react2['default'].createElement(type, { style: style, className: className }, children, this.renderTarget());
			}
		}
	}, {
		key: 'renderTarget',
		value: function renderTarget() {
			var _this2 = this;

			var _state = this.state,
			    showTarget = _state.showTarget,
			    targetWrapStyle = _state.targetWrapStyle;
			var target = this.props.target;

			if (showTarget && target) {
				var _target$props = target.props,
				    onConfirm = _target$props.onConfirm,
				    onChange = _target$props.onChange;
				var _target$props2 = target.props,
				    hideOnConfirm = _target$props2.hideOnConfirm,
				    hideOnChange = _target$props2.hideOnChange;

				var props = {};
				if (hideOnConfirm) {
					props.confirm = true;
					props.onConfirm = mergeFuncs(onConfirm, this.handlerHideCalendar);
				}
				if (hideOnChange) {
					props.onChange = mergeFuncs(onChange, this.handlerHideCalendar);
				}
				var style = assign({}, targetWrapStyle);
				return _react2['default'].createElement(
					'div',
					{ ref: function ref(wrap) {
							return _this2.wrap = wrap;
						}, style: style },
					_react2['default'].cloneElement(target, props)
				);
			}
		}
	}]);

	return Trigger;
}(_react.Component);

exports['default'] = Trigger;


Trigger.defaultProps = {
	type: 'span'
};