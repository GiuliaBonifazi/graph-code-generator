import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './pages/components/Navbar';
import DatasetSelection from './pages/DatasetSelection';
import GraphOptions from './pages/GraphOptions';

function App() {

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<DatasetSelection/>}/>
          <Route path='/graph-options/' element={<GraphOptions/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
