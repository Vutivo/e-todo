import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Signup from './Pages/LoginSignup/Signup';
import Login from './Pages/LoginSignup/Login';
import Home from './Pages/Home'
import Connected from './Pages/Connected'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos/:userId" element={<Connected />} />
      </Routes>
    </Router>
  );
}

export default App;
