import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Navbar />
        <Routes>
              <Route path = "/" element={<Home />}></Route>
              <Route path = "about" element={<About />}></Route>
              <Route path = "contact" element={<Login />}></Route>
              <Route path = "checkout" element={<Footer />}></Route>
        </Routes>
      <Footer />
      </header>
    </div>
  );
}

export default App;
