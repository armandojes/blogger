import { newQuery, end } from 'api_modules/database'

const user = {
  async getFromUsername (username) {
    const query = newQuery()
    query.table('users')
    query.where('username', username)
    const userdata = await query.fetch_single()
    return userdata
  },

  async getFromEmail (email) {
    const query = newQuery()
    query.table('users')
    query.where('email', email)
    const userData = await query.fetch_single()
    return userData
  },

  end: end
}

export default user
