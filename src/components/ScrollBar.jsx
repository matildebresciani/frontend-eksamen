//Katinka
"use client";

import { useEffect, useState } from "react";

export default function ScrollBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[1000] bg-gray-200">
      <div
        className="h-full bg-primary-red transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
