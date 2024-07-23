import React from "react";
import { render } from "react-dom";
import "./index.css";
import Header from "./components/Header";
import ImageDemo from "./components/ImageDemo";

const Demo = () => {
  return (
    <div className="app">
      <Header />
      <ImageDemo />
    </div>
  );
};

render(<Demo />, document.querySelector("#demo"));
