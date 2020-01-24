import { hydrate } from 'react-dom'
import React from 'react'
import App from '../app'
import { BrowserRouter } from 'react-router-dom'

function Client () {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

hydrate(<Client />, document.getElementById('render_target'))
