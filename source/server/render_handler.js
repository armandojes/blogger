import React from 'react'
import marcup from './markup'
import { renderToStringAsync } from 'react-fetch-ssr'
import { StaticRouter } from 'react-router'
import App from '../app'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import reducer from 'flux/reducer'

async function renderHandler (request, response) {
  // create store
  const store = createStore(
    reducer,
    applyMiddleware(
      ReduxThunk
    )
  )

  // render
  const { content, states } = await renderToStringAsync(
    <Provider store={store}>
      <StaticRouter location={request.url}>
        <App />
      </StaticRouter>
    </Provider>
  )

  // getState
  const reduxPreloadedState = store.getState()
  const fullHtml = marcup(content, states, reduxPreloadedState)
  response.send(fullHtml)
}

export default renderHandler
