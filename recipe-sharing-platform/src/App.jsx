import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Recipe Sharing Platform
      </h1>
      <p className="text-lg text-gray-700">
        Share and discover amazing recipes from around the world!
      </p>
    </div>
  );
}

export default App;
