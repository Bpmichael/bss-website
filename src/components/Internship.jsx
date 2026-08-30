import React from "react";
import { useI18n } from "../lib/i18n.jsx";

export default function Internship() {
  const { t, lang, setLanguage } = useI18n();

  return (
    <section id="Internship" className="section">
      <h2 className="section-title">{t("internship")}</h2>
      <h3 className="section-subtitle">Get an internship with ease</h3>
      <section className="container">
        <section className="flex card">
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
              src="/images/internship.webp"
              alt={t("school.buildingAlt")}
            />
          </section>
        </section>
      </section>
    </section>
  );
}
