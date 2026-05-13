"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

type Props = {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
};

export const Reveal = ({ children, width = "100%", delay = 0, direction = "up" }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getTransform = () => {
    if (direction === "up") return "translateY(50px)";
    if (direction === "down") return "translateY(-50px)";
    if (direction === "left") return "translateX(50px)";
    if (direction === "right") return "translateX(-50px)";
    return "translateY(50px)";
  };

  return (
    <div
      ref={ref}
      style={{
        width,
        position: "relative",
        overflow: "visible",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getTransform(),
        transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};
