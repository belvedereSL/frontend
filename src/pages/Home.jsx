import React from "react";
import "./Home.css";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FadeUp } from "../components/Animate";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import heroVideo from "../assets/Background-Videos/hero-video.mp4";
// 1. Imported the servicesData dynamically
import { servicesData } from "../Data/servicesData";

const MotionNavLink = motion.create(NavLink);

const stats = [
  {
    num: 30,
    suffix: "+",
    label: "Projects Succefully Delivered",
    desc: "Across 14 districts of Sierra Leone",
  },
  {
    suffix2: "$",
    num: 207,
    suffix: "M+",
    label: "Development Programmes Supported",
    desc: "In vocational and digital skills",
  },
  {
    num: 16,
    suffix: "+",
    label: "International & Goverment Partners",
    desc: "Participants completing full programs",
  },
  {
    num: 6,
    suffix: "years",
    label: "Proven Develpment Impact (2019-2025)",
    desc: "Local organizations and leaders",
  },
];

function CountUp({ end, suffix, inView }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = end / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setVal(end);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <>
      {val.toLocaleString()}
      {suffix}
    </>
  );
}

const Home = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <>
      <div className="home">
        {/* Hero Section with Video Background */}
        <motion.div
          className="home-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <video
            className="home-video-bg"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1595872234935-758c5bfc1f6e?w=1600&q=60"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          <div className="home-overlay" />

          {/* Hero Content */}
          <motion.div
            className="home-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="home-content-eyebrow">
              <span className="home-eyebrowLine" />
              Improving Quality of Lives
            </div>

            <div className="home-headline">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Belvedere SL
              </motion.h1>

              <motion.p
                className="home-sub"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Belvedere (SL) Ltd. partners with governments, development
                institutions, businesses, and communities to deliver
                research-driven solutions that promote sustainable growth,
                strengthen institutions, and improve lives across Sierra Leone
                and West Africa.
              </motion.p>

              <div className="home-content-btn">
                <MotionNavLink to="/services" className="home-content-cta1">
                  OUR PROGRAMS
                </MotionNavLink>
                <MotionNavLink to="/about" className="home-content-cta2">
                  LEARN MORE
                </MotionNavLink>
              </div>
            </div>
          </motion.div>

          <div className="home-scroll-indicator">
            <span className="scroll-text">SCROLL DOWN</span>
            <div className="scroll-line">
              <div className="scroll-dot" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Our Story Section */}
      <section className="home-story-section">
        <div className="story-editorial-container">
          <div className="story-split-grid">
            <div className="story-meta-col">
              <span className="story-eyebrow">Who We Are</span>
              <p className="story-lead-text">
                Belvedere (SL) Ltd. is a leading Sierra Leonean research,
                advisory, and development consulting firm dedicated to
                delivering innovative solutions that drive sustainable economic
                growth, institutional transformation, and social impact.
              </p>
            </div>
            <div className="story-content-col">
              <p className="story-body-text">
                As an agile, multidisciplinary, and results-oriented company, we
                provide high-quality consultancy, research, project management,
                and advisory services to governments, development partners,
                multilateral institutions, non-governmental organizations,
                corporations, and private sector investors across Sierra Leone
                and the wider West African region.
              </p>
              <NavLink to="/about#story" className="story-readmore-link">
                <span>Read Our Full Story</span>
                <span className="arrow-icon">→</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <motion.div
        className="section3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <section id="impact" className="impact">
          <div className="impact-inner">
            <FadeUp>
              <span className="impact-eyebrow">Our Impact</span>
              <h2 className="impact-heading">
                Numbers that tell
                <br />
                <em>a real story.</em>
              </h2>
            </FadeUp>

            <div className="impact-grid" ref={ref}>
              {stats.map((s, i) => (
                <FadeUp key={s.label} delay={i * 0.1}>
                  <div className="impact-card">
                    <div className="impact-num">
                      {s.suffix2}
                      <CountUp end={s.num} suffix={s.suffix} inView={inView} />
                    </div>
                    <div className="impact-divider" />
                    <div className="impact-label">{s.label}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      {/* Unique Interlinked Programs Section */}
      <section id="programs" className="program-programs">
        <div className="program-inner">
          <div className="program-header">
            <FadeUp>
              <span className="program-eyebrow">What We Do</span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="program-intro">
                Click on any specialized focus area to explore our core
                deliverables, systems frameworks, and target stakeholder groups.
              </p>
            </FadeUp>
          </div>

          <div className="premium-program-strip-grid">
            {/* 2. Swapped programsData loop out for servicesData loop */}
            {servicesData.map((prog, i) => {
              // Automatically pads index out nicely (e.g. 01, 02...)
              const calculatedIndex = String(i + 1).padStart(2, "0");

              return (
                <motion.div
                  key={prog.id}
                  className="program-strip-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  {/* 3. Corrected routing target to link directly to individual pages */}
                  <NavLink
                    to={`/services/${prog.id}`}
                    className="program-strip-link"
                  >
                    <div className="strip-index"></div>
                    <h3 className="strip-title">{prog.name || prog.title}</h3>
                    <div className="strip-arrow">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </NavLink>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
