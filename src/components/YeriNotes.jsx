import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./YeriNotes.css";

const YeriNotes = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const [source, setSource] = useState("");
  const [sourceOther, setSourceOther] = useState("");

  const [interest, setInterest] = useState("");
  const [interestOther, setInterestOther] = useState("");

  const [timeline, setTimeline] = useState("");
  const [timelineOther, setTimelineOther] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_YERI_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_YERI_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          setStatusMessage({
            type: "success",
            text: "Thank you! Your note has been sent successfully.",
          });
          formRef.current.reset();
          setSource("");
          setInterest("");
          setTimeline("");
        },
        (error) => {
          setStatusMessage({
            type: "error",
            text: "Something went wrong. Please try again later.",
          });
          console.error("EmailJS Error:", error.text);
        },
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="service-contact-container">
      <div className="service-contact-header">
        <h1>YēriNote - Get in Touch</h1>
        <p className="description">
          YēriNotes supports individuals and organisations with note-taking,
          documentation, and written outputs for meetings, workshops, research,
          and events.
        </p>
        <p className="sub-description">
          Share a few details below and we’ll be in touch.
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="service-contact-form"
      >
        <div className="form-group">
          <label htmlFor="user_name">Full Name *</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            required
            placeholder="John Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="user_email">Email Address *</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="user_org">Organization / Affiliation</label>
          <input
            type="text"
            id="user_org"
            name="user_org"
            placeholder="Company or Institution name"
          />
        </div>

        <div className="form-group">
          <label>How did you hear about YēriNotes?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hear_source"
                value="Event/Workshop"
                checked={source === "Event/Workshop"}
                onChange={(e) => setSource(e.target.value)}
              />{" "}
              Event/Workshop
            </label>
            <label>
              <input
                type="radio"
                name="hear_source"
                value="Recommendation"
                checked={source === "Recommendation"}
                onChange={(e) => setSource(e.target.value)}
              />{" "}
              Recommendation
            </label>
            <label>
              <input
                type="radio"
                name="hear_source"
                value="Social Media"
                checked={source === "Social Media"}
                onChange={(e) => setSource(e.target.value)}
              />{" "}
              Social Media
            </label>
            <label>
              <input
                type="radio"
                name="hear_source"
                value="Website"
                checked={source === "Website"}
                onChange={(e) => setSource(e.target.value)}
              />{" "}
              Website
            </label>
            <label>
              <input
                type="radio"
                name="hear_source"
                value="Other"
                checked={source === "Other"}
                onChange={(e) => setSource(e.target.value)}
              />{" "}
              Other
            </label>
          </div>
          {source === "Other" && (
            <input
              type="text"
              name="hear_source_other"
              placeholder="Please specify..."
              required
              value={sourceOther}
              onChange={(e) => setSourceOther(e.target.value)}
              className="conditional-input"
            />
          )}
        </div>

        <div className="form-group">
          <label>What would you like to know more about?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="interest_topic"
                value="Note-taking / rapporteur services"
                checked={interest === "Note-taking / rapporteur services"}
                onChange={(e) => setInterest(e.target.value)}
              />{" "}
              Note-taking / rapporteur services
            </label>
            <label>
              <input
                type="radio"
                name="interest_topic"
                value="Workshop or meeting documentation"
                checked={interest === "Workshop or meeting documentation"}
                onChange={(e) => setInterest(e.target.value)}
              />{" "}
              Workshop or meeting documentation
            </label>
            <label>
              <input
                type="radio"
                name="interest_topic"
                value="Research or interview notes"
                checked={interest === "Research or interview notes"}
                onChange={(e) => setInterest(e.target.value)}
              />{" "}
              Research or interview notes
            </label>
            <label>
              <input
                type="radio"
                name="interest_topic"
                value="Reports or summaries"
                checked={interest === "Reports or summaries"}
                onChange={(e) => setInterest(e.target.value)}
              />{" "}
              Reports or summaries
            </label>
            <label>
              <input
                type="radio"
                name="interest_topic"
                value="Ongoing / retainer support"
                checked={interest === "Ongoing / retainer support"}
                onChange={(e) => setInterest(e.target.value)}
              />{" "}
              Ongoing / retainer support
            </label>
            <label>
              <input
                type="radio"
                name="interest_topic"
                value="Not sure yet – just exploring"
                checked={interest === "Not sure yet – just exploring"}
                onChange={(e) => setInterest(e.target.value)}
              />{" "}
              Not sure yet – just exploring
            </label>
            <label>
              <input
                type="radio"
                name="interest_topic"
                value="Other"
                checked={interest === "Other"}
                onChange={(e) => setInterest(e.target.value)}
              />{" "}
              Other
            </label>
          </div>
          {interest === "Other" && (
            <input
              type="text"
              name="interest_topic_other"
              placeholder="Please specify..."
              required
              value={interestOther}
              onChange={(e) => setInterestOther(e.target.value)}
              className="conditional-input"
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="user_details">
            Tell us a bit about what you're looking for
          </label>
          <span className="label-hint">
            You can include the type of event, timeline, or any questions you
            have.
          </span>
          <textarea
            id="user_details"
            name="user_details"
            rows="4"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <div className="form-group">
          <label>When would you ideally need support?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="support_timeline"
                value="Within the next month"
                checked={timeline === "Within the next month"}
                onChange={(e) => setTimeline(e.target.value)}
              />{" "}
              Within the next month
            </label>
            <label>
              <input
                type="radio"
                name="support_timeline"
                value="1–3 months"
                checked={timeline === "1–3 months"}
                onChange={(e) => setTimeline(e.target.value)}
              />{" "}
              1–3 months
            </label>
            <label>
              <input
                type="radio"
                name="support_timeline"
                value="Later this year"
                checked={timeline === "Later this year"}
                onChange={(e) => setTimeline(e.target.value)}
              />{" "}
              Later this year
            </label>
            <label>
              <input
                type="radio"
                name="support_timeline"
                value="Not sure yet"
                checked={timeline === "Not sure yet"}
                onChange={(e) => setTimeline(e.target.value)}
              />{" "}
              Not sure yet
            </label>
            <label>
              <input
                type="radio"
                name="support_timeline"
                value="Other"
                checked={timeline === "Other"}
                onChange={(e) => setTimeline(e.target.value)}
              />{" "}
              Other
            </label>
          </div>
          {timeline === "Other" && (
            <input
              type="text"
              name="support_timeline_other"
              placeholder="Please specify..."
              required
              value={timelineOther}
              onChange={(e) => setTimelineOther(e.target.value)}
              className="conditional-input"
            />
          )}
        </div>

        <div className="form-group">
          <label>
            May we contact you with more information about YēriNotes?
          </label>
          <div className="radio-group inline">
            <label>
              <input
                type="radio"
                name="contact_consent"
                value="Yes"
                defaultChecked
              />{" "}
              Yes
            </label>
            <label>
              <input type="radio" name="contact_consent" value="No" /> No
            </label>
          </div>
        </div>

        {statusMessage.text && (
          <div className={`status-message ${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Sending..." : "Submit Note"}
        </button>
      </form>
    </div>
  );
};

export default YeriNotes;
