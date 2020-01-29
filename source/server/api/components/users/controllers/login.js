import user from 'api_models/user'
import { sign } from 'api_helpers/security'

async function login (request, response) {
  // var username contain username or password
  const { username, password } = request.body
  var userData = await user.getFromUsername(username) || await user.getFromEmail(username)
  user.end()
  // user not found
  if (!userData) {
    return response.error({
      statusCode: 401,
      errorMessage: 'user not found'
    })
  }

  // password incorrect
  if (userData.password !== password) {
    response.error({
      statusCode: 401,
      errorMessage: 'password incorrect'
    })
  }

  // create token
  const tokken = sign({
    id: userData.id,
    fullname: userData.fullname,
    email: userData.email,
    username: userData.username
  })

  response.success({
    token: tokken,
    id: userData.id,
    fullname: userData.fullname,
    email: userData.email,
    username: userData.username
  })
}

export default login
