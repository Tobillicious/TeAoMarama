// ...existing code...
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StyleGuide from "./pages/StyleGuide";
import Footer from "./components/Footer";
import "./styles/globals.css";

function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/styleguide" element={<StyleGuide/>} />
            <Route path="/dashboard" element={<div className="p-12">Dashboard (coming)</div>} />
            <Route path="/login" element={<div className="p-12">Login / Auth (coming)</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
