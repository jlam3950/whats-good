import './App.css';
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Profile from "./components/Profile"; 
import Logout from "./components/Logout"; 
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
 
      <header className="App-header">
      <Navbar />
        <Routes>
              <Route path = "/" element={<Home />}></Route>
              <Route path = "/contact" element={<Contact />}></Route>
              <Route path = "/login" element={<Login />}></Route>
              <Route path = "/register" element={<Register />}></Route>
              <Route path = "/search" element={<Search />}></Route>
              <Route path = "/profile" element={<Profile />}></Route>
              <Route path = "/logout" element={<Logout />}></Route>
        </Routes>
      <Footer />
      </header>
    </div>
  );
}

export default App;
