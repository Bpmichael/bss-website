import React from "react";
import { useI18n } from "../lib/i18n.jsx";

export default function Referral() {
  const { t, lang, setLanguage } = useI18n();

  return (
    <section id="Referral" className="section">
      <h2 className="section-title">Referral</h2>
      <h3 className="section-subtitle">Refer and earn</h3>
      <section className="container">
        <section className="flex reverse card">
          <section className="section-text">
            <p>
              Partner with BSS and earn rewards while helping others succeed!
              Whether you are an individual recommending a prospective student
              or an organization interested in an official partnership, our
              Referral Program offers an easy way to generate income. Simply
              introduce students or organizations to our university admission
              and support services, and earn a commission for every successful
              registration or partnership.
            </p>
            <p>
              Getting started is simple just chat us up directly on the platform
              to submit your referral details or discuss partnership
              opportunities. Our team will guide you through the quick
              onboarding process, track your referrals, and ensure prompt
              payouts. Turn your network into value today by connecting
              ambitious students with top-tier UK education.
            </p>
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
          <section className="section-img">
            <img
              className="img-card"
              src="/images/referral.webp"
              alt={t("school.buildingAlt")}
            />
          </section>
        </section>
      </section>
    </section>
  );
}
