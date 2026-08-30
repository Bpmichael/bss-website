import React from "react";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { useI18n } from "../lib/i18n.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  const { t, lang, setLanguage } = useI18n();

  function toggleMenu() {
    const backDrop = document.getElementById("backdrop");
    const navLinks = document.getElementById("navlinks");

    backDrop.classList.toggle("active");
    navLinks.classList.toggle("active");
  }

  function hideBackDrop() {
    const backDrop = document.getElementById("backdrop");
    const navLinks = document.getElementById("navlinks");

    backDrop.classList.remove("active");
    navLinks?.classList.remove("active");
  }

  return (
    <>
      <div className="nav">
        <div className="nav-inner container">
          <div className="brand">
            <img src="/images/logo.webp" alt="BSS Logo" />
            <div>
              <div>Bright Service Solution</div>
              <small className="help">{t("tagline")}</small>
            </div>
          </div>

          <div id="navlinks" className="nav-right">
            <div className="nav-links">
              <NavHashLink
                onClick={hideBackDrop}
                smooth
                to="/#Home"
                className={{}}
              >
                {t("nav.home")}
              </NavHashLink>
              <NavHashLink
                onClick={hideBackDrop}
                smooth
                to="/#Admission"
                className={{}}
              >
                {t("school.admission")}
              </NavHashLink>
              <NavHashLink
                onClick={hideBackDrop}
                smooth
                to="/#JobCenter"
                className={{}}
              >
                {t("job.center")}
              </NavHashLink>
              <NavHashLink
                onClick={hideBackDrop}
                smooth
                to="/#Internship"
                className={{}}
              >
                {t("internship")}
              </NavHashLink>
              <NavHashLink
                onClick={hideBackDrop}
                smooth
                to="#About"
                className={{}}
              >
                {t("about")}
              </NavHashLink>
            </div>
            <div className="lang">
              <span style={{ fontWeight: 800 }}>🌐</span>
              <select
                value={lang}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>
            </div>
          </div>

          <div onClick={toggleMenu} className="hamburger-menu">
            <img
              src="images/hamburger-menu.svg"
              alt=""
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>

      <div onClick={toggleMenu} id="backdrop" className="backdrop"></div>

      <main>{children}</main>

      <a
        className="whatsapp"
        href="https://wa.me/447350160962"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>

      <Footer />
    </>
  );
}
