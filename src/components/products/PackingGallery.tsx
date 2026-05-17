"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export function PackingGallery({ images, wrapperHeight = "280px" }: { images: string[], wrapperHeight?: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeLightbox = () => setSelectedIndex(null);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null));
  }, [images.length]);

  const showNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showPrev, showNext]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const item = container.children[index] as HTMLElement;
    if (item) {
      container.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
      setActiveMobileIndex(index);
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveMobileIndex(index);
  };

  const lightboxContent = selectedIndex !== null ? (
    <div className="lightbox-overlay" onClick={closeLightbox}>
      <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <Image 
          src={images[selectedIndex]} 
          alt={`Gallery ${selectedIndex + 1}`} 
          fill
          style={{ objectFit: "contain" }}
          sizes="100vw"
        />
      </div>

      {images.length > 1 && (
        <>
          <button className="lightbox-nav prev" onClick={showPrev} aria-label="Previous">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button className="lightbox-nav next" onClick={showNext} aria-label="Next">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </>
      )}
      
      <div className="lightbox-counter">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="packing-gallery-container">
        <div className="packing-gallery" ref={scrollRef} onScroll={handleScroll}>
          {images.map((src, idx) => (
            <div 
              key={src} 
              className="gallery-item-wrapper" 
              style={{ height: wrapperHeight }}
              onClick={() => {
                if (window.innerWidth > 900) setSelectedIndex(idx);
              }}
            >
              <Image src={src} alt={`Gallery ${idx + 1}`} fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 33vw" />
              <div className="gallery-hover-overlay desktop-only">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <div className="mobile-slider-controls">
            <button className="slider-arrow prev" aria-label="Previous" onClick={() => scrollTo(Math.max(0, activeMobileIndex - 1))}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="slider-arrow next" aria-label="Next" onClick={() => scrollTo(Math.min(images.length - 1, activeMobileIndex + 1))}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <div className="slider-dots">
              {images.map((_, idx) => (
                <div key={idx} className={`slider-dot ${idx === activeMobileIndex ? "active" : ""}`} onClick={() => scrollTo(idx)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {mounted && createPortal(lightboxContent, document.body)}
    </>
  );
}
