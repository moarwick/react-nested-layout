import React, { Component, PropTypes } from 'react';

import TileControls from './TileControls';
import { rescaleNum } from '../utils/utils';

export const SIZE_UNIT_PCT = 10;


export default class TileTree extends Component {
  static propTypes = {
    tile:    PropTypes.object,           // passed in when first called
    actions: PropTypes.shape({
      setTile:     PropTypes.funct,
      addTile:     PropTypes.funct,
      deleteTile:  PropTypes.funct,
      rotateTiles: PropTypes.funct,
      sizeTile:    PropTypes.funct,
    }),

    parentId:          PropTypes.string,  // passed in at recursion
    orient:            PropTypes.string,
    hasSiblings:       PropTypes.bool,
    childrenSizeTotal: PropTypes.number,
  }

  constructor( props ) {
    super( props );

    this.state = {
      isSelected: false
    };

    this._handleSelectClick = this._handleSelectClick.bind( this );
  }


  _handleSelectClick ( e ) {
    e.stopPropagation();
    const tileId = this.props.tile.isSelected ? this.props.parentId : this.props.tile.id;
    this.props.actions.setTile( tileId, { isSelected: true } );
  }


  render () {
    let content;
    const {
      tile,
      actions,
      parentId=null,
      orient='h',
      hasSiblings=false,
      childrenSizeTotal=100
    } = this.props;

    const isWrapper = Array.isArray( tile.children ) && tile.children.length > 0;
    const isSelected = tile.isSelected;

    const siblingsSizeTotal = childrenSizeTotal;
    const hasMultipleChildren = isWrapper && tile.children.length > 1;
    const nextChildrenSizeTotal = isWrapper ? tile.children.reduce( (r, p) => r + ( p.size || 1 ), 0 ) : null;
    const size = rescaleNum( tile.size || 100, 0, siblingsSizeTotal, 0, 100 );

    const layoutStyles = orient === 'h' ?
      { display: 'inline-block', float: 'left', width: `${ size }%`, height: '100%' } :
      { display: 'block', height:`${ size }%` };

    const borderStyles = isSelected ? ( isWrapper ? styles.borderWrapperSelected : styles.borderSelected ) : ( isWrapper ? {} : styles.borderDefault );

    const tileStyle = { ...styles.tile, ...layoutStyles, ...borderStyles };

    if ( isWrapper ) {
      content = tile.children.map( ( nextPanel ) => {
        return (
          <TileTree
            key={ nextPanel.id }
            tile={ nextPanel }
            actions={ actions }
            parentId={ tile.id }
            orient={ tile.orient }
            hasSiblings={ hasMultipleChildren }
            childrenSizeTotal={ nextChildrenSizeTotal }
          />
        );
      });

    } else {
      content = isWrapper ? '' : tile.children || tile.id;
    }

    return (
      <span style={ tileStyle } onClick={ this._handleSelectClick }>
        <span style={ styles.content }>{ content }</span>
        { isSelected &&
          <TileControls
            id={ tile.id }
            parentId={ parentId }
            orient={ tile.orient }
            isWrapper={ isWrapper }
            hasSiblings={ hasSiblings }
            sizeUnit={ siblingsSizeTotal * ( SIZE_UNIT_PCT / 100 ) }
            actions={ actions }
          />
        }
      </span>
    );
  }
}


const styles = {
  tile: {
    position: 'relative',
    boxSizing: 'border-box',
  },
  borderDefault: {
    border: '1px dotted #F05A6D'
  },
  borderWrapperSelected: {
    border: '2px dashed #F05A6D'
  },
  borderSelected: {
    border: '2px solid #F05A6D'
  }
};
