import user from 'api_models/user'

async function login (request, response) {
  // var username contain username or password
  const { username, password } = request.body
  var userData = await user.getFromUsername(username) || await user.getFromEmail(username)

  //userNotFound
  if (userData) return response.error();
}

export default login
