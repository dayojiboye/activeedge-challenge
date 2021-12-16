import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { HomePage } from "./pages/home";
import { AlbumsPage } from "./pages/albums";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums" element={<AlbumsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
