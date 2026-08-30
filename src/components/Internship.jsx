import React from "react";
import { useI18n } from "../lib/i18n.jsx";

export default function Internship() {
  const { t, lang, setLanguage } = useI18n();

  return (
    <section id="Internship" className="section">
      <h2 className="section-title">{t("internship")}</h2>
      <h3 className="section-subtitle">{t("internship")}</h3>
    </section>
  );
}
