import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";

type Props = {
  title: string;
  highlighted?: string;
  subtitle: string;
  background: string;
  active?: string;
  align?: "center" | "left";
  actions?: boolean;
  personImage?: string;
};

export function PageHero({ title, highlighted, subtitle, background, active = "/", align = "center", actions = false, personImage }: Props) {
  // Enhanced title highlighting: replace specific words with green strong tags
  let titleHtml = title;
  if (highlighted) {
    // If highlighted is passed, we highlight it
    titleHtml = titleHtml.replace(highlighted, `<strong>${highlighted}</strong>`);
  }
  
  // Specific highlight for "Global Markets" if it exists in the title and not already highlighted
  if (title.includes("Global Markets") && !titleHtml.includes("<strong>Global Markets</strong>")) {
    titleHtml = titleHtml.replace("Global Markets", `<strong>Global Markets</strong>`);
  }

  return (
    <section className={`page-hero hero-${align} ${personImage ? 'has-person' : ''}`} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${background})` }}>
      <Header active={active} />
      <div className="shell page-hero-content-wrapper">
        <div className="page-hero-content">
          <h1 dangerouslySetInnerHTML={{ __html: titleHtml }} />
          <p>{subtitle}</p>
          {actions && (
            <div className="hero-actions">
              <Button href="/products">Explore Products</Button>
              <Button href="#contact" variant="light">Request a Quote</Button>
            </div>
          )}
        </div>
        
        {personImage && (
          <div className="hero-person-image">
            <img src={personImage} alt="Cairo Food Team" />
          </div>
        )}
      </div>
    </section>
  );
}
