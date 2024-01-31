import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import CharacterPage from './components/CharacterPage'
import './styles/styles.scss'

function App() {

  return (
    <>
      <div className="container-fluid mt-4 mb-4">
        <p className="text-center fs-1 text-success">May the force be with you</p>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/character/:id' element={<CharacterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
