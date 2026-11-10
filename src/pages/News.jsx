import OptimizedImage from "../components/OptimizedImage";
import LazyVideo from "../components/LazyVideo";
import React from "react";
import "./News.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { FadeUp, SlideIn } from "../components/Animate";
import { SkeletonGrid } from "../components/CardSkeleton";
import ContentError from "../components/ContentError";
import { useNews } from "../hooks/useNews";
import "./News.css";
import { useState } from "react";
import heroVideo from "../assets/Background-Videos/News.mp4";
import { div } from "framer-motion/client";

const categories = ["All", "Updates","Stories", "Reports", "Events", "Publications"];

const News = () => {
  const { posts, loading, error } = useNews
();
  const [filter, setFilter] = useState("All");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  // 👉 ADDED 1: Helper to get PDF url from Contentful or local
  const getPdfUrl = (post) => {
    // 1. Try Contentful URL first
    if (post.pdfUrl) return post.pdfUrl;
    if (post.pdfLink) return post.pdfLink;
    if (post.file?.fields?.file?.url) return `https:${post.file.fields.file.url}`;
    if (post.pdfFile?.fields?.file?.url) return `https:${post.pdfFile.fields.file.url}`;
    if (post.file?.url) return post.file.url;

    // 2. If no Contentful file, try local /docs/ ONLY if fileName exists
    if (post.fileName && post.fileName !== "") return `/docs/${post.fileName}`;

    // 3. Don't return /docs/ empty - return null
    return null;
  };



  const featured = posts.find((p) => p.featured);
  const rest = posts.filter(
    (p) =>
      !p.featured &&
      (filter === "All" || p.cat === filter || p.category === filter),
  );

  // {-----------Newsletter------------}
  const handleSubscribe = async () => {
    if (!email) return;

    try {
      const response = await fetch("http://localhost:3000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscribed(true);
      } else {
        alert("Subscription failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Could not connect to server.");
    }
  };

  return (
    <>
      {/* {---------MODAL OVERLAY --------} */}

      {/* {---------MODAL OVERLAY --------} */}
      {selectedPost && (
        <motion.div
          // ... (keep your existing animation props)
          className="modal-overlay"
          onClick={() => setSelectedPost(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedPost(null)}
            >
              ✕
            </button>

            <OptimizedImage
              src={selectedPost.img}
              alt={selectedPost.title}
              className="modal-img"
            />

            {/* 👉 ADDED 2: Modal now handles Publications with PDF reader */}
            {selectedPost.category === "Publications" ? (
              <>
                <motion.div className="modal-body" style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
                  <motion.div className="news-cardMeta">
                    <span className="news-postCat">{selectedPost.category}</span>
                    <span className="news-postDate">{selectedPost.date}</span>
                  </motion.div>
                  <h2 className="modal-h2">{selectedPost.title}</h2>
                  <p className="modal-p">{selectedPost.body || selectedPost.excerpt}</p>
                </motion.div>
                <div style={{ padding: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a href={getPdfUrl(selectedPost)} download target="_blank" rel="noreferrer" style={{ background: "#0d4a2e", color: "white", padding: "10px 16px", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>
                      📄 Download PDF
                    </a>
                    <a
  href={getPdfUrl(selectedPost) || "#"}
  target="_blank"
  rel="noreferrer"
  onClick={(e) => {
    if (!getPdfUrl(selectedPost)) {
      e.preventDefault();
      alert("No PDF attached to this post. Go to Contentful and upload PDF in pdfFile field.");
    }
  }}
  style={{ border: "1px solid #0d4a2e", color: "#0d4a2e", padding: "10px 16px", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>
  Open in New Tab
</a>
                  </div>
                  <iframe src={getPdfUrl(selectedPost)} style={{ width: "100%", height: "65vh", border: "1px solid #ddd", borderRadius: "8px" }} title="PDF Reader" />
                </div>
              </>
            ) : (
              <motion.div className="modal-body">
                <motion.div className="news-cardMeta">
                  <span className="news-postCat">{selectedPost.category}</span>
                  <span className="news-postDate">{selectedPost.date}</span>
                </motion.div>
                <h2 className="modal-h2">{selectedPost.title}</h2>
                <p className="modal-p">{selectedPost.body}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* {Hero Section} */}
      <motion.div
        className="bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <LazyVideo
          className="video-bg"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1595872234935-758c5bfc1f6e?w=1600&q=60&auto=format"
         src={heroVideo} />
        <div className="overlay" />
        {/* {Content} */}
        <motion.div className="content">
          <motion.div
            className="content-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="eyebrowLine" />
            Stay Connected to Belvedere SL
          </motion.div>
          <div className="headline">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              News
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            ></motion.h1>

            <motion.p
              className="sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              Stay informed with the latest company news, industry insights,
              research findings, project milestones, and stories highlighting
              our commitment to improving quality of lives.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* page content */}
      <motion.section
        className="news-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="news-container">
          {error && (
            <ContentError message="Could not load news posts from Contentful." />
          )}

          {!error && (
            <>
              {/* Featured post */}
              {!loading && filter === "All" && featured && (
                <FadeUp>
                  <div className="news-featured">
                    <div className="news-featuredImg">
                      <OptimizedImage src={featured.img} alt={featured.title} />
                      <span className="news-featuredBadge">Featured</span>
                    </div>
                    <div className="news-featuredContent">
                      <div className="news-cardMeta">
                        <span className="news-postCat">
                          {featured.category}
                        </span>
                        <span className="news-postDate">{featured.date}</span>
                      </div>
                      <h2 className="news-featuredTitle">{featured.title}</h2>
                      <p className="news-featuredExcerpt">{featured.excerpt}</p>

                      <a
                        href="#"
                        className="news-readMore"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedPost(featured);
                        }}
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                </FadeUp>
              )}

              {/* Filter bar */}
              <FadeUp delay={0.05}>
                <div className="news-filters">
                  {categories.map((c) => (
                    <button
                      key={c}
                      className={`news-filter ${filter === c ? "news-filterActive" : ""}`}
                      onClick={() => setFilter(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </FadeUp>

              {/* Cards or skeleton */}
              {loading ? (
                <SkeletonGrid count={6} />
              ) : rest.length === 0 ? (
                <div className="news-empty">
                  <p>No posts in this category yet.</p>
                </div>
              ) : (
                <div className="news-grid">
                  {rest.map((post, i) => (
                    <FadeUp key={post.id} delay={i * 0.07}>
                      <article className="news-card">
                        <div className="news-cardImg">
                          <OptimizedImage src={post.img} alt={post.title} />
                        </div>
                        <div className="news-cardBody">
                          <div className="news-cardMeta">
                            <span className="news-postCat">
                              {post.category}
                            </span>
                            <span className="news-postDate">{post.date}</span>
                          </div>
                          <h3 className="news-cardTitle">{post.title}</h3>
                          <p className="news-cardExcerpt">{post.excerpt}</p>

                          {/* 👉 ADDED 3: For Publications show Read + Download, else Read More */}
                          {post.category === "Publications" ? (
                            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                              <button
                                onClick={() => setSelectedPost(post)}
                                style={{ flex: 1, background: "#0d4a2e", color: "white", border: "none", padding: "10px", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}
                              >
                                👁️ Read Online
                              </button>
                              <a
                                href={getPdfUrl(post)}
                                download
                                target="_blank"
                                rel="noreferrer"
                                style={{ flex: 1, border: "1px solid #0d4a2e", color: "#0d4a2e", padding: "10px", borderRadius: "8px", fontSize: "13px", textAlign: "center", textDecoration: "none", fontWeight: "600" }}
                              >
                                📄 Download
                              </a>
                            </div>
                          ) : (
                            <a
                              href="#"
                              className="news-readMore"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedPost(post);
                              }}
                            >
                              Read More →
                            </a>
                          )}
                        </div>
                      </article>
                    </FadeUp>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Newsletter */}
          <FadeUp>
            <div className="news-newsletter">
              <div className="news-newsletterText">
                <h3 className="news-newsletterHeading">Stay informed</h3>
                <p>
                  Get program updates and stories from Sierra Leone delivered to
                  your inbox.
                </p>
              </div>
              {subscribed ? (
                <div className="news-subscribed">
                  <span>✓</span> You're subscribed. Thank you!
                </div>
              ) : (
                <div className="news-newsletterForm">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="news-newsletterInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="news-newsletterBtn"
                    onClick={handleSubscribe}
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </motion.section>
    </>
  );
};

export default News;
