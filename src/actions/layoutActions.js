export const SET_TILE = 'SET_TILE';
export const ADD_TILE = 'ADD_TILE';
export const DELETE_TILE = 'DELETE_TILE';
export const ROTATE_TILES = 'ROTATE_TILES';
export const SIZE_TILE = 'SIZE_TILE';

export function setTile( tileId, data ) {
  return {
    type: SET_TILE,
    tileId,
    data
  };
}

export function deleteTile( tileId ) {
  return {
    type: DELETE_TILE,
    tileId
  };
}

export function addTile( tileId ) {
  return {
    type: ADD_TILE,
    tileId
  };
}

export function rotateTiles( tileId ) {
  return {
    type: ROTATE_TILES,
    tileId
  };
}

export function sizeTile( tileId, amount ) {
  return {
    type: SIZE_TILE,
    tileId,
    amount
  };
}
