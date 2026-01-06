import React from "react";
import { NavLink } from "react-router-dom";
import { useI18n } from "../lib/i18n.jsx";

export default function Layout({ children }) {
  const { t, lang, setLanguage } = useI18n();

  return (
    <>
      <div className="nav">
        <div className="nav-inner">
          <div className="brand">
            <img src="/images/logo-bss.svg" alt="BSS Logo" />
            <div>
              <div>Bright Service Solution</div>
              <small className="help">{t("tagline")}</small>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div className="nav-links">
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>{t("nav.home")}</NavLink>
              <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>{t("nav.services")}</NavLink>
              <NavLink to="/apply" className={({ isActive }) => (isActive ? "active" : "")}>{t("nav.apply")}</NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>{t("nav.contact")}</NavLink>
              <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>{t("nav.admin")}</NavLink>
            </div>

            <div className="lang">
              <span style={{ fontWeight: 800 }}>🌐</span>
              <select value={lang} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <main className="container">{children}</main>

      <a
        className="whatsapp"
        href="https://wa.me/447350160962"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>

      <div className="container footer">
        © {new Date().getFullYear()} Bright Service Solution (BSS). All rights reserved.
      </div>
    </>
  );
}
