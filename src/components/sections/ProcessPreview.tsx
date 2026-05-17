"use client";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

const stepKeys = ["sourcing", "sorting", "packaging", "shipping"] as const;
const stepIcons = ["process-icon-1.png", "process-icon-2.png", "process-icon-3.png", "process-icon-4.png"];

export function ProcessPreview({ horizontal = false }: { horizontal?: boolean }) {
  const { lang } = useLang();
  return (
    <section className={`process-wrap ${horizontal ? "process-horizontal" : ""}`}>
      <div className="shell">
        <div className="section-title-center-lines">
          <span>{t(T.process.label, lang)}</span>
          <strong>{t(T.process.heading, lang)}</strong>
        </div>

        <div className="process-layout-new">
          <div className="shipment-card">
            <h3>
              {t(T.process.farmToShip, lang)}
              <br />
              <strong>{t(T.process.toShipment, lang)}</strong>
            </h3>
            <p>{t(T.process.desc, lang)}</p>
            <div className="shipment-actions">
              <Button href="/products">{t(T.process.exploreBtn, lang)}</Button>
              <Button href="#contact" variant="light">{t(T.process.quoteBtn, lang)}</Button>
            </div>
          </div>

          <div className="process-timeline">
            {stepKeys.map((key, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-icon">
                  <img src={`/images/process/${stepIcons[index]}`} alt={t(T.process.steps[key].title, lang)} />
                </div>
                <div className="timeline-content">
                  <h4>{t(T.process.steps[key].title, lang)}</h4>
                  <p>{t(T.process.steps[key].text, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
