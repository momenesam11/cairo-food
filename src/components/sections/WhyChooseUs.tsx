const features = [
  {
    title: "Quality Control",
    text: "Strict Quality Checks Across Every Stage Of Production And Export.",
    icon: "why-icon-quality.png",
    color: "#00122e"
  },
  {
    title: "Global Reach",
    text: "Serving International Markets Across Europe, Asia, And Africa.",
    icon: "why-icon-global.png",
    color: "#015c44"
  },
  {
    title: "Reliable Commitment",
    text: "Committed To Timely Delivery And Long-Term Business Partnerships.",
    icon: "why-icon-commitment.png",
    color: "#689d00"
  }
];

export function WhyChooseUs() {
  return (
    <section className="shell why-section-new">
      <div className="why-title-area">
        <div className="side-title">
          <span>Why</span>
          <h3>Choose Us</h3>
        </div>
      </div>
      
      <div className="why-features-grid">
        {features.map((item, index) => (
          <article className="why-card" key={index}>
            <div className="why-icon-box" style={{ backgroundColor: item.color }}>
              <img src={`/images/why/${item.icon}`} alt={item.title} />
            </div>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
