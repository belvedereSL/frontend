import { useState, useEffect } from "react";
import client from "../lib/contentful";

function mapProject(entry) {
  const f = entry.fields;
  return {
    id: entry.sys.id,
    title: f.title || "",
    slug: f.slug || entry.sys.id,
    category: f.category || "Strategy Advisory",
    year: f.year ? String(f.year) : "",
    outcome: f.outcome || "",
    desc: f.description || "",
    // Only return the image URL if it exists in Contentful, otherwise null
    img: f.coverImage?.fields?.file?.url
      ? "https:" + f.coverImage.fields.file.url + "?w=600&q=80&fm=jpg"
      : null,
  };
}

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
