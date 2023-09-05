import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link stype={padding} to='/'>home</Link>
        <Link style={padding} to='/notes'>notes</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>

      <Routes>
        <Route path='/notes' element={<Notes />} />
        
      </Routes>
    </Router>
  )
}

export default App
