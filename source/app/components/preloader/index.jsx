/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'

const Preloader = props => (
  <img src={`${ASSETS}/icons/preloader.gif`} className={props.className || ''} />
)

Preloader.propTypes = {
  className: PropTypes.string
}

export default Preloader
