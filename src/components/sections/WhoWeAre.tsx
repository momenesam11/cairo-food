import Image from "next/image";

export function WhoWeAre() {
  return (
    <section className="shell who-we-are-section">
      <div className="who-we-are-top">
        <div className="who-title">
          <span>Who</span>
          <h2>We Are?</h2>
        </div>
        <div className="who-text">
          <p>
            Established in 2014, Cairo Food International is a trusted name in Egypt's food and agricultural sectors. We specialize in producing, packaging, and exporting premium Egyptian fruits, vegetables, and food products to international markets.
          </p>
          <p>
            With deep experience in sourcing, quality control, and export operations, we help global buyers access reliable Egyptian produce that meets international standards.
          </p>
        </div>
        <div className="who-image">
          <Image src="/images/about/about-farm.jpg" alt="Farm Landscape" width={800} height={450} priority />
        </div>
      </div>
      
      <div className="who-features">
        <div className="who-feature">
          <div className="who-icon-circle">
            <img src="/images/about/about-icon-export.svg" alt="Export" />
          </div>
          <span className="text">Export experience since 2014</span>
        </div>
        <div className="who-feature">
          <div className="who-icon-circle">
            <img src="/images/about/about-icon-products.svg" alt="Products" />
          </div>
          <span className="text">Fresh & frozen agricultural products</span>
        </div>
        <div className="who-feature">
          <div className="who-icon-circle">
            <img src="/images/about/about-icon-standards.svg" alt="Standards" />
          </div>
          <span className="text">Trusted international supply standards</span>
        </div>
      </div>
    </section>
  );
}
