import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from 'components/header'
import Home from './pages/home'
import Login from './pages/login'

import './styles'

function App (props) {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
      </Switch>
    </>
  )
}

export default App
