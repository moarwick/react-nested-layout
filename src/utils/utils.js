/*
*  ES6+ adaptations of useful Underscore methods
*  and other handy utils (in progress)
*  Example import: import * as __ from "../utils/utils";
*/

// --- ARRAY ---

/**
* Determine if value is present in array (or string), return bool
* Example: __.contains( optionsList, 'collectEmails' )    -> true
*/
export function contains( arrayOrString, value  ) {
  return !!( arrayOrString.indexOf( value ) > -1 );
}

/**
* Return an array of values "plucked" from an array of objects per the supplied key
* Example: __.pluck( userList, 'name' )    -> [ 'Peter', 'Matt' ]
*/
export function pluck( objList, propName  ) {
  return objList.map( value => value[ propName ] );
}

// --- OBJECT ---

/**
* Return a copy of the supplied object, containing only the whitelisted props
* Example: __.pick( userObj, 'first', 'age' )   -> { 'first': 'Matt', 'age': 16 }
*/
export function pick( obj, ...props ) {
  let result = {};
  for ( var key of props ) {
    if ( key in obj ) { result[ key ] = obj[ key ]; }
  }
  return result;
}

/**
* Determine if the supplied object has any keys, return bool
* Example: __.isEmpty( useObj )    -> false
*/
export function isEmpty( obj ) {
  return !!Object.keys( obj ).length;
}


// --- STRING ---

/**
* Convert a number to a currency formatted string
* Example: __.toCurrency( 125000, { symbol: '$', decimals: 2 } )  -> $125,000.00
*/
export function toCurrency( value, opts={} ) {
  value        = Number( value ) || 0;
  let symbol   = ( 'symbol' in opts ) ? opts.symbol : '';
  let decimals = ( 'decimals' in opts ) ? opts.decimals : 2;

  value = value.toFixed( decimals );
  value = value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');  // add commas

  return `${ symbol }${ value }`;
}


// --- MATH ---

/**
* Clamp a number within a given min-max range
* Example: __.clampNum( 102, 0, 100 )  -> 100
*/
export function clampNum( num, min, max ) {
  return Math.min( Math.max( num, min ), max );
}

/**
* Rescale a number from its min-max range to any other min-max range
* Example: __.rescaleNum( 10, 0, 20, 0, 100 )  -> 50
*/
export function rescaleNum( a, aMin, aMax, bMin, bMax ) {
  return ( a - aMin ) / ( (aMax - aMin) / (bMax - bMin) ) + bMin ;
}


// --- MISC ---

/*
 * Generate a short UID (4 chars)
 * http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 */
export function shortUID() {
  return ( '0000' + ( Math.random() * Math.pow( 36, 4 ) << 0 ).toString( 36 ) ).slice( -4 );
}
