import React from 'react'
import marcup from './markup'
import { renderToStringAsync } from 'react-fetch-ssr'
import { StaticRouter } from 'react-router'
import App from '../app'

async function renderHandler (request, response) {
  const { content, states } = await renderToStringAsync(
    <StaticRouter location={request.url}>
      <App />
    </StaticRouter>
  )
  const fullHtml = marcup(content, states)
  response.send(fullHtml)
}

export default renderHandler
