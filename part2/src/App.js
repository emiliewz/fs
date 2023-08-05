import Note from "./components.js/Note"
import { useState } from "react";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const addNote = e => {
    e.preventDefault()
    // console.log('button clicked', e.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = e => {
    console.log(e.target.value)
    setNewNote(e.target.value)
  }

  const noteToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <>
      <h1>Notes</h1>
      <ul>
        {noteToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </>
  )
}

export default App;
