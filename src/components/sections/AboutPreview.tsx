import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function AboutPreview({ full = false }: { full?: boolean }) {
  return (
    <section className="about-section shell">
      <div className="section-title-center-lines">
        <span>About</span>
        <strong>Us</strong>
      </div>
      
      <div className={`about-layout ${full ? "about-full" : ""}`}>
        <div className="about-collage-new">
          <div className="collage-main">
            <Image src="/images/about/about-farm.jpg" alt="Egyptian farms" width={600} height={400} />
          </div>
          <div className="collage-top-left">
            <Image src="/images/about/about-veg.jpg" alt="Fresh vegetables" width={200} height={240} />
          </div>
          <div className="collage-bottom-right">
            <Image src="/images/about/about-fruits.jpg" alt="Fresh fruits" width={200} height={240} />
          </div>
        </div>
        
        <div className="about-content-new">
          <h3>Egyptian Quality, Exported Worldwide</h3>
          <p>
            Established in 2014, Cairo Food International specializes in producing, 
            packaging, and exporting premium Egyptian agricultural and food products to global markets.
          </p>
          
          <ul className="feature-list">
            <li>
              <span className="feature-icon">
                <img src="/images/about/about-icon-box.svg" alt="Export" />
              </span>
              Export experience since 2014
            </li>
            <li>
              <span className="feature-icon">
                <img src="/images/about/about-icon-leaf.svg" alt="Fresh" />
              </span>
              Fresh & frozen agricultural products
            </li>
            <li>
              <span className="feature-icon">
                <img src="/images/about/about-icon-medal.svg" alt="Trusted" />
              </span>
              Trusted international supply standards
            </li>
          </ul>
          
          <Button href="/about" className="learn-more-btn">
            Learn More About Us
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white"/>
              <path d="M10.5 15.5L14 12L10.5 8.5" stroke="#72ad00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
