import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Pages/Home/Home'
import Repositories from './components/Pages/Repositories/Repositories'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/repositories" element={<Repositories/>} />
      </Routes>
  </Router>
)
  
}

export default App
