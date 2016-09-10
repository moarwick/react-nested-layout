import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid } from 'react-bootstrap';

import Header from './components/Header';
import MasterLayout from './containers/MasterLayout';


// the main App component, includes other sub-components
class App extends Component {

  render() {
    return (
      <div>
        <Header title='React Nested Layout'/>
        <Grid>
          <MasterLayout/>
        </Grid>
      </div>
    );
  }
}

export default connect( ( state ) => {
  return state;
})( App );
