import React from "react";
import "./App.css";
import Dashboard from "./components/dashboard";

const App = () => {
  return (
    <div data-testid="mainApp" className="App">
      <Dashboard />
    </div>
  );
};

export default App;
