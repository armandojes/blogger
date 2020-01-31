import React from 'react'
import Container from 'components/container'
import style from './style'
import propTypes from 'prop-types'

function Editor (props) {
  return (
    <Container className={style.container}>
      <section className={style.body_content} role='form'>
        <h3>Titulo</h3>
        <input
          className={style.title_input}
          type='text'
          onChange={props.onChangeTitle}
          value={props.valueTitle}
        />
        <h3>Cuerpo</h3>
        <textarea
          value={props.valueBody}
          placeholder='Markdown here'
          className={style.textarea}
          onChange={props.onChangeBody}
        />
      </section>
      <section className={style.actions_content}>
        hello actions
      </section>
    </Container>
  )
}

Editor.propTypes = {
  onChangeBody: propTypes.func,
  onChangeTitle: propTypes.func,
  valueBody: propTypes.string,
  valueTitle: propTypes.string
}

export default Editor
