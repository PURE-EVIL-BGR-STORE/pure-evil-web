import { useState, useEffect } from "react";

export function useLoginMotion() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure styles are loaded before applying transition classes
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return {
    mounted,
    mountedClass: mounted ? "is-mounted" : "",
  };
}
