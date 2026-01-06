import React from "react";

export default function Privacy() {
  return (
    <div style={{ maxWidth: 900 }}>
      <h2 className="h2">Privacy Policy</h2>
      <div className="card">
        <div className="card-body">
          <p className="p">
            Bright Service Solution (BSS) collects information you submit through our forms (such as name, contact details,
            service requested, and address/post code) for the purpose of responding to your request and providing our services.
          </p>
          <ul className="p">
            <li><strong>Lawful basis:</strong> Consent (you tick the consent box on the form).</li>
            <li><strong>Retention:</strong> We keep your data only as long as necessary for the service and record keeping.</li>
            <li><strong>Sharing:</strong> We do not sell your data. We may share limited information with partner institutions only when needed for your request.</li>
            <li><strong>Security:</strong> Data is stored securely in our database with restricted access.</li>
            <li><strong>Your rights:</strong> You can request access, correction, or deletion of your data by emailing us.</li>
          </ul>
          <p className="p">Contact: <a href="mailto:matthewlinus9@gmail.com">matthewlinus9@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
