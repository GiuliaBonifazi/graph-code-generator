import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import GraphOptions from './GraphOptions';
import GraphReview from './GraphReview';
import DatasetSelection from './DatasetSelection';
import {MODEL_ALL, MODEL_DEEPSEEK, MODEL_DEFAULT, MODEL_GEMINI, MODEL_GPT} from './states/NavbarStates'
import { GraphFormProvider } from './contexts/GraphFormContext';

function App() {

  return (
    <>
      <Router>
        <Navbar modelDefault={MODEL_DEFAULT} modelAll={MODEL_ALL} modelGpt={MODEL_GPT} modelGemini={MODEL_GEMINI} modelDeepseek={MODEL_DEEPSEEK }></Navbar>
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
