/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { hydrate } from 'react-dom'
import React from 'react'
import App from '../app'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import reducer from 'flux/reducer'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import { logger } from 'redux-logger'

const reduxState = window.__REDUX_STATE__ || null

const enhancer = IS_PRODUCTION
  ? applyMiddleware(ReduxThunk)
  : composeWithDevTools(applyMiddleware(ReduxThunk, logger))

// creando store
var store = createStore(
  reducer,
  reduxState,
  enhancer
)

function Client () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

hydrate(<Client />, document.getElementById('render_target'))
