import React, { Component, PropTypes } from 'react';
import moment from 'moment';
require('moment/locale/zh-cn');
import {dateFormat,calendarPrefix} from './utils/consts'
import parseInput , {parseTimeInput} from './utils/parseInput.js';
import DayCell from './DayCell.js';
import Time from './Time'


moment.locale('zh-cn')
function checkRange(dayMoment, range) {
  return (
    dayMoment.isBetween(range['startDate'], range['endDate']) ||
    dayMoment.isBetween(range['endDate'], range['startDate'])
  )
}

function checkStartEdge(dayMoment, range) {
  const { startDate } = range;
  return dayMoment.isSame(startDate,'day');
  // return dayMoment.diff(startDate,'date') === 0;
}

function checkEndEdge(dayMoment, range) {
  const { endDate } = range;
  return dayMoment.isSame(endDate,'day');
  // return dayMoment.diff(endDate,'date') === 0;
}

function isOusideMinMax(dayMoment, minDate, maxDate, format) {
  return (
    (minDate && dayMoment.isBefore(parseInput(minDate, format))) ||
    (maxDate && dayMoment.isAfter(parseInput(maxDate, format)))
  )
}

class Calendar extends Component {

  constructor(props, context) {
    super(props, context);

    let {date, format, range, offset, firstDayOfWeek, time } = props;
    // console.log(date)
    // date = 
    date = parseInput(date, format)
    this.state = {
      date,
      timeDate : time ? date : null,
      shownDate : ((range && range['endDate']) || date || moment()).clone().add(offset, 'months'),
      firstDayOfWeek: (firstDayOfWeek || moment.localeData().firstDayOfWeek())
    }

    // this.state  = state;
    // this.styles = getTheme(theme);
  }

  componentWillReceiveProps(nextProps) {
    let {date,isInvalid,format, time} = nextProps
    if (date != null) {
      // date = parseInput(date,format)
      if (typeof isInvalid !== 'function' || !isInvalid(date) ) {
        this.setState((state, props) => ({date : parseInput(date,format), timeDate : time ? parseTimeInput(date,format) : null  }))
      }
    }
  }

  componentDidMount() {
    const { onInit,format } = this.props;
    const {date} = this.state
    onInit && onInit(date)
  }

  getShownDate() {
    const { link, offset } = this.props;

    const shownDate = (link) ? link.clone().add(offset, 'months') : this.state.shownDate;

    return shownDate;
  }

  handlerConfirm(){
    // event.preventDefault()
    const {onConfirm} = this.props
    const {date} = this.state
    onConfirm && onConfirm(date)
  }

  handlerDateSelect(newDate,type) {
    const { link, onChange, time } = this.props
    let result = null
    let {date,timeDate} = this.state

    newDate.hours(timeDate ? timeDate.hours() : 0)
    newDate.minutes(timeDate ? timeDate.minutes() : 0)
    newDate.seconds(timeDate ? timeDate.seconds() : 0)

    if (typeof onChange === 'function') {
        result = onChange(newDate.clone(), type)
    }

    if (!link && result !== false) {
        this.setState({ date : newDate });
    }

    return false
  }

  handlerTimeSelect(newDate,type) {
    const { link, onChange, time } = this.props
    let result = null
    let {date,timeDate} = this.state
    if (date == null) {
      this.setState((state, props) => ({timeDate : newDate}))
    }else{
      // newDate =
      let date = this.state.date.clone()

      date.hours(newDate ? newDate.hours() : 0)
      date.minutes(newDate ? newDate.minutes() : 0)
      date.seconds(newDate ? newDate.seconds() : 0)
      // let date = newDate.
      // const { date } = this.state;
      if (typeof onChange === 'function') {
          result = onChange(date.clone(), type)
      }
      // onChange && ;

      if (!link && result !== false) {
          this.setState({ date,timeDate : newDate });
      }
    }
    return false
  }

  changeMonth(direction, event) {
    event.preventDefault();
    const { link, linkCB } = this.props;

    if (link && linkCB) {
      return linkCB(direction);
    }

    const current  = this.state.shownDate.month();
    const newMonth = this.state.shownDate.clone().add(direction, 'months');

    this.setState({
      shownDate : newMonth
    });
  }

  changeYear(direction, event) {
    event.preventDefault();
    const { link, linkCB } = this.props;

    if (link && linkCB) {
      return linkCB(direction);
    }

    const current  = this.state.shownDate.year();
    const shownDate = this.state.shownDate.clone().add(direction, 'years');

    this.setState({shownDate})
  }

  handlerChangeShownMonth(event){
    let month = +event.target.value
    let shownDate = this.getShownDate()
    shownDate = shownDate.clone().month(month)
    this.setState((state, props) => ({shownDate}))
  }

  handlerChangeShownYear(event){
    let year = +event.target.value
    let shownDate = this.getShownDate()
    shownDate = shownDate.clone().year(year)
    this.setState((state, props) => ({shownDate}))
  }

  renderMonthAndYear() {
    const shownDate       = this.getShownDate();
    const currentYear = moment().year()
    const currentShownYear = shownDate.year()
    const prefix = `${calendarPrefix}-month-and-year`
    const months = []
    const years = []
    for(let i = 0; i < 12; i++){
      months.push(<option key={i} value={i}>{moment.months(i)}</option>)
    }
    let startYear = currentYear - 45
    let endYear = currentYear + 10
    if (currentShownYear < startYear) {
      years.push(<option key={currentShownYear} value={currentShownYear}>{currentShownYear}</option>)
    }
    for(let i = startYear; i <= endYear; i++ ){
      years.push(<option key={i} value={i}>{i}</option>)
    }
    if (currentShownYear > endYear) {
      years.push(<option key={currentShownYear} value={currentShownYear}>{currentShownYear}</option>)
    }
    let style = {width : '50%',display : 'inline-block',verticalAlign: 'top'}
    return (
      <div className={prefix}>
        <div style={style}>
          <button className={`${prefix}-button ${prefix}-prev-button`} onClick={this.changeMonth.bind(this, -1)}><i></i></button>
          <select onChange={this.handlerChangeShownMonth.bind(this)} value={shownDate.month()}>
            {months}
          </select>
          <button className={`${prefix}-button ${prefix}-next-button`} onClick={this.changeMonth.bind(this, 1)}><i></i></button>
        </div>
        <div style={style}>
          <button className={`${prefix}-button ${prefix}-prev-button`} onClick={this.changeYear.bind(this, -1)}><i></i></button>
          <select value={shownDate.year()} onChange={this.handlerChangeShownYear.bind(this)}>
            {years}
          </select>
          <button className={`${prefix}-button ${prefix}-next-button`} onClick={this.changeYear.bind(this, 1)}><i></i></button>
        </div>
      </div>
    )
  }

  renderWeekdays() {
    const dow             = this.state.firstDayOfWeek;
    const weekdays        = [];
    // const { styles }      = this;
    // const { onlyClasses } = this.props;

    for (let i = dow; i < 7 + dow; i++) {
      const day = moment.weekdaysMin(i);

      weekdays.push(
        <span key={day}>{day}</span>
      );
    }

    return <div className={`${calendarPrefix}-weekdays`}>{weekdays}</div>
  }

  renderDays() {
    // TODO: Split this logic into smaller chunks
    // const { styles }               = this;

    const { range, minDate, maxDate, format, isInvalid } = this.props;

    const shownDate                = this.getShownDate();
    const { date, firstDayOfWeek } = this.state;

    const monthNumber              = shownDate.month();
    const dayCount                 = shownDate.daysInMonth();
    const startOfMonth             = shownDate.clone().startOf('month').isoWeekday();

    const lastMonth                = shownDate.clone().month(monthNumber - 1);
    const lastMonthNumber          = lastMonth.month();
    const lastMonthDayCount        = lastMonth.daysInMonth();

    const nextMonth                = shownDate.clone().month(monthNumber + 1);
    const nextMonthNumber          = nextMonth.month();

    const days                     = [];

    // Previous month's days
    const diff = (Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7);
    for (let i = diff-1; i >= 0; i--) {
      const dayMoment  = lastMonth.clone().date(lastMonthDayCount - i);
      days.push({ dayMoment, isPassive : true });
    }

    // Current month's days
    for (let i = 1; i <= dayCount; i++) {
      const dayMoment  = shownDate.clone().date(i);
      days.push({ dayMoment });
    }

    // Next month's days
    const remainingCells = 42 - days.length; // 42cells = 7days * 6rows
    for (let i = 1; i <= remainingCells; i++ ) {
      const dayMoment  = nextMonth.clone().date(i);
      days.push({ dayMoment, isPassive : true });
    }

    const today = moment()//.startOf('day');
    return days.map((data, index) => {
      const { dayMoment, isPassive } = data;
      const isSelected    = !range && (dayMoment.isSame(date ,'day'));
      //用于范围选择
      const isInRange     = range && checkRange(dayMoment, range);
      const isStartEdge   = range && checkStartEdge(dayMoment, range);
      const isEndEdge     = range && checkEndEdge(dayMoment, range);
      const isEdge        = isStartEdge || isEndEdge;
     

      const isToday       = today.isSame(dayMoment,'day');
      const invalid       = isInvalid ? isInvalid(dayMoment) : false
      const isOutsideMinMax = isOusideMinMax(dayMoment, minDate, maxDate, format)
      // console.log(isOutsideMinMax)
      // console.log(isEdge)
      return (
        <DayCell
          onSelect={ this.handlerDateSelect.bind(this) }
          { ...data }
          // theme={ styles }
          //用于范围选择
          isStartEdge = { isStartEdge }
          isEndEdge = { isEndEdge }
          isSelected={ isSelected || isEdge }
          isInRange={ isInRange }
        
          isToday={ isToday }
          key={ index }
          isPassive = { isPassive  }
          isInvalid={invalid || isOutsideMinMax}
          // onlyClasses = { onlyClasses }
          classNames = { `${calendarPrefix}-day` }
        />
      );
    })
  }

  renderTime(){
    let {time,hour,minute,second,confirm} = this.props
    if (time) {
      return (
          <div style={{position : 'relative'}}>
            <Time 
              confirm={confirm}
              date={this.state.timeDate} 
              hour={hour} 
              minute={minute} 
              second={second} 
              onChange={this.handlerTimeSelect.bind(this)}
              onConfirm={this.handlerConfirm.bind(this)}  />
          </div>
        )
    }
  }

  render() {
    return (
      <div className={`${calendarPrefix}`}>
        { this.renderMonthAndYear() }
        { this.renderWeekdays() }
        <div>{ this.renderDays() }</div>
        {this.renderTime()}
      </div>
    )
  }
}

Calendar.defaultProps = {
  format      : dateFormat,
  classNames  : {},
  hour : true,
  minute : true,
  second : true
}

Calendar.propTypes = {
  sets           : PropTypes.string,
  range          : PropTypes.shape({
    startDate    : PropTypes.object,
    endDate      : PropTypes.object
  }),
  minDate        : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  maxDate        : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  date           : PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  format         : PropTypes.string.isRequired,
  firstDayOfWeek : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange       : PropTypes.func,
  onInit         : PropTypes.func,
  isInvalid      : PropTypes.func,
  link           : PropTypes.oneOfType([PropTypes.shape({
    startDate    : PropTypes.object,
    endDate      : PropTypes.object,
  }), PropTypes.bool]),
  linkCB         : PropTypes.func,
  // theme          : PropTypes.object,
  // onlyClasses    : PropTypes.bool,
  classNames     : PropTypes.object,
  time : PropTypes.bool
}

export default Calendar;
