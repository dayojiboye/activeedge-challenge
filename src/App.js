import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { HomePage } from "./pages/home";
import { AlbumsPage } from "./pages/albums";
import { CommentsPage } from "./pages/comments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/comments" element={<CommentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
