import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToHashElement from "./components/ScrollToHashElement";
import ServicesDetail from "./components/ServicesDetail";
import { servicesData } from "./Data/servicesData";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />

        <Route path="/services/:id" element={<ServicesDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
