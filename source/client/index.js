import React, { hydrate } from 'react-dom'
import App from '../app'
import { BrowserRouter } from 'react-router-dom'

function Client () {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

hydrate(<Client />, document.getElementById('render_targte'))
