import React, { useState } from "react";
import { useI18n } from "../lib/i18n.jsx";
import { apiPost } from "../lib/api";

export default function Apply() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    service: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    consent: false,
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setOk(""); setErr("");
    if (!form.consent) {
      setErr("Please tick the consent checkbox to continue.");
      return;
    }
    setLoading(true);
    try {
      await apiPost("/.netlify/functions/submitForm", form);
      setOk("Submitted successfully. We will contact you shortly.");
      setForm({ firstName:"", middleName:"", lastName:"", service:"", email:"", phone:"", address:"", postcode:"", consent:false });
    } catch (e2) {
      setErr(e2.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid" style={{ gap: 18, maxWidth: 820 }}>
      <h2 className="h2">{t("apply.title")}</h2>
      <p className="p">{t("apply.note")}</p>

      <div className="card">
        <div className="card-body">
          <form className="form" onSubmit={submit}>
            <div className="row">
              <input className="input" value={form.firstName} onChange={(e)=>set("firstName", e.target.value)} placeholder={t("form.firstname")} required />
              <input className="input" value={form.middleName} onChange={(e)=>set("middleName", e.target.value)} placeholder={t("form.middlename")} />
            </div>
            <input className="input" value={form.lastName} onChange={(e)=>set("lastName", e.target.value)} placeholder={t("form.lastname")} required />

            <select value={form.service} onChange={(e)=>set("service", e.target.value)} required>
              <option value="">{t("form.service")}</option>
              <option value="School Admission & Visa Application">School Admission & Visa Application</option>
              <option value="Door Supervisor Security Job">Door Supervisor Security Job</option>
              <option value="Cleaning Job">Cleaning Job</option>
            </select>

            <div className="row">
              <input className="input" value={form.email} onChange={(e)=>set("email", e.target.value)} placeholder={t("form.email")} type="email" required />
              <input className="input" value={form.phone} onChange={(e)=>set("phone", e.target.value)} placeholder={t("form.phone")} required />
            </div>

            <input className="input" value={form.address} onChange={(e)=>set("address", e.target.value)} placeholder={t("form.address")} />
            <input className="input" value={form.postcode} onChange={(e)=>set("postcode", e.target.value)} placeholder={t("form.postcode")} />

            <label style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
              <input type="checkbox" checked={form.consent} onChange={(e)=>set("consent", e.target.checked)} style={{ marginTop: 3 }} />
              <span className="p" style={{ margin:0 }}>{t("form.consent")}</span>
            </label>

            {ok ? <div className="pill" style={{ background: "rgba(16,185,129,.12)", borderColor:"rgba(16,185,129,.35)" }}>{ok}</div> : null}
            {err ? <div className="pill" style={{ background: "rgba(230,57,70,.10)", borderColor:"rgba(230,57,70,.35)" }}>{err}</div> : null}

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Submitting..." : t("form.submit")}
            </button>

            <small className="help">
              Tip: You can also message us directly on WhatsApp for faster response.
            </small>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="h2" style={{ fontSize: 18 }}>Optional paid services (future)</div>
          <p className="p">If you later decide to charge for premium processing, you can enable Stripe payments with the prepared backend function.</p>
          <a className="btn secondary" href="/.netlify/functions/createCheckoutSession" onClick={(e)=>e.preventDefault()}>
            Stripe Payments (disabled by default)
          </a>
        </div>
      </div>
    </div>
  );
}
