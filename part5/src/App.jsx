import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import noteService from './services/notes'
import loginService from './services/login'

import { useState, useEffect, useRef } from 'react'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  if (!notes) {
    return null
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note ${note.content} was already removed from server`)
        setTimeout(() => { setErrorMessage(null) }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const noteToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm createLogin={handleLogin} />
    </Togglable>
  )

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  return (
    <>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        {noteForm()}
      </div>}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {noteToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </>
  )
}

export default App
