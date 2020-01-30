import Model from 'api_modules/model'

class User extends Model {
  async getFromUsername (username) {
    const tableInstanced = this.connection.table('users')
    tableInstanced.where('username', username)
    const userdata = await tableInstanced.fetch_single()
    console.log(this.connection.getId())
    return userdata
  }

  async getFromEmail (email) {
    const tableInstanced = this.connection.table('users')
    tableInstanced.where('email', email)
    const userdata = await tableInstanced.fetch_single()
    console.log(this.connection.getId())
    return userdata
  }
}

export default User
