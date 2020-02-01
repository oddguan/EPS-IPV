import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then(response => response.json())
      .then(({ message }) => {
        setMessage(message);
      });
  }, []);

  return (
    <div className="App">
      <p>{message}</p>
    </div>
  );
}

export default App;
