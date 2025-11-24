import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Signup from './Pages/LoginSignup/Signup';
import Login from './Pages/LoginSignup/Login';
import Home from './Pages/Home'
import Connected from './Pages/Connected'
import TodoInfo from './Pages/TodoInfo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/todos" element={<Connected />} />
        <Route path="/todos/:id" element={<TodoInfo />} />
       
      </Routes>
    </Router>
  );
}

export default App;
