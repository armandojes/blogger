import React from 'react'
import style from './style'
import PropTypes from 'prop-types'

const Container = (props) => (
  <div className={`${style.container} ${props.className || ''}`}>
    {props.children}
  </div>
)
Container.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string
}
export default Container
