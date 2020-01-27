import { verify as veryfyJWT, sign as signJWT } from 'jsonwebtoken'
import { jsonwebtoken } from '../config.js'

export function verify (accessToken) {
  return new Promise((resolve) => {
    if (accessToken === null || accessToken === '') {
      resolve(false)
    } else {
      veryfyJWT(accessToken, jsonwebtoken.key, (error, data) => {
        if (error) { resolve(false) } else { resolve(data) }
      })
    }
  })
}

export function sign (data) {
  const accessToken = signJWT(data, jsonwebtoken.key)
  return accessToken
}

export default {
  verify,
  sign
}
