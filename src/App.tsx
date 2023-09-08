import React from "react";
import "./app.scss";
import Banner from "./components/banner";
import Generations from "./pages/generations";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto">
        <Banner />
        <Generations />
      </div>
    </div>
  );
}

export default App;
