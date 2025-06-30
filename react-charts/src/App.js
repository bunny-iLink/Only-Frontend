import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './charts/Home';
import ChartJS from './charts/ChartJS';
import Echarts from './charts/Echarts';
import HighCharts from './charts/Highchart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chartJS" element={<ChartJS />} />
        <Route path="/echarts" element={<Echarts />} />
        <Route path="/high-chart" element={<HighCharts />} />
      </Routes>
    </Router>
  );
}

export default App;
