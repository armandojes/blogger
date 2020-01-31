import React from 'react'
import sessionHOC from '../../hoc/session'
import Editor from './editor'
import Preview from './preview'
import { useState } from 'react-fetch-ssr'

function CreatePost () {
  const [currentView, setCurrentView] = useState('editor')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  if (currentView === 'editor') {
    return (
      <Editor
        value={title}
        valueBody={body}
        onChangeBody={e => setBody(e.target.value)}
        onChangeTitle={e => setTitle(e.target.value)}
        setCurrentView={setCurrentView}
      />
    )
  } else {
    return (
      <Preview
        setCurrentView={setCurrentView}
      />
    )
  }
}

export default sessionHOC(CreatePost)
