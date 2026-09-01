import React from "react";
import { useI18n } from "../lib/i18n.jsx";

export default function SchoolAdmission() {
  const { t, lang, setLanguage } = useI18n();

  return (
    <section id="Admission" className="section">
      <h2 className="section-title">{t("school.admission")}</h2>
      <h3 className="section-subtitle">Let's help you get an admission</h3>
      <section className="container">
        <section className="flex card">
          <section className="section-text">
            <p>
              Navigating university admissions in a foreign country can be
              complex, but you don't have to do it alone. At BSS, we offer 100%
              free expert guidance to help international students secure
              admission into top UK universities, including Ulster University,
              Coventry University, University of Birmingham, Birmingham College,
              and University of Wolverhampton.
            </p>
            <p>
              From selecting the right course and preparing your document
              checklist to submitting your application, our experienced team
              ensures your journey to studying abroad is seamless, efficient,
              and successful.
            </p>
            <a href="#" className="btn btn-cta">
              {t("cta.apply")}
            </a>
          </section>
          <section className="section-img">
            <img
              className="img-card"
              src="/images/school_building.webp"
              alt={t("school.buildingAlt")}
            />
          </section>
        </section>
      </section>
    </section>
  );
}
