import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from 'components/header'
import Home from './pages/home'
import Login from './pages/login'
import CreatePost from './pages/create_post'
import Post from './pages/post'

import './styles'

function App (props) {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/createpost' exact component={CreatePost} />
        <Route path='/post/:url' exact component={Post} />
      </Switch>
    </>
  )
}

export default App
