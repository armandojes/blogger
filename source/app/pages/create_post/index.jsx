import React from 'react'
import sessionHOC from '../../hoc/session'

function CreatePost () {
  return (
    <h1>create a new post</h1>
  )
}

export default sessionHOC(CreatePost)
