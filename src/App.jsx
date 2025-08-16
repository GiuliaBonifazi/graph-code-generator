import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import GraphOptions from './GraphOptions';
import GraphReview from './GraphReview';
import DatasetSelection from './DatasetSelection';
import {MODEL_ALL, MODEL_DEFAULT} from './states/NavbarStates'

function App() {

  return (
    <>
      <Router>
        <Navbar modelDefault={MODEL_DEFAULT} modelAll={MODEL_ALL}></Navbar>
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
