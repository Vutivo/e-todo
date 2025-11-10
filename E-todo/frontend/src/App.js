import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Pages/LoginSignup/Login';
import Home from './Pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Login />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;
