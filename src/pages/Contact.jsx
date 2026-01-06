import React from "react";
import { useI18n } from "../lib/i18n.jsx";

export default function Contact() {
  const { t } = useI18n();

  return (
    <div className="grid" style={{ gap: 18, maxWidth: 760 }}>
      <h2 className="h2">{t("contact.title")}</h2>
      <div className="card">
        <div className="card-body">
          <p className="p" style={{ marginTop: 0 }}>
            <strong>{t("contact.phone")}:</strong> +44 7350 160962<br />
            <strong>{t("contact.email")}:</strong> matthewlinus9@gmail.com<br />
            <strong>{t("contact.address")}:</strong> {t("contact.location")}
          </p>
          <div className="p">
            <strong>Map:</strong>
            <div style={{ marginTop: 10 }}>
              <iframe
                title="Birmingham map"
                width="100%"
                height="320"
                style={{ border: 0, borderRadius: 14 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Birmingham%2C%20United%20Kingdom&output=embed"
              />
            </div>
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn" href="https://wa.me/447350160962" target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="btn secondary" href="mailto:matthewlinus9@gmail.com">Email</a>
            <a className="btn secondary" href="/privacy">Privacy Policy</a>
            <a className="btn secondary" href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
}
