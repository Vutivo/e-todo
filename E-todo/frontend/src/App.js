import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Pages/LoginSignup/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
