import React from "react";
import { useI18n } from "../lib/i18n.jsx";

export default function JobCenter() {
  const { t, lang, setLanguage } = useI18n();

  return (
    <section id="JobCenter" className="section">
      <h2 className="section-title">{t("job.center")}</h2>
      <h3 className="section-subtitle">Get a job and move</h3>
      <section className="container">
        <section className="flex reverse card">
          <section className="section-text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              dolore odit ea id, aut fugit quibusdam accusantium, quo pariatur,
              vitae delectus. Commodi, repellat ab architecto eum vero veritatis
              quasi fugit.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              dolore odit ea id, aut fugit quibusdam accusantium, quo pariatur,
              vitae delectus. Commodi, repellat ab architecto eum vero veritatis
              quasi fugit.
            </p>
            <a href="#" className="btn btn-cta">
              {t("cta.apply")}
            </a>
          </section>
          <section className="section-img">
            <img
              className="img-card"
              src="/images/work.webp"
              alt={t("school.buildingAlt")}
            />
          </section>
        </section>
      </section>
    </section>
  );
}
