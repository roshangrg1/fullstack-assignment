import React from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

export default App;
