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

var _DateHelper = require('./utils/DateHelper');

var _consts = require('./utils/consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var classnames = require('classnames');

var PredefinedRanges = function (_Component) {
	(0, _inherits3['default'])(PredefinedRanges, _Component);

	function PredefinedRanges(props, context) {
		(0, _classCallCheck3['default'])(this, PredefinedRanges);
		return (0, _possibleConstructorReturn3['default'])(this, (PredefinedRanges.__proto__ || (0, _getPrototypeOf2['default'])(PredefinedRanges)).call(this, props, context));
	}

	(0, _createClass3['default'])(PredefinedRanges, [{
		key: 'handleSelect',
		value: function handleSelect(i, event) {
			event.preventDefault();
			var ranges = this.props.ranges;

			var startDate = ranges[i].startDate(new Date());
			var endDate = ranges[i].endDate(new Date());
			this.props.onSelect({ startDate: startDate, endDate: endDate });
		}
	}, {
		key: 'renderRangeList',
		value: function renderRangeList() {
			var _this2 = this;

			var _props = this.props,
			    ranges = _props.ranges,
			    startDate = _props.startDate,
			    endDate = _props.endDate;

			ranges = ranges || [];
			return ranges.map(function (range, i) {
				var startDateFunc = range.startDate,
				    endDateFunc = range.endDate,
				    name = range.name;

				var active = (0, _DateHelper.isSameDate)(startDateFunc(new Date()), startDate) && (0, _DateHelper.isSameDate)(endDateFunc(new Date()), endDate) && 'active';

				return _react2['default'].createElement(
					'a',
					{ href: '#',
						key: i + '',
						className: classnames(_consts.predefinedRangesPrefix + '-item', active),
						onClick: _this2.handleSelect.bind(_this2, i) },
					name
				);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: _consts.predefinedRangesPrefix, style: this.props.style },
				this.renderRangeList()
			);
		}
	}]);
	return PredefinedRanges;
}(_react.Component);

exports['default'] = PredefinedRanges;