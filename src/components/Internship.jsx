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
              Gaining practical experience in your field is one of the most
              effective ways to stand out to future employers. Our Internship
              Support section connects international students with meaningful
              internship opportunities across key industries in the UK, helping
              you apply your classroom learning to real-world business
              challenges.
            </p>
            <p>
              We walk you through every step of securing an internship from
              identifying relevant placements and navigating application
              deadlines to structuring your profile to match employer
              expectations. Gain valuable international workplace experience,
              build professional networks, and boost your post-graduation
              employment prospects with our dedicated support.
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
