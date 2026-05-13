"use client";

const countries = [
  { name: "Angola", code: "ao" },
  { name: "Bénin", code: "bj" },
  { name: "Burkina Faso", code: "bf" },
  { name: "Cape Verde", code: "cv" },
  { name: "Congo", code: "cg" },
  { name: "Romania", code: "ro" },
  { name: "Côte d'Ivoire", code: "ci" },
  { name: "Dominican Republic", code: "do" },
  { name: "Gabon", code: "ga" },
  { name: "Gambia", code: "gm" },
  { name: "Ghana", code: "gh" },
  { name: "Guinea", code: "gn" },
  { name: "Guyana", code: "gy" },
  { name: "Hong Kong", code: "hk" },
  { name: "Liberia", code: "lr" },
  { name: "Malaysia", code: "my" },
  { name: "Maldives", code: "mv" },
  { name: "Mali", code: "ml" },
  { name: "Martinique", code: "mq" },
  { name: "Mauritania", code: "mr" },
  { name: "Mauritius", code: "mu" },
  { name: "Morocco", code: "ma" },
  { name: "Poland", code: "pl" },
  { name: "Portugal", code: "pt" },
  { name: "Senegal", code: "sn" },
  { name: "Seychelles", code: "sc" },
  { name: "Sierra Leone", code: "sl" },
  { name: "Slovenia", code: "si" },
  { name: "Somalia", code: "so" },
  { name: "Spain", code: "es" },
  { name: "Netherlands", code: "nl" },
  { name: "Togo", code: "tg" },
  { name: "Ukraine", code: "ua" },
];

export function MarketsSection() {
  return (
    <section className="markets-card shell">
      <div className="markets-content">
        <h2>Serving<br /><strong>Global Markets</strong></h2>
        <p>We export premium Egyptian agricultural and food products to international markets across Europe, Asia, and Africa.</p>

        {/* Flag ticker strip using FlagCDN library */}
        <div className="flags-ticker-wrap">
          <div className="flags-ticker-track">
            {[...countries, ...countries].map((c, i) => (
              <div key={i} title={c.name} className="ticker-flag">
                <img 
                  src={`https://flagcdn.com/${c.code}.svg`} 
                  alt={c.name} 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="markets-globe">
        <img src="/images/globe.png" alt="Global reach globe" />
      </div>
    </section>
  );
}
