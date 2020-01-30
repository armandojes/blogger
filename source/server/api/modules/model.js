import database from 'api_modules/database'

class Model {
  constructor () {
    this.connection = database()
  }

  destructor () {
    return this.connection.close()
  }
}

export default Model
