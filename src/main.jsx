import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Artist from "./pages/Artist";
import Certificate from "./pages/Certificate";
import Artwork from "./pages/Artwork";
import InstallMetamask from "./pages/InstallMetamask";
import { isMetaMaskInstalled } from "./components/Auth";

const isAdminConnected = () => {
  const userDet = localStorage.getItem('userDet');
  if (!userDet || JSON.parse(userDet).role !== 'Admin')
    return false;

  return true
}
const isArtistConnected = () => {
  const userDet = localStorage.getItem('userDet');
  if (!userDet || JSON.parse(userDet).role !== 'Artist')
    return false;

  return true
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {isMetaMaskInstalled() ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/certificates/:id" element={<Certificate />} />
            <Route path="/artworks/:id" element={<Artwork />} />
            
            {isAdminConnected() ? (
              <Route path="/admin" element={<Admin />} />
            ) : (
              <Route path='/admin' element={<Navigate replace to="/" />} />
            )}
            {isArtistConnected() ? (
              <Route path="/artist" element={<Artist />} />
            ) : (
              <Route path='/artist' element={<Navigate replace to="/" />} />
            )}
          </>
        ) : (
          <Route path="*" element={<InstallMetamask />} />
        )}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
