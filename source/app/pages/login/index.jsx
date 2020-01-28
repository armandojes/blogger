import React from 'react'
import style from './style'
import Container from 'components/container'
import Prealoder from 'components/preloader'
import { useState } from 'react-fetch-ssr'
import requests from 'helpers/requests'

function Login () {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setpassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const response = await requests.user.login({ username, password })
    if (response.error) {
      window.alert(response.errorMessage)
    }
    setLoading(false)
  }

  return (
    <Container className={style.body}>
      <div className={style.box_content}>
        {!loading && (
          <form className={style.form} onSubmit={handleSubmit}>
            <h2>Iniciar session</h2>
            <input
              type='text'
              placeholder='Usuario o correo'
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
            <input
              type='password'
              placeholder='contraseña'
              onChange={e => setpassword(e.target.value)}
              value={password}
            />
            <input type='submit' value='Iniciar session' className={style.button} />
          </form>
        )}
        {loading && (
          <Prealoder />
        )}
      </div>
    </Container>
  )
}

export default Login
