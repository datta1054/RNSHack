import React from "react";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./Auth/Login";
import Forgot from "./Auth/Forgot";
import Signup from "./Auth/SignUp";
import Expences from "./pages/Expences";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/expence" Component={Expences} />
          <Route path="/login" Component={Login} />
          <Route path="/contact" Component={Contact} />
          <Route path="/signup" Component={Signup} />
          <Route path="/forgot" Component={Forgot} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
