import { Link } from "react-router-dom";
import "../App.css";
import Logo from "../assets/Logo/logo.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { servicesData } from "../Data/servicesData";

export default function Footer() {
  const nav = [
    {
      label: "Organization",
      links: [
        { l: "About Us", to: "/about" },
        { l: "Services", to: "/services" },
        { l: "Portfolio", to: "/portfolio" },
        { l: "News", to: "/news" },
        { l: "Contact", to: "/contact" },
      ],
    },
    {
      label: "Services",
      // Dynamically points to individual service sub-routes
      links: servicesData.map((sv) => ({
        l: sv.name || sv.title,
        to: `/services/${sv.id}`, // <-- Changes link format here
      })),
    },
    {
      label: "Follow Us",
      links: [
        { l: <FaTwitter />, to: "#" },
        { l: <FaInstagram />, to: "#" },
        { l: <FaLinkedin />, to: "#" },
        { l: <FaFacebook />, to: "#" },
      ],
    },
  ];

  return (
    <footer className="footer-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img className="footer-img" src={Logo} alt="Belvedre SL Logo" />
            </Link>
            <p className="footer-tagline"> Improving Quality of Lives</p>
          </div>

          {/* Maps through the outer nav categories */}
          {nav.map((group, groupIdx) => (
            <div key={groupIdx} className="footer-linksGroup">
              <span className="footer-groupLabel">{group.label}</span>

              {/* Correctly loops through each specific array of links */}
              {group.links.map((link, linkIdx) => (
                <Link key={linkIdx} to={link.to} className="footer-link">
                  {link.l}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Belvedere SL. All rights reserved.
          </span>
          <span className="footer-flag">Freetown, Sierra Leone 🇸🇱</span>
        </div>
      </div>
    </footer>
  );
}
