import React from "react";
import { useI18n } from "../lib/i18n.jsx";
import ImageCarousel from "./ImageCarousel.jsx";

export default function Hero() {
  const { t, lang, setLanguage } = useI18n();

  return (
    <section id="Home" className="section hero">
      <section className="container">
        <section className="flex-wrap">
          <section className="hero-text">
            <h1 className="brand-name">
              B <span>S</span> S
            </h1>
            <p className="hero-title">{t("hero.title")}</p>
            <p className="hero-subtitle">{t("hero.subtitle")}</p>

            <div className="hero-icons">
              <a href="https://wa.me/+447350160962">
                <img src="/images/whatsapp.svg" width={26} height={26} alt="" />
              </a>
              <a href="#">
                <img src="/images/gmail.svg" width={26} height={26} alt="" />
              </a>
              <a href="#">
                <img src="/images/facebook.svg" width={26} height={26} alt="" />
              </a>
            </div>
          </section>
          <section className="hero-img">
            <img className="img-card" src="images/hero_img.webp" alt="" />
          </section>
        </section>

        {/* Carousel */}
        <section className="carousel">
          <h2 className="section-title">{t("partners")}</h2>
          <p className="text">{t("partners.text")}</p>
          <ImageCarousel />
        </section>
      </section>
    </section>
  );
}
