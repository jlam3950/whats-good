import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./components/Search";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
 
      <header className="App-header">
      <Navbar />
        <Routes>
              <Route path = "/" element={<Home />}></Route>
              <Route path = "/about" element={<About />}></Route>
              <Route path = "/login" element={<Login />}></Route>
              <Route path = "/register" element={<Register />}></Route>
              <Route path = "/search" element={<Search />}></Route>
        </Routes>
      <Footer />
      </header>
    </div>
  );
}

export default App;
