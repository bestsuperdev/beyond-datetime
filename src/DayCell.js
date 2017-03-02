import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class DayCell extends Component {

  constructor(props, context) {
    super(props, context);
  }


  handleSelect(event) {
    event.preventDefault();

    if (this.props.isInvalid) return null;

    this.props.onSelect(this.props.dayMoment,'date')
  }


  getClassNames() {
    const { classNames } = this.props;
    const { isSelected, isInRange, isPassive,isInvalid, isToday } = this.props;

    return classnames({
      [classNames]       : true,
      [`${classNames}-selected`] :!isInvalid && isSelected ,
      [`${classNames}-passive`]: isPassive,
      [`${classNames}-invalid`]: isInvalid,
      [`${classNames}-inrange`]: isInRange,
      // [classes.dayStartEdge] : isStartEdge,
      // [classes.dayEndEdge] : isEndEdge,
      [`${classNames}-today`] : isToday
    });

  }

  render() {
    const { dayMoment } = this.props

    // const { styles } = this;
    // const stateStyle = this.getStateStyles();
    const classes    = this.getClassNames()

    return (
      <span
        onClick={ this.handleSelect.bind(this) }
        className={ classes }
        >
        { dayMoment.date() }
      </span>
    );
  }
}

DayCell.propTypes = {
  dayMoment   : PropTypes.object.isRequired,
  onSelect    : PropTypes.func,
  isSelected  : PropTypes.bool,
  isInRange   : PropTypes.bool,
  isPassive   : PropTypes.bool,
  classNames  : PropTypes.string
}

export default DayCell;
