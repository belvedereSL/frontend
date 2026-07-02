import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHashElement() {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");

      // Function to handle the actual scrolling routine
      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return true; // Successfully scrolled!
        }
        return false; // Element not found in DOM yet
      };

      // 1. Try immediately
      if (!scrollToElement()) {
        // 2. Fallback: If component hasn't finished rendering, watch the DOM and retry
        const observer = new MutationObserver((mutations, obs) => {
          if (scrollToElement()) {
            obs.disconnect(); // Stop watching once found and scrolled
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        // Cleanup observer on unmount to prevent memory leaks
        return () => observer.disconnect();
      }
    } else {
      // Normal behavior: Reset to top on standard page navigation
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, search]);

  return null;
}
