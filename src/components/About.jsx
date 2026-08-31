import React from "react";
import { useI18n } from "../lib/i18n.jsx";
import Contact from "./Contact.jsx";

export default function About() {
  const { t, lang, setLanguage } = useI18n();

  return (
    <section id="About" className="section">
      <h2 className="section-title">{t("about")}</h2>
      <h3 className="section-subtitle">Know what BSS is all about</h3>
      <section className="container">
        <section className="flex reverse card">
          <section className="section-text">
            <p>{t("services.admission.body")}</p>
            <strong className="section-subtitle">What we help you with:</strong>
            <ul>
              <li>School selection and admission guidance</li>
              <li>Document checklist and application support</li>
              <li>Visa application guidance and interview preparation</li>
            </ul>
          </section>
          <section className="section-img">
            <img
              className=""
              src="/images/bss_logo.webp"
              alt={t("school.buildingAlt")}
            />
          </section>
        </section>
        <section className="grid">
          <div className="grid-item">
            <div className="img">
              <img src="/images/vision.webp" alt="" />
            </div>
            <div className="text">
              <h3 className="heading">Our Vision</h3>
              <p>
                To guide people planning to study, work, and build a better life
                in the UK with clear support, honest advice, and real
                opportunities.
              </p>
            </div>
          </div>
          <div className="grid-item">
            <div className="img">
              <img src="/images/goal.webp" alt="" />
            </div>
            <div className="text">
              <h3 className="heading">Our Goal</h3>
              <p>
                Remove barriers. Help you take the right steps. Make the process
                simple — from admission and visa guidance to job opportunities.
              </p>
            </div>
          </div>
        </section>
      </section>

      <Contact />
    </section>
  );
}
