import React from "react";
import { useI18n } from "../lib/i18n.jsx";

export default function SchoolAdmission() {
  const { t, lang, setLanguage } = useI18n();

  return (
    <section id="Admission" className="section">
      <h2 className="section-title">{t("school.admission")}</h2>
      <h3 className="section-subtitle">{t("school.admission")}</h3>
    </section>
  );
}
