import React, { useState, useEffect } from "react";
import "./portfolio.css";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "../components/Animate";
import { Link } from "react-router-dom";
import client from "../lib/contentful";
import heroVideo from "../assets/Background-Videos/Video 3.mp4";

// Clean, aligned data mapper function
function mapProject(entry) {
  const f = entry.fields;
  return {
    id: entry.sys.id,
    slug: f.slug || entry.sys.id,
    category: f.category || "Strategy Advisory",
    year: f.year ? String(f.year) : "",
    outcome: f.outcome || "",

    // Aligned with your JSX structural bindings:
    assignment: f.assignment || f.title || "", // Contentful Field: assignment
    sector: f.sector || f.description || "", // Contentful Field: sector
    client: f.client || "", // Contentful Field: client

    img: f.coverImage?.fields?.file?.url
      ? "https:" + f.coverImage.fields.file.url + "?w=600&q=80&fm=jpg"
      : null,
  };
}

// Custom hook to sync entries dynamically from Contentful
export function usePortfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .getEntries({
        content_type: "portfolioProject",
        order: "-fields.year",
        limit: 50,
      })
      .then((res) => {
        setProjects(res.items.map(mapProject));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Contentful error:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { projects, loading, error };
}

const WORLD_BANK_ASSIGNMENTS = [
  {
    project: "Accountable Governance for Basic Services Delivery",
    agency: "Ministry of Finance",
    value: "40.0",
  },
  {
    project: "Resilient Urban Sierra Leone",
    agency: "Ministry of Finance",
    value: "56.7",
  },
  {
    project: "Harmonizing and Improving Statistics in West Africa",
    agency: "Statistics Sierra Leone",
    value: "30.0",
  },
  {
    project: "Sierra Leone Skills Development Project",
    agency: "MTHE",
    value: "22.0",
  },
  { project: "Skills Development Fund", agency: "MTHE", value: "19.0" },
  {
    project: "Sierra Leone Land Administration Project",
    agency: "Ministry of Lands",
    value: "40.0",
  },
];

const PARTNERS = [
  "World Bank",
  "African Development Bank (AfDB)",
  "Islamic Development Bank (IsDB)",
  "European Union (EU)",
  "United Nations Industrial Development Organization (UNIDO)",
  "World Food Programme (WFP)",
  "UNICEF",
  "Global Panel on Agriculture and Food Systems for Nutrition (GLOPAN)",
  "Universal Postal Union (UPU)",
  "Government of Sierra Leone",
  "Statistics Sierra Leone",
  "Ministry of Agriculture and Food Security",
  "Ministry of Technical and Higher Education",
  "Ministry of Finance",
  "SALPOST",
  "SMEDA",
  "Business & Strategies Europe (B&S Europe)",
];

const SECTORAL_EXPERIENCE = [
  {
    category: "Agriculture & Agribusiness",
    bullets: [
      "Rice value chain development",
      "Agribusiness investment promotion",
      "Agricultural expenditure reviews",
      "Food systems transformation",
      "Women's agribusiness empowerment",
      "Agricultural mechanization",
    ],
  },
  {
    category: "Research, Monitoring & Evaluation",
    bullets: [
      "National M&E Strategy",
      "End-line evaluations",
      "Baseline studies",
      "Policy research",
      "Impact assessments",
    ],
  },
  {
    category: "Skills Development & Youth Employment",
    bullets: [
      "TVET Policy and Strategy",
      "Non-Formal TVET Policy",
      "Dual Apprenticeship Policy",
      "Quality Management Systems for TVET",
      "Skills Development Fund Operations",
      "Stabilized Soil Block and Masonry Training",
    ],
  },
  {
    category: "Private Sector & Industrial Development",
    bullets: [
      "Manufacturing productivity assessments",
      "Non-sugar sector strategy",
      "SME development",
      "Value chain competitiveness studies",
      "Investment promotion",
    ],
  },
  {
    category: "Governance & Institutional Development",
    bullets: [
      "Project Operations Manuals",
      "Institutional strengthening",
      "Capacity assessments",
      "Strategic planning",
      "Business continuity planning",
    ],
  },
  {
    category: "Climate Change & Sustainable Development",
    bullets: [
      "Agricultural climate resilience",
      "Sustainable agriculture",
      "COP26 case studies",
      "Food systems resilience",
    ],
  },
];

// Cleaned up filter array options with proper casing to mirror typical Contentful models
const SERVICE_FILTERS = [
  "All Services",
  "Strategic Advisory & Institutional Development",
  "Research, Monitoring & Evaluation",
  "Agriculture & Agribusiness Development",
  "Climate Change & Sustainable Development",
  "Youth Employment & Skills Development",
  "Private Sector Development & Investment Advisory",
  "Project Management & Implementation Support",
  "Capacity Building & Training",
  "YeriNotes",
];

const YEAR_FILTERS = [
  "All Years",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
];

const Portfolio = () => {
  const { projects: assignments, loading, error } = usePortfolio();

  const [filterMode, setFilterMode] = useState("services");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedYear, setSelectedYear] = useState("All Years");

  // Filter comparison engine logic
  const filtered = assignments.filter((item) => {
    const serviceMatch =
      selectedService === "All Services" ||
      item.category?.trim().toLowerCase() ===
        selectedService.trim().toLowerCase();

    const yearMatch =
      selectedYear === "All Years" ||
      String(item.year).trim() === selectedYear.trim();

    return serviceMatch && yearMatch;
  });

  const resetAllFilters = () => {
    setSelectedService("All Services");
    setSelectedYear("All Years");
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <motion.div
        className="bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <video
          className="video-bg"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1595872234935-758c5bfc1f6e?w=1600&q=60"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="port-overlay" />
        <motion.div className="content">
          <motion.div
            className="content-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrowLine" />
            Results That Speak for Themselves
          </motion.div>
          <div className="headline">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Portfolio
            </motion.h1>
            {/* <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Creating Meaningful Change
            </motion.h1> */}
            <motion.p
              className="sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              Discover how our expertise has supported governments,
              international organizations, and private-sector partners in
              delivering successful projects that strengthen institutions and
              transform communities.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. DISCRETE ASSIGNMENT TILES */}
      <motion.section
        className="portfolio-layout-section section-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="portfolio-layout-container">
          <div className="portfolio-block-header">
            <h2 className="portfolio-section-heading">
              Consulting Assignments & Project Portfolio
            </h2>
            <p className="portfolio-section-subheading">
              Filter through macro-consulting items by functional sector or
              historical implementation baseline.
            </p>
          </div>

          <div className="filter-system-wrapper">
            <div className="filter-mode-toggle-bar">
              <button
                className={`mode-toggle-btn ${filterMode === "services" ? "is-mode-active" : ""}`}
                onClick={() => setFilterMode("services")}
              >
                Filter by Service Category
              </button>
              <button
                className={`mode-toggle-btn ${filterMode === "years" ? "is-mode-active" : ""}`}
                onClick={() => setFilterMode("years")}
              >
                Filter by Operational Year
              </button>
              {(selectedService !== "All Services" ||
                selectedYear !== "All Years") && (
                <button
                  className="clear-all-filter-trigger"
                  onClick={resetAllFilters}
                >
                  Reset Filters ✕
                </button>
              )}
            </div>

            <FadeUp>
              <div className="portfolio-filter-row">
                <AnimatePresence mode="wait">
                  {filterMode === "services" ? (
                    <motion.div
                      key="services-pane"
                      className="filter-pane-inner"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {SERVICE_FILTERS.map((service) => (
                        <button
                          key={service}
                          className={`portfolio-filter-pill ${selectedService === service ? "is-pill-active" : ""}`}
                          onClick={() => {
                            setSelectedService(service);
                            setSelectedYear("All Years");
                          }}
                        >
                          {service}
                        </button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="years-pane"
                      className="filter-pane-inner"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {YEAR_FILTERS.map((year) => (
                        <button
                          key={year}
                          className={`portfolio-filter-pill ${selectedYear === year ? "is-pill-active" : ""}`}
                          onClick={() => {
                            setSelectedYear(year);
                            setSelectedService("All Services");
                          }}
                        >
                          {year}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          </div>

          {/* DYNAMIC VIEW MANAGEMENT SYSTEM */}
          {loading ? (
            <div
              className="portfolio-empty-state"
              style={{ borderStyle: "solid" }}
            >
              <p>Synchronizing with content management server...</p>
            </div>
          ) : error ? (
            <div
              className="portfolio-empty-state"
              style={{ borderColor: "#ba3c3c", backgroundColor: "#fffafa" }}
            >
              <p style={{ color: "#ba3c3c", fontWeight: "500" }}>
                Unable to sync live project assets. Please verify network
                configuration settings.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="portfolio-empty-state">
              <p>
                No framework contracts matched the selected metrics profile.
              </p>
              <button
                className="reset-state-inline-btn"
                onClick={resetAllFilters}
              >
                Show All Project Entries
              </button>
            </div>
          ) : (
            <motion.div className="portfolio-text-only-grid" layout>
              <AnimatePresence mode="popLayout">
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    className={`portfolio-text-card-node elevated-design ${p.img ? "has-image" : ""}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="card-accent-ribbon" />

                    {/* Left Column: Renders image side if it exists in Contentful */}
                    {p.img && (
                      <div className="card-node-image-side">
                        <img
                          src={p.img}
                          alt={p.assignment}
                          className="card-side-img"
                        />
                      </div>
                    )}

                    {/* Right / Central Column: Text content mapping */}
                    <div className="card-node-text-side">
                      <div className="card-node-top-meta">
                        <span className="card-node-sector-badge">
                          {p.category}
                        </span>
                        <span className="card-node-year-pill alignment-right">
                          {p.year}
                        </span>
                      </div>

                      <h3 className="card-node-main-title">{p.assignment}</h3>

                      {p.sector && (
                        <p className="card-node-desc-text">{p.sector}</p>
                      )}

                      <div className="card-node-footer">
                        <span className="footer-label">
                          Client/Partner Organization
                        </span>
                        <span className="footer-value">{p.client}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* 3. MAJOR WORLD BANK PROJECTS SECTION */}
      <section className="portfolio-layout-section section-neutral">
        <div className="portfolio-layout-container">
          <div className="portfolio-block-header">
            <h2 className="portfolio-section-heading">
              Major World Bank Assignments
            </h2>
            <p className="portfolio-section-subheading">
              Total Value of World Bank Programmes Supported: Over US$207
              Million.
            </p>
          </div>
          <div className="portfolio-metrics-grid">
            {WORLD_BANK_ASSIGNMENTS.map((wb, index) => (
              <div key={index} className="portfolio-metric-card">
                <div className="metric-large-display thin-gold-weight">
                  ${wb.value}M
                </div>
                <h3 className="metric-title">{wb.project}</h3>
                <p className="metric-subtitle">
                  Implementing Agency: {wb.agency}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTORAL EXPERIENCE SECTION */}
      <section className="portfolio-layout-section section-white">
        <div className="portfolio-layout-container">
          <div className="portfolio-block-header">
            <h2 className="portfolio-section-heading">
              Sectoral Experience of Belvedere
            </h2>
            <p className="portfolio-section-subheading1">
              Operational footprints and core strategic field competencies.
            </p>
          </div>
          <div className="portfolio-experience-matrix-grid">
            {SECTORAL_EXPERIENCE.map((se, i) => (
              <div key={i} className="experience-matrix-card">
                <h3 className="experience-card-title">{se.category}</h3>
                <ul className="experience-bullets-list">
                  {se.bullets.map((bullet, idx) => (
                    <li key={idx} className="experience-bullet-item">
                      <span className="gold-geometric-bullet" />
                      <span className="bullet-text-node">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. KEY DEVELOPMENT PARTNERS */}
      <section className="portfolio-layout-section section-dark">
        <div className="portfolio-layout-container">
          <div className="portfolio-block-header center-align">
            <h2 className="portfolio-section-heading color-white">
              Key Development Partners Served
            </h2>
          </div>
          <div className="portfolio-chips-flex-row">
            {PARTNERS.map((partner, index) => (
              <span key={index} className="portfolio-partner-chip-node">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION STRIP */}
      <section className="portfolio-cta-strip-block">
        <div className="portfolio-layout-container">
          <FadeUp>
            <div className="portfolio-cta-inner-card">
              <div className="portfolio-cta-text-wrapper">
                <h2 className="portfolio-cta-heading">
                  Want to partner on a framework?
                </h2>
                <p className="portfolio-cta-paragraph">
                  We match institutional requirements with rigorous field
                  experience and local operational data context.
                </p>
              </div>
              <Link to="/contact#form" className="portfolio-cta-action-button">
                Start a Conversation →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
