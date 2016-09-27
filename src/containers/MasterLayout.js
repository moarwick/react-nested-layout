import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import TileTree from '../components/TileTree';

import { setTile, addTile, deleteTile, rotateTiles, sizeTile } from '../actions/layoutActions';


class MasterLayout extends Component {
  static propTypes = {
    layout:      PropTypes.object,
    setTile:     PropTypes.func,
    addTile:     PropTypes.func,
    deleteTile:  PropTypes.func,
    rotateTiles: PropTypes.func,
    sizeTile:    PropTypes.func
  }

  render() {
    const { layout, setTile, addTile, deleteTile, rotateTiles, sizeTile } = this.props;
    const actions = {
      setTile,
      addTile,
      deleteTile,
      rotateTiles,
      sizeTile
    };

    return (
      <div style={ styles.container }>
        <Row style={ styles.infoRow }>
          <Col xs={ 8 }>
            <div>&raquo; Click a tile to select it (solid border)</div>
            <div>&raquo; Click it again to select its wrapper (dashed border)</div>
            <div>&raquo; Action icons appear depending on what&#39;s selected</div>
            <div>&raquo; To add sibling tiles, do it at the wrapper level</div>
          </Col>
          <Col xs={ 4 }>
            <div><i className='btl bt-plus-circle'/>&nbsp;&nbsp;Add child tile</div>
            <div><i className='btl bt-trash'/>&nbsp;&nbsp;Delete tile</div>
            <div><i className='btl bt-redo'/>&nbsp;&nbsp;Change wrapper orientation</div>
            <div><i className='btl bt-maximize'/>&nbsp;&nbsp;Size tile up</div>
            <div><i className='btl bt-minimize'/>&nbsp;&nbsp;Size tile down</div>
          </Col>
        </Row>
        <Row>
          <Col md={ 8 } xs={ 12 }>
            <div style={ styles.tileGridWrapper }>
              <div style={ styles.tileGridRatio }>
                <div style={ styles.tileGrid }>
                  <TileTree
                    key={ layout.tiles.id }
                    tile={ layout.tiles }
                    actions={ actions }
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col md={ 4 } xs={ 12 }>
            <pre style={ styles.code }>{ JSON.stringify( layout.tiles, null, 2 ) }</pre>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ( state ) => ({
    layout: state.layout
  }),
  ( dispatch ) => bindActionCreators({
    setTile,
    addTile,
    deleteTile,
    rotateTiles,
    sizeTile
  }, dispatch )
)( MasterLayout );


const styles = {
  container: {
    marginTop: 20
  },
  infoRow: {
    marginBottom: 10
  },
  tileGridWrapper: {
    backgroundColor: '#E1F0F5',
    width: '100%',
    marginBottom: 10
  },
  tileGridRatio: {
    position: 'relative',
    paddingTop: '75%',        // controls main wrapper ratio
  },
  tileGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  code: {
    fontSize: 9,
    backgroundColor: '#E1F0F5',
  }

};
