/* eslint-disable no-undef */
import axios from 'axios'

// API CONST INJECTED FROM WEBPACK
const baseUrl = API

async function connect (config) {
  config.url = `${baseUrl}${config.url}`
  config.method = config.method || 'GET'
  try {
    var response = await axios(config)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

const request = {
  user: {
    login (data) {
      return connect({
        url: '/users/login',
        method: 'POST',
        data
      })
    }
  }
}

export default request
