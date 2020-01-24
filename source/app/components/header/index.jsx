/* eslint-disable no-undef */
import React from 'react'
import style from './style'
import Container from 'components/container'
import { Link } from 'react-router-dom'

function Header () {
  return (
    <header>
      <div className={style.fixed}>
        <Container className={style.body_desktop}>
          <Link className={style.logo_content} to='/'>
            <img src={`${ASSETS}/icons/react.png`} />
            React Articles
          </Link>
          <nav className={style.links_content}>
            <Link className={style.links} to='/posts'> Articulos </Link>
            <Link className={style.links} to='/publicar'> Publicar</Link>
          </nav>
        </Container>
        <Container className={style.body_movil}>
          <Link className={style.logo_content} to='/'>
            <img src={`${ASSETS}/icons/react.png`} />
          </Link>
          <Link className={style.links} to='/posts'> Articulos </Link>
          <Link className={style.links} to='/publicar'> Publicar </Link>
        </Container>
      </div>
      <div className={style.body_desktop} />
      <div className={style.body_movil} />
    </header>
  )
}

export default Header
