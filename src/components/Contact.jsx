import React from "react";

export default function Contact() {
  return (
    <section className="container card">
      <h2 className="section-subtitle">Find Us</h2>
      <div className="hero-icons contact-icons">
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
      <div className="p">
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
    </section>
  );
}
