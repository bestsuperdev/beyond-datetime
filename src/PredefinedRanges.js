import React, { Component, PropTypes } from 'react';
import parseInput from './utils/parseInput.js';
import {predefinedRangesPrefix} from './utils/consts'
const classnames = require('classnames')

class PredefinedRanges extends Component {

  constructor(props, context) {
    super(props, context)
  }

  handleSelect(name, event) {
    event.preventDefault();

    const range = this.props.ranges[name];

    this.props.onSelect({
      startDate : parseInput(range['startDate']),
      endDate   : parseInput(range['endDate'])
    },'ranges')
  }

  renderRangeList() {
    const { ranges, range } = this.props;
    // const { styles } = this;

    return Object.keys(ranges).map(name => {
      const active = (
        parseInput(ranges[name].startDate).isSame(range.startDate,'day') &&
        parseInput(ranges[name].endDate).isSame(range.endDate,'day')
      ) ? 'active' : null

      return (
        <a
          href='#'
          key={'range-' + name}
          className={classnames(`${predefinedRangesPrefix}-item`,active)}
          // style={ onlyClasses ? undefined : style }
          onClick={this.handleSelect.bind(this, name)}
        >
          {name}
        </a>
      );
    });
  }

  render() {
    return (
      <div className={predefinedRangesPrefix}>
        { this.renderRangeList() }
      </div>
    );
  }
}


PredefinedRanges.propTypes = {
  ranges      : PropTypes.object.isRequired
}

export default PredefinedRanges;
