require( './styles/stylesheet.scss' );

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore } from 'redux';

import App from './App';
import layoutReducer from './reducers/layoutReducer';


const rootReducer = combineReducers({
  layout: layoutReducer
});

// create Redux store
const createStoreWithMiddleware = compose(
  // support Chrome 'Redux DevTools' extension
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
 )( createStore );

const store = createStoreWithMiddleware( rootReducer );

ReactDOM.render((
  <Provider store={ store }>
    <App/>
  </Provider>
), document.getElementById( 'app' ) );
