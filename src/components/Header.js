import React, { Component, PropTypes } from 'react';
import { PageHeader, Grid } from 'react-bootstrap';


export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string
  };

  static defaultProps = {
    title: 'React App'
  };

  render () {
    return (
      <div style={ styles.container }>
        <Grid>
          <h4>
            <i className='btl bt-th bt-2x' />&nbsp;&nbsp;
            { this.props.title }
          </h4>
        </Grid>
      </div>
    );
  }
}


const styles = {
  container: {
    backgroundColor: '#F05A6D',
    color: '#DDD',
    padding: '10px 0'
  }
}
