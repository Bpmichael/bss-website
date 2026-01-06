import React from "react";
import { useI18n } from "../lib/i18n.jsx";
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="grid" style={{ gap: 18 }}>
      <div className="hero card" style={{ padding: 18 }}>
        <div>
          <div className="kicker">
            <span className="badge">BSS</span>
            <span className="p" style={{ margin: 0 }}>{t("tagline")}</span>
          </div>
          <h1 className="h1">{t("hero.title")}</h1>
          <p className="p">{t("hero.subtitle")}</p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
            <Link className="btn" to="/apply">{t("cta.apply")}</Link>
            <a className="btn secondary" href="https://wa.me/447350160962" target="_blank" rel="noreferrer">
              {t("cta.whatsapp")}
            </a>
          </div>

          <div style={{ marginTop: 18 }}>
            <small className="help">
              Partner universities: Ulster University (Birmingham, London & Manchester), Coventry University,
              University of Birmingham, Birmingham College, University of Wolverhampton.
            </small>
          </div>
        </div>

        <img className="hero-img" src="/images/bss-hero.svg" alt="BSS hero" />
      </div>

      <div className="grid grid-3">
        <Card title={t("home.vision.title")} image="/images/vision.svg">
          {t("home.vision.body")}
        </Card>
        <Card title={t("home.goal.title")} image="/images/goal.svg" badge="Trusted • Free • Supportive">
          {t("home.goal.body")}
        </Card>
        <Card title="What we do" image="/images/whatwedo.svg">
          We provide free guidance for UK admission and visa, plus opportunities through security and cleaning services.
          Our focus is simple: give clear steps and support that helps you move forward.
        </Card>
      </div>
    </div>
  );
}
