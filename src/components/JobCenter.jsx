import React from "react";
import { useI18n } from "../lib/i18n.jsx";

export default function JobCenter() {
  const { t, lang, setLanguage } = useI18n();

  return (
    <section id="JobCenter" className="section">
      <h2 className="section-title">{t("job.center")}</h2>
      <h3 className="section-subtitle">{t("job.center")}</h3>
    </section>
  );
}
