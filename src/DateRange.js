import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import parseInput from './utils/parseInput.js';
import Calendar from './Calendar.js';
import PredefinedRanges from './PredefinedRanges.js';
import {dateRangePrefix} from './utils/consts'

class DateRange extends Component {

  constructor(props, context) {
    super(props, context);

    const { format, linkedCalendars, theme } = props;
    const startDate = parseInput(props.startDate, format);
    const endDate   = parseInput(props.endDate, format);

    this.state = {
      range     : { startDate, endDate },
      link      : linkedCalendars && endDate,
    }

    this.step = 0;
    // this.styles = getTheme(theme);
  }

  componentDidMount() {
    const { onInit } = this.props
    const {range} = this.state
    onInit && onInit(range)
  }

  orderRange(range) {
    const { startDate, endDate } = range;
    const swap = startDate.isAfter(endDate);

    if (!swap) return range;

    return {
      startDate : endDate,
      endDate   : startDate
    }
  }

  setRange(range,force) {
    const {onChange } = this.props
    range = this.orderRange(range)
    let result = null
    if (typeof onChange === 'function') {
      result = onChange(range)
    }
    if (result !== false || force) {
      this.setState({ range });
    }
    // onChange && onChange(range);
  }

  handleSelect(index,date,type) {
    // console.log(index)
    if ( type === 'time') {
      let {startDate,endDate} = this.state.range
      // let nextS
      if (index === 0) {
        startDate = date
        
      }else if(index === 1){
        endDate = date
      }
      if (index === 0 || index === 1) {
        return this.setRange({startDate,endDate})
      }
    }

    // if (type === 'ranges') {
    //   let {range} = this.state
    //   date
    // }

    if (date.startDate && date.endDate) {
      if (type === 'ranges') {
        let {range} = this.state
        date.startDate.hour(range.startDate.hour())
        date.startDate.minute(range.startDate.minute())
        date.startDate.second(range.startDate.second())

        date.endDate.hour(range.endDate.hour())
        date.endDate.minute(range.endDate.minute())
        date.endDate.second(range.endDate.second())
      }
      this.step = 0;
      return this.setRange(date);
    }

    const { startDate, endDate } = this.state.range;

    const range = {
      startDate : startDate,
      endDate   : endDate
    };

    switch (this.step) {
      case 0:
        range['startDate'] = date;
        range['endDate'] = date;
        this.step = 1;
        break;

      case 1:
        range['endDate'] = date;
        this.step = 0;
        break;
    }

    this.setRange(range);
  }

  handleLinkChange(direction) {
    const { link } = this.state;

    this.setState({
      link : link.clone().add(direction, 'months')
    });
  }

  componentWillReceiveProps(newProps) {
    // Whenever date props changes, update state with parsed variant
    if (newProps.startDate || newProps.endDate) {
      const startDate    = newProps.startDate   && parseInput(newProps.startDate, newProps.format);
      const endDate      = newProps.endDate     && parseInput(newProps.endDate, newProps.format);
      const oldStartDate = this.props.startDate && parseInput(this.props.startDate, this.props.format)
      const oldEndDate   = this.props.endDate   && parseInput(this.props.endDate, this.props.format)

      if (!startDate.isSame(oldStartDate) || !endDate.isSame(oldEndDate)) {
        this.setRange({
          startDate: startDate || oldStartDate,
          endDate: endDate || oldEndDate
        },true);
      }
    }
  }

  render() {
    const { ranges, format, linkedCalendars, calendars, firstDayOfWeek, minDate, maxDate, isInvalid,time,hour,minute,second } = this.props;
    const { range, link } = this.state;
    // const { styles } = this;

    // const classes = { ...defaultClasses, ...classNames };

    return (
      <div className={dateRangePrefix}>
        { ranges && (
          <PredefinedRanges
            ranges={ ranges }
            range={ range }
            onSelect={this.handleSelect.bind(this,-1)}
          />
        )}

        {(()=>{
          const _calendars = [];
          // const len = 2 //Number(calendars)
          for (let i = 0; i < 2; i++) {
            _calendars.push(
              <Calendar
                key={i}
                offset={ i-1 }
                link={ linkedCalendars && link }
                linkCB={ this.handleLinkChange.bind(this) }
                range={ range }
                format={ format }
                firstDayOfWeek={ firstDayOfWeek }
                isInvalid={isInvalid}
                // theme={ styles }
                minDate={ minDate }
                maxDate={ maxDate }
                time={time}
                hour={hour}
                minute={minute}
                second={second}

		// onlyClasses={ onlyClasses }
                // classNames={ classes }
                onChange={ this.handleSelect.bind(this,i) }  />
            );
          }
          return _calendars;
        })()}
      </div>
    );
  }
}

DateRange.defaultProps = {
  linkedCalendars : false
}

DateRange.propTypes = {
  format          : PropTypes.string,
  time : PropTypes.bool,
  firstDayOfWeek  : PropTypes.number,
  // calendars       : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startDate       : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  endDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  minDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  maxDate         : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  dateLimit       : PropTypes.func,
  ranges          : PropTypes.object,
  linkedCalendars : PropTypes.bool,
  // theme           : PropTypes.object,
  onInit          : PropTypes.func,
  onChange        : PropTypes.func,
  isInvalid       : PropTypes.func,
  // onlyClasses     : PropTypes.bool,
  // classNames      : PropTypes.object
}

export default DateRange;
