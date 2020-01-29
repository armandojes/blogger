export const getSession = () => {
  var v = document.cookie.match('(^|;) ?' + '__session__' + '=([^;]*)(;|$)')
  const session = v ? JSON.parse(v[2]) : null
  if (session === null) return null
  if (session === '__session__') return null
  return session
}

export const saveSession = (data) => {
  var d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * 7)
  document.cookie = '__session__' + '=' + JSON.stringify(data) + ';path=/;expires=' + d.toGMTString()
}

export const deleteSession = (name) => { saveSession('__session__', '', -1) }
