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
              Navigating the UK job market as an international student can feel
              overwhelming, but our Job Center is here to bridge the gap between
              academic study and professional success. We provide practical
              guidance to help you find part-time roles, internships, and
              graduate positions that align with your field of study and visa
              allowances.
            </p>
            <p>
              From tailoring your CV for UK employers and polishing your
              LinkedIn profile to preparing for behavioral interviews, we equip
              you with the essential tools to stand out. Our goal is to empower
              you to build valuable work experience and launch a rewarding
              career during and after your studies.
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
