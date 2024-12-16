import React from "react";
import { Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" component={<Home/>} />
        <Route path="/about" component={<About/>} />
        <Route path="/contact" component={<Contact/>} />
      </Routes>
    </div>
  );
}

export default App;