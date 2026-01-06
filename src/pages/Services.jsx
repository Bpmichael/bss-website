import React from "react";
import Card from "../components/Card";
import { useI18n } from "../lib/i18n.jsx";

export default function Services() {
  const { t } = useI18n();

  return (
    <div className="grid" style={{ gap: 18 }}>
      <h2 className="h2">{t("nav.services")}</h2>
      <div className="grid grid-3">
        <Card
          title={t("services.admission.title")}
          image="/images/service-admission.svg"
          badge="FREE"
        >
          {t("services.admission.body")}
          <br /><br />
          <strong>What we help you with:</strong>
          <ul>
            <li>School selection and admission guidance</li>
            <li>Document checklist and application support</li>
            <li>Visa application guidance and interview preparation</li>
          </ul>
        </Card>

        <Card
          title={t("services.security.title")}
          image="/images/service-security.svg"
        >
          {t("services.security.body")}
          <br /><br />
          <strong>Support includes:</strong>
          <ul>
            <li>Understanding SIA requirements</li>
            <li>CV and job application guidance</li>
            <li>Connecting you to opportunities</li>
          </ul>
        </Card>

        <Card
          title={t("services.cleaning.title")}
          image="/images/service-cleaning.svg"
        >
          {t("services.cleaning.body")}
          <br /><br />
          <strong>Support includes:</strong>
          <ul>
            <li>Cleaning services for homes and offices</li>
            <li>Connecting job seekers to cleaning roles</li>
            <li>Basic onboarding guidance</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
