/* eslint-disable no-undef */
function markup (content, states, reduxState) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>my document</title>
      <link rel="stylesheet" type="text/css" href="${ASSETS}/styles.css">
    </head>
    <body>
      <div id="render_target">${content || ''}</div>
      <script>${states}</script>
      <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
      <script>window.__REDUX_STATE__ = ${JSON.stringify(reduxState)}</script>
      <script src="${ASSETS}/client.js"></script>
      </body>
    </html>
  `
}

export default markup
