import Header from "./components/Header"
import Home from './pages/Home'
import Results from './pages/Results';
import Error from './pages/Error';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/results" element={<Results/>}/> 
          <Route path="*" element={<Error/>}/>
        </Routes>  
      </Router>
    </div>
  );
}

export default App;
