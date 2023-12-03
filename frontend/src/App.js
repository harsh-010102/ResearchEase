import "./App.css";

// import Switcher from "./pages/Switcher";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";


import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <div className="pages">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
