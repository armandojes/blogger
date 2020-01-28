
function response (request, response, next) {
  response.success = (data = {}) => {
    const responseDefault = {
      statusCode: 200,
      status: 'OK',
      error: false,
      errorMessage: '',
      ...data
    }
    response.status(responseDefault.statusCode)
    response.send(responseDefault)
    response.end()
  }
  response.error = (data = {}) => {
    const responseDefault = {
      statusCode: 500,
      status: 'SERVER INTERNAL ERROR',
      error: true,
      errorMessage: 'internal server error',
      ...data
    }
    response.status(responseDefault.statusCode)
    response.send(responseDefault)
    response.end()
  }
  next()
}

export default response
