import React from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowerRouter, Route } from "react-router-dom";
function App() {
  return (
    <BrowerRouter>
      <Header />
    </BrowerRouter>
  );
}

export default App;
