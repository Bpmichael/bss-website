import React from "react";
import { useI18n } from "../lib/i18n.jsx";

export default function About() {
  const { t, lang, setLanguage } = useI18n();

  return (
    <section id="About" className="section">
      <h2 className="section-title">{t("about")}</h2>
      <h3 className="section-subtitle">{t("about")}</h3>
    </section>
  );
}
