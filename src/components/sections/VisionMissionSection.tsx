"use client";
import { company } from "@/data/company";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

export function VisionMissionSection() {
  const { lang } = useLang();
  return (
    <section className="shell vision-grid">
      <article>
        <img src="/images/about/vision-eye.svg" className="watermark" alt="" />
        <div className="vm-header">
          <h3>
            {lang === "ar" ? (
              <strong>{t(T.vm.ourVision, lang)}</strong>
            ) : (
              <>
                {t(T.vm.ourVision, lang)}
                <br />
                <strong>{t(T.vm.vision, lang)}</strong>
              </>
            )}
          </h3>
        </div>
        <div className="vm-body">
          <span className="quote-start">"</span>
          <p>{t(T.vm.visionText, lang)}</p>
          <span className="quote-end">"</span>
        </div>
      </article>

      <article>
        <img src="/images/about/mission-target.svg" className="watermark" alt="" />
        <div className="vm-header">
          <h3>
            {lang === "ar" ? (
              <strong>{t(T.vm.ourMission, lang)}</strong>
            ) : (
              <>
                {t(T.vm.ourMission, lang)}
                <br />
                <strong>{t(T.vm.mission, lang)}</strong>
              </>
            )}
          </h3>
        </div>
        <div className="vm-body">
          <span className="quote-start">"</span>
          <p>{t(T.vm.missionText, lang)}</p>
          <span className="quote-end">"</span>
        </div>
      </article>
    </section>
  );
}
