import React, { useState } from "react";
import "./About.css";
import "../App.css";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, SlideIn } from "../components/Animate";
import heroVideo from "../assets/Background-Videos/About.mp4";

const team = [
  { name: "Isata Koroma", role: "Executive Director", img: "" },
  { name: "Samuel Bangura", role: "Head of Programs", img: "" },
  { name: "Mariama Conteh", role: "Community Relations", img: "" },
  { name: "Ibrahim Sesay", role: "Finance & Operations", img: "" },
];

const coreValues = [
  {
    label: "Integrity",
    desc: "We act with honesty, transparency, and accountability.",
  },
  {
    label: "Excellence",
    desc: "We deliver quality, professionalism, and measurable results.",
  },
  {
    label: "Innovation",
    desc: "We develop practical, forward-thinking, and sustainable solutions.",
  },
  {
    label: "Partnership",
    desc: "We build collaborative relationships that create lasting value.",
  },
  {
    label: "Impact",
    desc: "We focus on improving lives and strengthening institutions.",
  },
];

const expertiseAreas = [
  "Strategic Advisory & Institutional Development",
  "Research, Monitoring & Evaluation",
  "Agriculture & Agribusiness Development",
  "Climate Change & Sustainable Development",
  "Youth Employment & Skills Development",
  "Private Sector Development & Investment Advisory",
  "Project Management & Implementation Support",
  "Capacity Building & Training",
];

const valueProps = [
  "Strong local contextual understanding matched with international best practices",
  "Multidisciplinary technical expertise driving evidence-based decision-making",
  "Practical, end-to-end implementation support bridging strategy and execution",
];

const partnerTypes = [
  {
    title: "Public Sector",
    desc: "Government Ministries, Departments, and Agencies",
  },
  {
    title: "Global Actors",
    desc: "Multilateral and bilateral development institutions, International NGOs",
  },
  {
    title: "Local Communities",
    desc: "Local NGOs, Community-based organizations, and training institutions",
  },
  {
    title: "Market Builders",
    desc: "Private sector organizations and strategic investors",
  },
];

const About = () => {
  const [showFullStory, setShowFullStory] = useState(false);
  // Track when video is fully buffered and ready to play without a hitch
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <>
      {/* 1. HERO SECTION */}
      <motion.div
        className="bg"
        initial={{ opacity: 0 }}
        // Keeps background invisible until video loaded, preventing black frame pops
        animate={{ opacity: isVideoReady ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <video
          className="video-bg"
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setIsVideoReady(true)}
          poster="https://images.unsplash.com/photo-1595872234935-758c5bfc1f6e?w=1600&q=60"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="about-overlay" />
        <motion.div className="content">
          <motion.div
            className="content-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isVideoReady ? 1 : 0,
              y: isVideoReady ? 0 : 20,
            }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrowLine" />
            Driven by Purpose. Defined by Excellence
          </motion.div>
          <div className="headline">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: isVideoReady ? 1 : 0,
                y: isVideoReady ? 0 : 40,
              }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Our Story
            </motion.h1>
            {/* <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: isVideoReady ? 1 : 0,
                y: isVideoReady ? 0 : 40,
              }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              of Creating Lasting Impact.
            </motion.h1> */}
            <motion.p
              className="sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isVideoReady ? 1 : 0,
                y: isVideoReady ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              For years, Belvedere has combined local expertise with global best
              practices to provide strategic consulting, research, and
              development solutions that help organizations achieve measurable
              and sustainable results.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Unique Story Teaser & Full Expansion Section */}
      <motion.section
        id="story"
        className="story-teaserSection"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="story-container">
          <div className="story-teaserGrid">
            <div className="story-gridBlock">
              <FadeUp>
                <span className="story-eyebrow">Our Story</span>
                {/* <h2 className="story-heading">
                  Our Story
                </h2> */}
                <FadeUp delay={0.1}>
                  <p className="story-teaserText">
                    Belvedere (SL) Ltd. is a leading Sierra Leonean research,
                    advisory, and development consulting firm dedicated to
                    delivering innovative solutions that drive sustainable
                    economic growth, institutional transformation, and social
                    impact. As an agile, multidisciplinary, and results-oriented
                    company, we provide high-quality consultancy, research,
                    project management, and advisory services to governments,
                    development partners, multilateral institutions,
                    non-governmental organizations, corporations, and private
                    sector investors across Sierra Leone and the wider West
                    African region.
                  </p>
                  <button
                    className="story-toggleBtn"
                    onClick={() => setShowFullStory(!showFullStory)}
                  >
                    {showFullStory ? "Hide Full Story" : "Read Full Story"}
                    <span
                      className={`story-arrow ${showFullStory ? "up" : "down"}`}
                    >
                      ↓
                    </span>
                  </button>
                </FadeUp>
              </FadeUp>
            </div>
            {/* <div className="story-gridBlock"></div> */}
          </div>

          <AnimatePresence>
            {showFullStory && (
              <motion.div
                className="story-fullContent"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="story-divider" />
                <div className="story-layeredGrid">
                  {/* Layer 1: Scope */}
                  <div className="story-layerRow">
                    <div className="layer-label">Project Lifecycle</div>
                    <div className="layer-text">
                      <p>
                        Belvedere specializes in supporting clients throughout
                        the project cycle—from diagnostics and research to
                        strategy formulation, implementation support, monitoring
                        and evaluation, and impact assessment.
                      </p>
                      <p>
                        Our expertise spans a broad range of sectors including
                        economic development, agriculture and agribusiness,
                        climate resilience, renewable energy, youth employment,
                        private sector development, organizational capacity
                        building, housing, social protection, and public sector
                        reform.
                      </p>
                    </div>
                  </div>

                  {/* Layer 2: Partnerships */}
                  <div className="story-layerRow">
                    <div className="layer-label">Global Track Record</div>
                    <div className="layer-text">
                      <p>
                        Over the years, Belvedere has successfully delivered
                        assignments for leading international development
                        institutions and government agencies, including the
                        World Bank, African Development Bank, Islamic
                        Development Bank, European Union, United Nations
                        Industrial Development Organization (UNIDO), UNICEF, the
                        World Food Programme (WFP), and the Government of Sierra
                        Leone.
                      </p>
                      <p>
                        Our extensive experience working with donor-funded
                        programs enables us to navigate complex development
                        environments while maintaining the highest standards of
                        quality, accountability, and results.
                      </p>
                    </div>
                  </div>

                  {/* Layer 3: Distinction */}
                  <div className="story-layerRow">
                    <div className="layer-label">The Distinction</div>
                    <div className="layer-text">
                      <p>
                        What distinguishes Belvedere is our ability to combine
                        deep local knowledge with international best practices.
                        We understand the unique social, economic, political,
                        and institutional dynamics of Sierra Leone while
                        leveraging global expertise and innovative approaches to
                        address emerging development challenges. This allows us
                        to provide practical, context-specific solutions that
                        are both technically sound and locally relevant.
                      </p>
                    </div>
                  </div>

                  {/* Layer 4: Team */}
                  <div className="story-layerRow">
                    <div className="layer-label">Our Backbone</div>
                    <div className="layer-text">
                      <p>
                        Our team comprises highly experienced consultants,
                        researchers, development practitioners, and technical
                        specialists with more than 75 years of combined
                        experience in organizational development, policy
                        analysis, strategic planning, project management,
                        monitoring and evaluation, capacity development, and
                        socio-economic research. Our professionals have worked
                        extensively across Africa, Europe, Asia, and North
                        America, bringing a global perspective to every
                        engagement.
                      </p>
                    </div>
                  </div>

                  {/* Layer 5: Foundation */}
                  <div className="story-layerRow">
                    <div className="layer-label">Philosophy & Promise</div>
                    <div className="layer-text">
                      <p>
                        Belvedere is built on a strong foundation of integrity,
                        professionalism, excellence, innovation, and
                        partnership. We work closely with our clients to
                        understand their goals, challenges, and priorities,
                        tailoring our services to deliver measurable outcomes
                        and sustainable impact.
                      </p>
                      <p>
                        Whether supporting institutional reforms, conducting
                        complex evaluations, strengthening organizational
                        capacity, developing investment strategies, or managing
                        large-scale development projects, we are committed to
                        helping our clients create meaningful and lasting
                        change.
                      </p>
                      <p className="story-highlightText">
                        At Belvedere, we believe that sustainable development
                        requires strong institutions, inclusive economic growth,
                        evidence-based decision-making, and strategic
                        partnerships. We are committed to helping our clients
                        achieve these goals and deliver the change that matters.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Mission + Vision */}
      <section className="mission-missionSection">
        <div className="mission-container">
          <div className="mission-missionGrid">
            <div className="mission-gridWrapper">
              <SlideIn direction="left">
                <div className="mission-missionCard">
                  <span className="mission-cardLabel">Our Mission</span>
                  <p className="mission-cardText">
                    To improve quality of lives by providing innovative
                    research, advisory, capacity-building, and development
                    solutions that strengthen institutions, empower communities,
                    and promote sustainable and inclusive growth.
                  </p>
                </div>
              </SlideIn>
            </div>
            <div className="mission-gridWrapper">
              <SlideIn direction="right" delay={0.1}>
                <div className="mission-missionCard">
                  <span className="mission-cardLabel">Our Vision</span>
                  <p className="mission-cardText">
                    To be a trusted leader in development consulting and
                    advisory services, driving sustainable economic growth,
                    resilient institutions, and improved quality of life across
                    Africa.
                  </p>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="value-valuesSection">
        <div className="value-container">
          <FadeUp>
            <span className="value-eyebrow">What Guides Us</span>
            <h2 className="value-sectionHeading">Our Core Values</h2>
          </FadeUp>
          <div className="value-valuesGrid">
            {coreValues.map((v, i) => (
              <div className="value-gridWrapper" key={v.label}>
                <FadeUp delay={i * 0.1}>
                  <div className="value-valueCard">
                    <span className="value-valueNum">0{i + 1}</span>
                    <h3 className="value-valueLabel">{v.label}</h3>
                    <p className="value-valueDesc">{v.desc}</p>
                  </div>
                </FadeUp>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Propositions Layout
      <section className="expertise-section">
        <div className="expertise-container">
          <div className="expertise-splitLayout">
            <div className="expertise-splitColumn">
              <FadeUp>
                <div className="expertise-leftBlock">
                  <span className="expertise-eyebrow">Capabilities</span>
                  <h2 className="expertise-heading">Core Areas of Expertise</h2>
                  <p className="expertise-desc">
                    We deliver integrated development solutions structured
                    thoroughly across key developmental sectors.
                  </p>
                  <div className="expertise-grid">
                    {expertiseAreas.map((item, index) => (
                      <div key={index} className="expertise-item">
                        <span className="expertise-dot" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            <div className="expertise-splitColumn">
              <FadeUp delay={0.2}>
                <div className="expertise-rightBlock">
                  <span className="expertise-eyebrow">Value Proposition</span>
                  <h2 className="expertise-heading">Why Partner With Us</h2>
                  <p className="expertise-desc">
                    Belvedere stands cleanly at the nexus line that bridges the
                    historical gap between strategy and execution.
                  </p>
                  <div className="props-stack">
                    {valueProps.map((prop, idx) => (
                      <div key={idx} className="prop-card">
                        <h5>0{idx + 1}</h5>
                        <p>{prop}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

       Partnerships Section 
      <section className="partners-section">
        <div className="partners-container">
          <FadeUp>
            <span className="partners-eyebrow">Our Ecosystem</span>
            <h2 className="partners-heading">
              Partnerships & Sustainable Impact
            </h2>
            <p className="partners-subtitle">
              We work in hand-shake synergy with a comprehensive cohort of
              actors to transform ideas into tangible societal output.
            </p>
          </FadeUp>
          <div className="partners-grid">
            {partnerTypes.map((partner, index) => (
              <div className="partners-gridWrapper" key={index}>
                <FadeUp delay={index * 0.1}>
                  <div className="partner-card">
                    <h4>{partner.title}</h4>
                    <p>{partner.desc}</p>
                  </div>
                </FadeUp>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Forward Commitment Section
      <section className="commitment-section">
        <div className="commitment-container">
          <FadeUp>
            <h2>Our Commitment Going Forward</h2>
            <p>
              Belvedere remains firmly committed to its structural mission of
              improving the quality of human lives. As we trace our growth
              trajectories ahead, our focus remains on deepening local
              operational impact, building resilient capabilities, expanding
              worldwide alignments, and pushing inclusive societal progress.
            </p>
          </FadeUp>
        </div>
      </section> */}
    </>
  );
};

export default About;
