import React, { Component, PropTypes } from 'react';

export default class TileControls extends Component {
  static propTypes = {
    id:          PropTypes.string,
    parentId:    PropTypes.string,
    orient:      PropTypes.string,
    isWrapper:   PropTypes.bool,
    hasSiblings: PropTypes.bool,
    sizeUnit:    PropTypes.number,
    actions:     PropTypes.object,
  }

  constructor( props ) {
    super( props );
    this._handleAdd = this._handleAdd.bind( this );
    this._handleDelete = this._handleDelete.bind( this );
    this._handleRotate = this._handleRotate.bind( this );
    this._handleContentClick = this._handleContentClick.bind( this );
    this._handleContentChange = this._handleContentChange.bind( this );
  }

  render () {
    const { id, isWrapper, hasSiblings, sizeUnit, actions: { sizeTile } } = this.props;

    return (
      <div style={ styles.container }>
        <i className='btl bt-plus-circle' style={ styles.button } onClick={ this._handleAdd }/>
        { id !== 'root' && <i className='btl bt-trash' style={ styles.button } onClick={ this._handleDelete }/> }
        { hasSiblings &&
          <span>
            <i className='btl bt-redo' style={ styles.button } onClick={ this._handleRotate }/>
            <i className='btl bt-maximize' style={ styles.button } onClick={ this._getSizeHandler( sizeTile, id, sizeUnit ) }/>
            <i className='btl bt-minimize' style={ styles.button } onClick={ this._getSizeHandler( sizeTile, id, -sizeUnit ) }/>
          </span>
        }
        { !isWrapper &&
          <select style={ styles.selectContent } onClick={ this._handleContentClick } onChange={ this._handleContentChange }>
            <option value=''>Empty</option>
            <option value='content_a'>Content A</option>
            <option value='content_b'>Content B</option>
            <option value='content_c'>Content C</option>
          </select>
        }
      </div>
    );
  }

  _handleAdd( e ) {
    e.stopPropagation();
    const { id, actions: { addTile } } = this.props;
    addTile( id );
  }

  _handleDelete( e ) {
    e.stopPropagation();
    const { id, actions: { deleteTile } } = this.props;
    deleteTile( id );
  }

  _handleRotate( e ) {
    e.stopPropagation();
    const { id, parentId, isWrapper, actions: { rotateTiles } } = this.props;
    const idToRotate = isWrapper ? id : parentId;  // orientation is defined at wrapper-level only
    rotateTiles( idToRotate );
  }

  // curried helper to deliver the sizing handler, with additive or subtr value
  _getSizeHandler( action, id, amount ) {
    return function( e ) {
      e.stopPropagation();
      action( id, amount );
    };
  }

  _handleContentClick( e ) {
    e.stopPropagation();
  }

  _handleContentChange( e ) {
    e.stopPropagation();
    const { id, actions: { setTile } } = this.props;
    setTile( id, { children: e.target.value } );
  }

}


const styles = {
  container: {
    position: 'absolute',
    top: '6%',
    left: 10,
    zIndex: 1,
    textAlign: 'right'
  },
  button: {
    float: 'left',
    cursor: 'pointer',
    color: '#F05A6D',
    fontSize: 24,
    marginRight: 10,
    marginBottom: 10
  },
  selectContent: {
    clear: 'both',
    display: 'block',
    fontSize: 10,
  }
};
