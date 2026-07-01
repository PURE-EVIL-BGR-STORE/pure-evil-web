import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    // Set initial value asynchronously to prevent synchronous render warnings
    const timeoutId = setTimeout(() => {
      setMatches(media.matches);
    }, 0);

    // Listen for changes
    if (media.addEventListener) {
      media.addEventListener("change", listener);
      return () => {
        clearTimeout(timeoutId);
        media.removeEventListener("change", listener);
      };
    } else {
      // Fallback for older browsers
      media.addListener(listener);
      return () => {
        clearTimeout(timeoutId);
        media.removeListener(listener);
      };
    }
  }, [query]);

  return matches;
}
