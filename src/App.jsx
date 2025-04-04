
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import First from "./First";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/first" element={<First />} />
      </Routes>
    </Router>
  );
}
