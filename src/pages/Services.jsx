import React from "react";
import "./Services.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeUp } from "../components/Animate";
import heroVideo2 from "../assets/Background-Videos/Video 2.mp4";
import { servicesData } from "../Data/servicesData";

const approachSteps = [
  {
    step: "01",
    title: "Listen",
    desc: "We begin by understanding your challenges, opportunities, and ambitions through research, stakeholder engagement, and evidence-based analysis.",
  },
  {
    step: "02",
    title: "Co-Design",
    desc: "Working side by side with clients and partners, we develop tailored strategies and practical solutions that reflect local realities and global best practices.",
  },
  {
    step: "03",
    title: "Pilot",
    desc: "We validate ideas through targeted pilot initiatives, using real-world evidence and continuous learning to refine approaches before wider implementation.",
  },
  {
    step: "04",
    title: "Scale",
    desc: "We expand successful solutions with robust implementation support, capacity strengthening, and performance monitoring to achieve sustainable, long-term impact.",
  },
];

const Services = () => {
  return (
    <>
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
          <source src={heroVideo2} type="video/mp4" />
        </video>

        <div className="service-overlay" />
        <motion.div className="content">
          <motion.div
            className="content-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrowLine" />
            Expert Solutions. Measurable Results
          </motion.div>

          <div className="headline">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Services
            </motion.h1>

            <motion.p
              className="sub"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              From research and advisory services to project management,
              agribusiness, capacity building, and institutional strengthening,
              we deliver practical solutions tailored to today's development
              challenges.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      <motion.section
        className="services-links-section"
        id="services"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="services-premium-container">
          <span className="sidebar-section-title">What We Do</span>
          <div className="services-links-grid">
            {servicesData.map((sv, i) => {
              // Dynamically stringify indices to make sure everything lines up cleanly (e.g., 01, 02... 09)
              const displayIndex = String(i + 1).padStart(2, "0");
              return (
                <Link
                  key={sv.id}
                  to={`/services/${sv.id}`}
                  className="services-link-card"
                >
                  <div className="link-card-meta">
                    <span className="link-item-number"></span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="link-arrow-icon"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                  <h3 className="link-item-label">{sv.title}</h3>
                  <p className="link-item-tagline">{sv.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.section>

      <section className="services-approachSection">
        <div className="services-premium-container">
          <FadeUp>
            <span className="services-eyebrow">Our Methodology</span>
            <h2 className="services-sectionHeading">
              How every program is built
            </h2>
          </FadeUp>

          <div className="premium-approach-grid">
            {approachSteps.map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.1}>
                <div className="premium-step-card">
                  <div className="step-card-header">
                    <span className="step-card-number">{item.step}</span>
                    <div className="step-card-line" />
                  </div>
                  <h3 className="step-card-title">{item.title}</h3>
                  <p className="step-card-desc">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
