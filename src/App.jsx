import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar';
import GraphOptions from './GraphOptions';
import GraphReview from './GraphReview';
import DatasetSelection from './DatasetSelection';
import ReportStats from "./ReportStats";
import { GraphFormProvider } from './contexts/GraphFormContext';
import { ReportStatsProvider } from './contexts/ReportStatsContext';

function App() {

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
            <Route element={<GraphFormProviderWrapper />}>
              <Route path='/' element={<DatasetSelection />} />
              <Route path='/graph-options/' element={<GraphOptions />} />
              <Route path='/graph-review/' element={<GraphReview />} />
            </Route>
            <Route element={<ReportStatsProviderWrapper />}>
              <Route path='/report-stats/' element={<ReportStats />} />
            </Route>
        </Routes>
      </Router>
    </>
  )
}

function GraphFormProviderWrapper() {
  return (
    <GraphFormProvider>
      <Outlet />
    </GraphFormProvider>
  );
}

function ReportStatsProviderWrapper() {
  return (
    <ReportStatsProvider>
      <Outlet />
    </ReportStatsProvider>
  );
}

export default App
