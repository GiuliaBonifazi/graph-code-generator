import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import GraphOptions from './GraphOptions';
import GraphReview from './GraphReview';
import DatasetSelection from './DatasetSelection';
import { GraphFormProvider } from './contexts/GraphFormContext';

function App() {

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <GraphFormProvider>
        <Routes>
          <Route path='/' element={<DatasetSelection/>}/>
          <Route path='/graph-options/' element={<GraphOptions/>}/>
          <Route path='/graph-review/' element={<GraphReview/>}/>
        </Routes>

        </GraphFormProvider>
      </Router>
    </>
  )
}

export default App
