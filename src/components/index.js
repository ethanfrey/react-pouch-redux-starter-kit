'use strict';

import React from 'react';
import { connect } from 'react-redux';


let PeopleList = React.createClass({
  propTypes: {
    people: React.PropTypes.array
  },

  render() {
    let {people} = this.props;
    console.log('people', people)
    return (
      <div>
        <h3>Index</h3>
        <ul>
          {people.map(item => <li>{item.name}</li>)}
        </ul>
      </div>
    );
  }
});

export default connect(mapStateToProps)(PeopleList);

function mapStateToProps(state) {
  console.log(state);
  return {
    people: state.people || []
  };
}
