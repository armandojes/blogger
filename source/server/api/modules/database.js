import { createConnection, format } from 'mysql'
import { databaseConfig } from '../config'

const database = {

  connection: null,

  // make a new conexion if not before exist
  create_connection () {
    if (this.connection) return Promise.resolve(this.connection)
    const database = createConnection(databaseConfig)
    return new Promise((resolve, reject) => {
      database.connect(error => {
        if (!error) this.connection = database
        if (!error) resolve(database)
        else reject(error)
      })
    })
  },

  // transform callback to promise
  query_promised (sql) {
    return new Promise((resolve) => {
      this.connection.query(sql, (error, data, fields) => {
        if (error) console.log('[error_query]', error)
        const dataParsed = data ? JSON.parse(JSON.stringify(data)) : {}
        resolve(dataParsed)
      })
    })
  },

  // query create conexion before if nox exist
  async query (sql) {
    await this.create_connection()
    return this.query_promised(sql)
  },

  // closeConexion DB ab set connection = null
  async end () {
    if (!this.connection) return Promise.resolve(true)
    return new Promise((resolve, reject) => {
      this.connection.end(error => {
        if (!error) {
          this.connection = null
          resolve(true)
        } else {
          console.log('error de desconexion', error)
          reject(error)
        }
      })
    })
  }
}

// creador de consultas
export function newQuery () {
  return {
    TABLE_NAME: '',
    WHERE: '',
    ORDER_BY: '',
    SQL: '',
    LIMIT: '',

    get_id_connection () {
      return database.connection
        ? database.connection.threadId
        : null
    },

    table (tableName) {
      this.TABLE_NAME = tableName
    },

    where (identifier, value) {
      this.WHERE = this.WHERE === ''
        ? format('WHERE ?? = ?', [identifier, value])
        : this.WHERE + ' ' + format('AND ?? = ?', [identifier, value])
    },

    limit (limit, start) {
      this.LIMIT = start
        ? `LIMIT ${start}, ${limit}`
        : `LIMIT ${limit}`
    },

    order_by (identifier, value) {
      this.ORDER_BY = format(`ORDER BY ?? ${value}`, identifier)
    },

    async insert (data) {
      this.SQL = format('INSERT INTO ?? SET ?', [this.TABLE_NAME, data])
      const { insertId } = await database.query(this.SQL)
      return insertId || false
    },

    async update (dataToUpdate) {
      this.SQL = format(`UPDATE ?? SET ? ${this.WHERE} ${this.ORDER_BY} ${this.LIMIT}`, [this.TABLE_NAME, dataToUpdate])
      const { affectedRows } = await database.query(this.SQL)
      return affectedRows
    },

    async delete () {
      this.SQL = format(`DELETE FROM ?? ${this.WHERE} ${this.ORDER_BY} ${this.LIMIT} `, [this.TABLE_NAME])
      const { affectedRows } = await database.query(this.SQL)
      return affectedRows
    },

    async fetch_single (arrayOfFields = '*') {
      this.SQL = format(`SELECT ?? FROM ?? ${this.WHERE} ${this.ORDER_BY} LIMIT 1`, [arrayOfFields, this.TABLE_NAME])
      const data = await database.query(this.SQL)
      return data.length > 0 ? data[0] : false
    },

    async fetch (arrayOfFields = '*') {
      this.SQL = format(`SELECT ?? FROM ?? ${this.WHERE} ${this.ORDER_BY} ${this.LIMIT}`, [arrayOfFields, this.TABLE_NAME]).trim()
      const data = await database.query(this.SQL)
      return data.length > 0 ? data : false
    }
  }
}

// cerrar conexion;
export function end () {
  return database.end()
}
export default {
  newQuery,
  end
}
