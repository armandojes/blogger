import { useSelector } from 'react-redux'
import React from 'react'
import Login from '../pages/login'

const sessionHOC = WrappedComponent => props => {
  const logged = useSelector(state => state.session.logged)
  return logged
    ? <WrappedComponent {...props} />
    : <Login {...props} />
}

export default sessionHOC
