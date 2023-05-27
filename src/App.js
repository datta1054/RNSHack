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
import Contact from "./components/Contact";
import Newpassword from "./Auth/Newpassword";
import SetNewpassword from "./Auth/SetNewpassword";
import Expenses from "./pages/Expenses";
import Budgets from "./pages/Budgets";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/login" Component={Login} />
          <Route path="/contact" Component={Contact} />
          <Route path="/signup" Component={Signup} />
          <Route path="/expenses" Component={Expenses} />
          <Route path="/budgets" Component={Budgets} />
          <Route path="/forgot" Component={Forgot} />
          {/* <Route path="/SetNewpassword" Component={SetNewpassword} />
          <Route path="/Newpassword" Component={Newpassword} /> */}
          <Route path="*" Component={ErrorPage} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
