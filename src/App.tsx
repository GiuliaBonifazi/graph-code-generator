import DatasetSelection from './pages/DatasetSelection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<DatasetSelection/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
