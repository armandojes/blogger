import React from 'react'
import style from './style'
import PropTypes from 'prop-types'

const Container = (props) => (
  <div className={style.container}>
    {props.children}
  </div>
)
Container.propTypes = {
  children: PropTypes.String.isRequired
}
export default Container
