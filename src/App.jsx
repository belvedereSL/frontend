import { lazy } from "react";
import KeepAliveRoutes from "./components/KeepAliveRoutes";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const Service = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const News = lazy(() => import("./pages/News"));
const Contact = lazy(() => import("./pages/Contact"));
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToHashElement from "./components/ScrollToHashElement";
const ServicesDetail = lazy(() => import("./components/ServicesDetail"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToHashElement />
      <KeepAliveRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />

        <Route path="/services/:id" element={<ServicesDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </KeepAliveRoutes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
