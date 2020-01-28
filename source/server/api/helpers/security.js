import { verify as veryfyJWT, sign as signJWT } from 'jsonwebtoken'
import { jwtConfig } from '../config.js'

export function verify (accessToken) {
  return new Promise((resolve) => {
    if (accessToken === null || accessToken === '') {
      resolve(false)
    } else {
      veryfyJWT(accessToken, jwtConfig.key, (error, data) => {
        if (error) { resolve(false) } else { resolve(data) }
      })
    }
  })
}

export function sign (data) {
  const accessToken = signJWT(data, jwtConfig.key, { expiresIn: '7d' })
  return accessToken
}

export default {
  verify,
  sign
}
