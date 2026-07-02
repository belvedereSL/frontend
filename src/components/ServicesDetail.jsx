import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { servicesData } from "../Data/servicesData";
import "./ServicesDetail.css";

import YeriNotesForm from "./YeriNotes";

// {Agribiz}
import Agribiz1 from "../assets/Services/Agribiz-3.jpeg";
import Agribiz2 from "../assets/Services/Agribiz-1.jpeg";
import Agribiz3 from "../assets/Services/Agribiz-2.jpeg";
// {Project M}
import ProjectM1 from "../assets/Services/ProjectM-1.jpeg";
import ProjectM2 from "../assets/Services/ProjectM-3.jpeg";
import ProjectM3 from "../assets/Services/ProjectM-5.jpeg";

// {Capacity}
import Capacity1 from "../assets/Services/CapacityB-1.jpeg";
import Capacity2 from "../assets/Services/Capacity-4.jpeg";
import Capacity3 from "../assets/Services/CapacityB-3.jpeg";

// {Youth}
import Youth1 from "../assets/Services/Youth-2.jpeg";
import Youth2 from "../assets/Services/Youth-1.jpeg";
import Youth3 from "../assets/Services/Youth-4.jpeg";

// {Private}
import Private1 from "../assets/Services/Private-4.jpeg";
import Private2 from "../assets/Services/Private-3.jpeg";
import Private3 from "../assets/Services/Private-1.jpeg";

// {YeriNotes}
import YeriNotes1 from "../assets/Services/YeriNotes 1.jpg";
import YeriNotes2 from "../assets/Services/YeriNotes 3.jpg";
import YeriNotes3 from "../assets/Services/YeriNotes 2.jpg";
import Logo from "../assets/Logo/YeriNotes logo 2025.jpg";

// {Strategy}
import Strategic1 from "../assets/Services/Strategic-1.avif";
import Strategic2 from "../assets/Services/Strategic-2.jpg";
import Strategic3 from "../assets/Services/Strategic-3.jpg";
import Strategic4 from "../assets/Services/Strategy-4.jpg";

// {Research}
import Research1 from "../assets/Services/Research 1.png";
import Research2 from "../assets/Services/Research 2.png";
import Research3 from "../assets/Services/Research 3.png";

// {Climate}
import Climate1 from "../assets/Services/Climate 1.jpeg";
import Climate2 from "../assets/Services/Climate 2.jpeg";
import Climate3 from "../assets/Services/Climate 3.jpeg";

const serviceHeroImages = {
  "yeri-notes":
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop",
  "project-management": ProjectM1,
  "agriculture-agribusiness": Agribiz1,
  "capacity-building": Capacity1,
  "youth-employment": Youth1,
  "private-sector": Private1,
  "yeri-notes": YeriNotes1,
  "strategic-advisory": Strategic1,
  "climate-change": Climate1,
  "research-evaluation": Research1,
};

const serviceImages1 = {
  "yeri-notes":
    "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1600&auto=format&fit=crop",

  "agriculture-agribusiness": Agribiz2,
  "project-management": ProjectM2,
  "capacity-building": Capacity2,
  "youth-employment": Youth2,
  "private-sector": Private2,
  "yeri-notes": YeriNotes2,
  "strategic-advisory": Strategic2,
  "climate-change": Climate2,
  "research-evaluation": Research2,
};

const serviceImages2 = {
  "yeri-notes":
    "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1600&auto=format&fit=crop",

  "agriculture-agribusiness": Agribiz3,
  "project-management": ProjectM3,
  "capacity-building": Capacity3,
  "youth-employment": Youth3,
  "private-sector": Private3,
  "yeri-notes": YeriNotes3,
  "strategic-advisory": Strategic3,
  "climate-change": Climate3,
  "research-evaluation": Research3,
};

const serviceImages3 = {
  "strategic-advisory": Strategic4,
};

const yeriNotesLogo = {
  "yeri-notes": Logo,
};

const ServicesDetail = () => {
  const { id } = useParams();
  const service = servicesData.find((item) => item.id === id);

  // State to manage whether the sub-page modal overlay is visible
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Freeze background scrolling when modal is active, restore on close or unmount
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (!service) {
    return (
      <div className="services-detail-error">
        <h2>Service Division Not Found</h2>
        <p>
          The division path requested does not match our current capability
          records.
        </p>
        <Link to="/services" className="error-return-btn">
          Return to Capability Overview
        </Link>
      </div>
    );
  }

  const isYeriNotes = service.id === "yeri-notes";

  const backgroundImage =
    serviceHeroImages[id] ||
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600";
  const Image1 =
    serviceImages1[id] ||
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600";
  const Image2 =
    serviceImages2[id] ||
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600";
  const Image3 = id === "strategic-advisory" ? serviceImages3[id] : null;

  const Logo = id === "yeri-notes" ? yeriNotesLogo[id] : null;

  return (
    <div className="detail-page-wrapper">
      <div
        className="detail-hero-section"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <Link to="/services" className="detail-back-navigation">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Services</span>
          </Link>

          <header className="detail-header-block">
            <h1 className="detail-master-title">{service.title}</h1>
            <p className="detail-header-tagline">{service.tagline}</p>
            <div className="detail-header-divider" />
          </header>
        </div>
      </div>

      <div className="detail-premium-container">
        <div className="detail-layout-split">
          <main className="detail-primary-column">
            <div className="yerinotes-logo-container">
              <img src={Logo} alt="" />
            </div>

            <section className="detail-content-section">
              <h2 className="detail-section-headline">{service.headline}</h2>
              <p className="detail-section-definition">{service.definition}</p>
            </section>

            <section className="detail-content-section">
              <h3 className="detail-section-subheading">Our Services</h3>
              <ul className="detail-operational-list">
                {service.whatWeDo.map((item, idx) => {
                  const hasColon = item.includes(":");
                  const parts = hasColon ? item.split(":") : [item];
                  return (
                    <li key={idx} className="operational-list-item">
                      <span className="operational-bullet" />
                      <p>
                        {hasColon ? (
                          <>
                            <strong>{parts[0]}:</strong>
                            {parts.slice(1).join(":")}
                          </>
                        ) : (
                          item
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
              {service.SSB && (
                <ul className="sidebar-stakeholder-list-sb">
                  {service.SSB.map((stakeholder, idx) => (
                    <li key={idx}>
                      <span className="widget-bullet" />
                      <span>{stakeholder}</span>
                    </li>
                  ))}
                </ul>
              )}
              {service.SSBINFO && (
                <p className="widget-advantage-desc">{service.SSBINFO}</p>
              )}
            </section>
            <div className="img">
              <img src={Image3} alt="" />
            </div>
          </main>

          <aside className="detail-sidebar-column">
            <div className="sidebar-sticky-panel">
              <div className="img">
                <img src={Image1} alt="" />
              </div>
              <div className="sidebar-widget box-background">
                <h4 className="widget-matrix-title">Who We Serve</h4>
                <ul className="sidebar-stakeholder-list">
                  {service.whoWeServe.map((stakeholder, idx) => (
                    <li key={idx}>
                      <span className="widget-bullet" />
                      <span>{stakeholder}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget standard-spacing">
                <h4 className="widget-matrix-title">
                  {service.whyBelvedereTitle}
                </h4>
                <p className="widget-advantage-desc">{service.whyBelvedere}</p>
              </div>
              <div className="img">
                <img src={Image2} alt="" />
              </div>
            </div>
          </aside>
        </div>
        {/* --- EVENTS WE COVER ROW --- */}
        {isYeriNotes && service.eventsWeCover && (
          <section className="detail-content-section">
            <h3 className="detail-section-subheading">Events We Cover</h3>
            <div className="detail-deliverables-grid">
              {service.eventsWeCover.map((event, idx) => (
                <div key={idx} className="deliverable-metric-card">
                  <span className="deliverable-check-marker">✦</span>
                  <p>{event}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* --- DETAILED STRUCTURED METHODOLOGY APPROACH --- */}
        {isYeriNotes && service.detailedApproach && (
          <section className="custom-approach-block-row">
            <h3 className="detail-section-subheading">Our Approach</h3>
            <div className="custom-approach-timeline-grid">
              {service.detailedApproach.map((phase, idx) => (
                <div key={idx} className="custom-approach-step-card">
                  <div className="step-card-header-index">
                    <span>{phase.step}</span>
                  </div>
                  <h4>{phase.title}</h4>
                  <p>{phase.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="detail-content-section">
          <h3 className="detail-section-subheading">What We Deliver</h3>
          <div className="detail-deliverables-grid">
            {service.whatWeDeliver.map((deliverable, idx) => (
              <div key={idx} className="deliverable-metric-card">
                <span className="deliverable-check-marker">✓</span>
                <p>{deliverable}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="sidebar-widget dynamic-quote-box">
          {/* <h4 className="widget-matrix-title">Our Commitments</h4> */}
          <blockquote>{service.ourApproach}</blockquote>
        </div>

        {/* --- CTA BANNER --- */}
        {isYeriNotes && service.ctaSection && (
          <div className="custom-yeri-cta-banner">
            <h3>{service.ctaSection.title}</h3>
            <p>{service.ctaSection.desc}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="yeri-action-button"
              style={{ border: "none", cursor: "pointer" }}
            >
              Get in touch
            </button>
          </div>
        )}

        {/* --- DYNAMIC SUB-PAGE OVERLAY MODAL --- */}
        {isYeriNotes && isModalOpen && (
          <div
            className="yeri-subpage-overlay"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="yeri-subpage-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Exit Vector Control */}
              <button
                className="yeri-subpage-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>

              <div className="yeri-subpage-form-wrapper">
                <YeriNotesForm />
              </div>
            </div>
          </div>
        )}

        <div className="sidebar-conclusion-badge">
          <p>{service.conclusionTagline}</p>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetail;
