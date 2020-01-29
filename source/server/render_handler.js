import React from 'react'
import marcup from './markup'
import { renderToStringAsync } from 'react-fetch-ssr'
import { StaticRouter } from 'react-router'
import App from '../app'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import reducer from 'flux/reducer'
import { setLogged } from 'flux/session'

async function renderHandler (request, response) {
  // create store
  const store = createStore(
    reducer,
    applyMiddleware(
      ReduxThunk
    )
  )

  // parse cookkie to redux state
  const session = request.cookies.__session__ ? JSON.parse(request.cookies.__session__) : null
  store.dispatch(setLogged(session))

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
