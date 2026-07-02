import React from "react";
import "./contact.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { FadeUp, SlideIn } from "../components/Animate";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import heroVideo from "../assets/Background-Videos/Contact.mp4";

const topics = [
  "Strategy Advisory",
  "Research & Evaluation",
  "Agriculture & Agribusiness",
  "Climate change",
  "Youth Employment",
  "Private sector development",
  "Project Management",
  "Capacity building",
];

const faqs = [
  {
    q: "How can I donate to Belvedere SL?",
    a: "You can donate via bank transfer, mobile money, or international platforms like PayPal. Contact us and we'll guide you through the process.",
  },
  {
    q: "Do you accept international volunteers?",
    a: "Yes — we welcome skilled volunteers, particularly in health, education, and technology. We prioritize volunteers who can commit to at least 3 months.",
  },
  {
    q: "How is Belvedere SL funded?",
    a: "We are funded through a mix of individual donors, grants, and institutional partnerships. Our annual report includes full financial transparency.",
  },
  {
    q: "Can organizations partner with you on programs?",
    a: "Absolutely. We actively seek partnerships with organizations whose values align with ours. Reach out to start a conversation.",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Pulling the keys securely from your .env file
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(serviceId, templateId, form, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSent(true);
      })
      .catch((err) => {
        console.error("FAILED...", err);
        alert("Oops! Something went wrong while sending your message.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
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

        <div className="contact-overlay" />
        <motion.div className="content">
          <motion.div
            className="content-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrowLine" />
            Let's Build Impact Together
          </motion.div>
          <div className="headline">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Contact
            </motion.h1>
            {/* <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            ></motion.h1> */}
            <motion.p
              className="sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              Whether you're seeking expert advisory services, research support,
              strategic partnerships, or project collaboration, our team is
              ready to help turn your vision into lasting impact.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
      {/* {CONTACT INFO} */}

      <motion.section
        className="section"
        id="form"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container">
          <div className="grid">
            {/* Left — info */}
            <div className="infoCol">
              <FadeUp>
                <h2 className="infoHeading">Reach out to us</h2>
                <p className="infoText">
                  Our team is based in Freetown and responds to all inquiries
                  within 48 hours. For urgent media or partnership requests,
                  please indicate that in your message.
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="details">
                  {[
                    {
                      label: "Email",
                      val: "hello@belvedereSL.org",
                      href: "mailto:hello@belvedereSL.org",
                    },
                    {
                      label: "Phone",
                      val: "+232 76 000 000",
                      href: "tel:+23276000000",
                    },
                    {
                      label: "Address",
                      val: "14 Wilberforce Street, Freetown, Sierra Leone",
                      href: null,
                    },
                    {
                      label: "Office Hours",
                      val: "Mon – Fri, 8am – 5pm (GMT)",
                      href: null,
                    },
                  ].map((d) => (
                    <div key={d.label} className="detail">
                      <span className="detailLabel">{d.label}</span>
                      {d.href ? (
                        <a href={d.href} className="detailVal">
                          {d.val}
                        </a>
                      ) : (
                        <span className="detailVal">{d.val}</span>
                      )}
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="socials">
                  <span className="socialsLabel">Follow Us</span>
                  {[
                    {
                      name: "Twitter / X",
                      url: "https://twitter.com/BelvedereSL",
                    },
                    {
                      name: "Instagram",
                      url: "https://instagram.com/BelvedereSL",
                    },
                    {
                      name: "LinkedIn",
                      url: "https://linkedin.com/company/belvederesl",
                    },
                    {
                      name: "Facebook",
                      url: "https://facebook.com/BelvedereSL",
                    },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      className="social"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right — form */}
            <SlideIn direction="right" delay={0.1}>
              <div className="formWrap">
                {sent ? (
                  <motion.div
                    className="thanks"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span className="thanksIcon">✓</span>
                    <h3>Message received.</h3>
                    <p>We'll be in touch</p>
                    <button
                      className="resetBtn"
                      onClick={() => {
                        setSent(false);
                        setForm({
                          name: "",
                          email: "",
                          topic: "",
                          message: "",
                        });
                      }}
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form className="form" onSubmit={handleSubmit}>
                    <h3 className="formHeading">Send a Message</h3>
                    <div className="row">
                      <div className="field">
                        <label className="label" htmlFor="name">
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="input"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                        />
                      </div>
                      <div className="field">
                        <label className="label" htmlFor="email">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="input"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="abel" htmlFor="topic">
                        Topic
                      </label>
                      <select
                        id="topic"
                        name="topic"
                        className="input"
                        value={form.topic}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a topic</option>
                        {topics.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="textarea"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="How can we help?"
                      />
                    </div>
                    <button type="submit" className="submit">
                      Send Message <span>→</span>
                    </button>
                  </form>
                )}
              </div>
            </SlideIn>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <section className="faqSection">
        <div className="faqcontainer">
          <FadeUp>
            <span className="eyebrow">Common Questions</span>
            <h2 className="faqHeading">Frequently Asked</h2>
          </FadeUp>
          <div className="contact-faqs">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="faqItem">
                  <button
                    className="faqQ"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <span className="faqToggle">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === i ? "auto" : 0,
                      opacity: openFaq === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="faqAWrap"
                  >
                    <p className="faqA">{faq.a}</p>
                  </motion.div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
