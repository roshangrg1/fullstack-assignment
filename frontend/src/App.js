import React from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./component/layout/footer/Footer";
import Home from "./component/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
