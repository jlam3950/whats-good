import './App.css';
import Home from "./components/Homepage";
import About from "./components/Homepage";
import Login from "./components/Homepage";
import Navbar from "./components/Homepage";
import Footer from "./components/Homepage";
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
