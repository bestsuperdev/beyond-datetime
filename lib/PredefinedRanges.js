'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateHelper = require('./utils/DateHelper');

var _consts = require('./utils/consts');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classnames = require('classnames');

function parseRange(fn, asyncTimeDate) {
	var date = fn((0, _moment2['default'])());
	// async time
	if (asyncTimeDate) {
		date.hours(asyncTimeDate.hours());
		date.minutes(asyncTimeDate.minutes());
		date.seconds(asyncTimeDate.seconds());
	}
	return date;
}

var PredefinedRanges = function (_Component) {
	_inherits(PredefinedRanges, _Component);

	function PredefinedRanges(props, context) {
		_classCallCheck(this, PredefinedRanges);

		return _possibleConstructorReturn(this, (PredefinedRanges.__proto__ || Object.getPrototypeOf(PredefinedRanges)).call(this, props, context));
	}

	_createClass(PredefinedRanges, [{
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