import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './pages/components/Navbar';
import DatasetSelection from './pages/DatasetSelection';
import GraphOptions from './pages/GraphOptions';
import GraphReview from './pages/GraphReview';

function App() {

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<DatasetSelection/>}/>
          <Route path='/graph-options/' element={<GraphOptions/>}/>
          <Route path='/graph-review/' element={<GraphReview/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
