import { createConnection, format } from 'mysql'
import { databaseConfig } from '../config'

const database = () => {
  const object = {
    currentConnection: null,

    // get currenct id database conection
    getId () {
      return object.currentConnection
        ? { state: object.currentConnection.state, id: object.currentConnection.threadId }
        : null
    },

    // create a new database conection
    createConnection  () {
      if (object.currentConnection) return false
      const database = createConnection(databaseConfig)
      return new Promise((resolve, reject) => {
        database.connect(error => {
          if (!error) {
            object.currentConnection = database
            resolve(database)
          } else reject(error)
        })
      })
    },

    // create a new instance table
    table (tableName) {
      const tableInstanced = {
        TABLE_NAME: tableName || '',
        WHERE: '',
        ORDER_BY: '',
        SQL: '',
        LIMIT: '',

        table (tableName) {
          tableInstanced.TABLE_NAME = tableName
        },

        where (identifier, value) {
          tableInstanced.WHERE = tableInstanced.WHERE === ''
            ? format('WHERE ?? = ?', [identifier, value])
            : tableInstanced.WHERE + ' ' + format('AND ?? = ?', [identifier, value])
        },

        limit (limit, start) {
          tableInstanced.LIMIT = start
            ? `LIMIT ${start}, ${limit}`
            : `LIMIT ${limit}`
        },

        order_by (identifier, value) {
          tableInstanced.ORDER_BY = format(`ORDER BY ?? ${value}`, identifier)
        },

        async insert (data) {
          tableInstanced.SQL = format('INSERT INTO ?? SET ?', [tableInstanced.TABLE_NAME, data])
          const { insertId } = await object.query(tableInstanced.SQL)
          return insertId || false
        },

        async update (dataToUpdate) {
          tableInstanced.SQL = format(`UPDATE ?? SET ? ${tableInstanced.WHERE} ${tableInstanced.ORDER_BY} ${tableInstanced.LIMIT}`, [tableInstanced.TABLE_NAME, dataToUpdate])
          const { affectedRows } = await object.query(tableInstanced.SQL)
          return affectedRows
        },

        async delete () {
          tableInstanced.SQL = format(`DELETE FROM ?? ${tableInstanced.WHERE} ${tableInstanced.ORDER_BY} ${tableInstanced.LIMIT} `, [tableInstanced.TABLE_NAME])
          const { affectedRows } = await object.query(tableInstanced.SQL)
          return affectedRows
        },

        async fetch_single (arrayOfFields = '*') {
          tableInstanced.SQL = format(`SELECT ?? FROM ?? ${tableInstanced.WHERE} ${tableInstanced.ORDER_BY} LIMIT 1`, [arrayOfFields, tableInstanced.TABLE_NAME])
          const data = await object.query(tableInstanced.SQL)
          return data.length > 0 ? data[0] : false
        },

        async fetch (arrayOfFields = '*') {
          tableInstanced.SQL = format(`SELECT ?? FROM ?? ${tableInstanced.WHERE} ${tableInstanced.ORDER_BY} ${tableInstanced.LIMIT}`, [arrayOfFields, tableInstanced.TABLE_NAME]).trim()
          const data = await object.query(tableInstanced.SQL)
          return data.length > 0 ? data : false
        }
      }
      return tableInstanced
    },

    // transform callback to promise
    queryToPromise (sql) {
      return new Promise(resolve => {
        object.currentConnection.query(sql, (error, data, fields) => {
          if (error) console.log('[error_query]', error)
          const dataParsed = data ? JSON.parse(JSON.stringify(data)) : {}
          resolve(dataParsed)
        })
      })
    },

    // create a new database connection if not exist
    async query (sql) {
      if (!object.currentConnection) await object.createConnection()
      return object.queryToPromise(sql)
    },

    // end current database conection
    async close () {
      if (!object.currentConnection) return Promise.resolve(true)
      return new Promise((resolve, reject) => {
        object.currentConnection.end(error => {
          if (!error) {
            object.currentConnection = null
            resolve(true)
          } else {
            console.log('error de desconexion', error)
            reject(error)
          }
        })
      })
    }
  }
  return object
}

export default database

/*
  README
  this is for connect a database mysql
  require "mysql": "^2.18.1" from NPM
  when you execute this function return this methods
  getId = getIdCurrentConection
  table = will create a new instance of table
  close = close current conection

  example
  const conecction = database()

  const users = connetion('users')
  const result = users.get_list()

  const posts = connetion('posts')
  const result = posts.get_list()

  conecction.close()
*/
