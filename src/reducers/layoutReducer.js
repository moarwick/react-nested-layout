import { SET_TILE, ADD_TILE, DELETE_TILE, ROTATE_TILES, SIZE_TILE } from '../actions/layoutActions';
import { shortUID } from '../utils/utils';

// set state defaults
const INITIAL_STATE = {
  tiles: { id: 'root', size: 100, isSelected: false }
};


export default function layoutReducer( state=INITIAL_STATE, action ) {

  switch( action.type ) {

    case SET_TILE: {
      const { tileId, data } = action;
      const tiles = findTileAndSetData( state.tiles, tileId, data );
      return { ...state, tiles: tiles };
    }

    case ADD_TILE: {
      const { tileId } = action;
      const tiles = findTileAndAddChild( state.tiles, tileId );
      return { ...state, tiles: tiles };
    }

    case DELETE_TILE: {
      const { tileId } = action;
      const tiles = findTileAndDelete( state.tiles, tileId );
      return { ...state, tiles: tiles };
    }

    case ROTATE_TILES: {
      const { tileId } = action;
      const tiles = findTileAndRotate( state.tiles, tileId );
      return { ...state, tiles: tiles };
    }

    case SIZE_TILE: {
      const { tileId, amount } = action;
      const tiles = findTileAndSize( state.tiles, tileId, amount );
      return { ...state, tiles: tiles };
    }

    default:
      return state;
  }
}


/*
 * Helper to generate a new tile object, with a unique id
 */
export function newTile() {
  return { id: shortUID(), size: 100 };
}


/*
 * Recursive helper to locate a tile object by id, and extend it with the supplied data
 */
export function findTileAndSetData( obj, id, data ) {
  let result;

  // if tile found, extend it..
  if ( obj.id === id ) {
    result = { ...obj, ...data };

  // otherwise, unselect any other tile..
  } else {
    result = { ...obj, isSelected: false };
  }

  // and, recurse down if children exist..
  if ( Array.isArray( result.children ) ) {
    const newChildren = result.children.map( nextObj => findTileAndSetData( nextObj, id, data ) );
    return { ...result, children: newChildren };
  }

  return result;
}


/*
 * Recursive helper to locate a tile object by id, and add a child to it
 */
export function findTileAndAddChild( obj, id ) {
  let result = { ...obj };

  // if tile found..
  if ( obj.id === id || !id ) {

    // if childran array already exists..
    if ( Array.isArray( obj.children ) ) {
      // push one new elem to it..
      result.children.push( newTile() );

      // but if the array was initially empty, push one more elem
      // because we always want to split a wrapper into two children
      if ( obj.children.length === 1 ) {
        result.children.push( newTile() );
      }

    // otherwise, add a new children array with two elems
    } else {
      result.children = [ newTile(), newTile() ];
    }

    return result;
  }

  // otherwise, recurse down if children exist..
  if ( Array.isArray( result.children ) ) {
    const newChildren = result.children.map( nextObj => findTileAndAddChild( nextObj, id ) );
    return { ...result, children: newChildren };
  }

  return result;
}


/*
 * Recursive helper to locate a tile object by its id, and delete it
 */
export function findTileAndDelete( obj, id ) {

  // if tile found, null it out..
  if ( obj.id === id ) { return null; }

  const result = { ...obj };

  // otherwise, iterate down if children exist..
  if ( Array.isArray( result.children ) ) {
    let newChildren = result.children.map( nextObj => findTileAndDelete( nextObj, id ) );
    newChildren = newChildren.filter( obj => obj );   // filter out the nulls
    return { ...result, children: newChildren };
  }

  return result;
}


/*
 * Recursive helper to locate a tile wrapper by id, and change its orientation
 */
export function findTileAndRotate( obj, id ) {
  let result;

  // if tile found, check if it's a wrapper...
  if ( obj.id === id ) {
    const orient = obj.orient === 'v' ? 'h' : 'v';
    result = { ...obj, orient: orient };
    return result;

  } else {
    result = { ...obj };
  }

  // otherwise, iterate down if children exist..
  if ( Array.isArray( result.children ) ) {
    const newChildren = result.children.map( nextObj => findTileAndRotate( nextObj, id ) );
    return { ...result, children: newChildren };
  }

  return result;
}


/*
 * Recursive helper to locate a tile by id, and add positive or negative value
 */
export function findTileAndSize( obj, id, amount ) {
  let result;

  // if tile found, add the amount..
  if ( obj.id === id ) {
    result = { ...obj, size: obj.size + amount };
    return result;

  } else {
    result = { ...obj };
  }

  // otherwise, iterate down if children exist..
  if ( Array.isArray( result.children ) ) {
    const newChildren = result.children.map( nextObj => findTileAndSize( nextObj, id, amount ) );
    return { ...result, children: newChildren };
  }

  return result;
}
