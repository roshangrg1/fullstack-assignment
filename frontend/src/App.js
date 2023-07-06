import React from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./component/layout/footer/Footer";
function App() {
  return (
    <BrowserRouter>
      <Header />

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
