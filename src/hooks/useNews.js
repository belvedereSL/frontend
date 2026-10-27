import { useState, useEffect } from "react";
import client from "../lib/contentful";
import closingPdf from "../assets/docs/Closing_The_Technology_Gaps.pdf";
import womenPdf from "../assets/docs/Improving_Women_Access_to_Finance_in_the_Rice_Post_Production_Value_Chain_Final-Signed.pdf";


function mapPost(entry) {
  const f = entry.fields;
  let localPdfUrl = null;
  let localFileName = "";
  if (f.title?.toLowerCase().includes("technology")) {
    localPdfUrl = closingPdf;
    localFileName = "Closing_The_Technology_Gaps.pdf";
  } else if (f.title?.toLowerCase().includes("women") || f.title?.toLowerCase().includes("rice") || f.title?.toLowerCase().includes("finance")) {
    localPdfUrl = womenPdf;
    localFileName = "Improving_Women_Access_to_Finance_in_the_Rice_Post_Production_Value_Chain_Final-Signed.pdf";
  }
  return {
    id: entry.sys.id,
    title: f.title || "",
    slug: f.slug || entry.sys.id,
    category: f.category || "Updates",
    date: f.date
      ? new Date(f.date).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })
      : "",
    excerpt: f.excerpt || "",
    body: f.body || "",
    featured: f.featured || false,
    img: f.coverImage?.fields?.file?.url
      ? "https:" + f.coverImage.fields.file.url + "?w=700&q=80&fm=jpg"
      : "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=700&q=80&auto=format&fit=crop",

    // 👉 ADD THIS LINE 2
     pdfUrl: f.pdfFile?.fields?.file?.url
      ? "https:" + f.pdfFile.fields.file.url
      : f.file?.fields?.file?.url
      ? "https:" + f.file.fields.file.url
      : localPdfUrl || null,
    fileName: localFileName || f.title + ".pdf",
  };
}

export function useNews() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .getEntries({
        content_type: "newsPost",
        order: "-fields.date",
        limit: 50,
      })
      .then((res) => {
        setPosts(res.items.map(mapPost));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Contentful error:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { posts, loading, error };
}
