import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import PictureRecognition from "./components/PictureRecognition";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/picture-recognition" element={<PictureRecognition />} />
    </Routes>
  );
}

export default App;
