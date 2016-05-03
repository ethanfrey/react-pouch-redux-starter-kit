'use strict';

import React from 'react';
import { connect } from 'react-redux';


let PeopleList = React.createClass({
  propTypes: {
    people: React.PropTypes.array
  },

  render() {
    return (
      <div>
        <h3>Index</h3>
      </div>
    );
  }
});

export default connect(mapStateToProps)(PeopleList);

function mapStateToProps(state) {
  console.log(state);
  return {
    people: state.people
  };
}
