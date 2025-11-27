import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './Pages/styles/App.css';
import Signup from './Pages/LoginSignup/Signup';
import Login from './Pages/LoginSignup/Login';
import Home from './Pages/Home'
import Connected from './Pages/Connected'
import TodoInfo from './Pages/componentsConnected/TodoInfo'
import NotFound from './Pages/NotFound/NotFound';
import InfoUser from "./Pages/routesFromConnected/InfoUser";
import AllTodos from "./Pages/routesFromConnected/allTodos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/todos" element={<Connected />} />
        <Route path="/users/:id" element={<InfoUser />} />
        <Route path="/todos/:id" element={<TodoInfo />} />
        <Route path="/todo/all" element={< AllTodos/>} />
    

        <Route path="*" element={<NotFound />} />
       
        
      </Routes>
    </Router>
  );
}

export default App;
