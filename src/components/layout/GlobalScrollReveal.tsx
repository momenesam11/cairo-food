"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function GlobalScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Only animate on client side and respect user preferences
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          // Optionally, stop observing after reveal so it doesn't animate out and in again
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    });

    const initReveal = () => {
      // Elements we want to automatically animate on scroll
      const selectors = [
        "section:not(.page-hero)",
        "article",
        ".product-overview-card",
        ".size-grid > article",
        ".gallery-item-wrapper",
        ".contact-wrapper > div",
        ".category-grid > article",
        ".packaging-main > div"
      ];
      
      const elements = document.querySelectorAll(selectors.join(", "));
      
      elements.forEach((el, index) => {
        // Skip elements that are already revealed or pending
        if (!el.classList.contains("reveal-pending") && !el.classList.contains("is-revealed")) {
          // Add a slight stagger delay based on DOM order for elements that appear together
          if (index % 3 === 1) el.setAttribute("style", "transition-delay: 0.1s;");
          if (index % 3 === 2) el.setAttribute("style", "transition-delay: 0.2s;");
          
          el.classList.add("reveal-pending");
          observer.observe(el);
        }
      });
    };

    // Small delay to ensure React has painted the DOM for the new route
    const timeoutId = setTimeout(initReveal, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
