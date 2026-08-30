import React from "react";

export default function Footer() {
  return (
    <section className="footer">
      <div className="container">
        © {new Date().getFullYear()} Bright Service Solution (BSS). All rights
        reserved.
      </div>
    </section>
  );
}
