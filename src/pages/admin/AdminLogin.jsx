import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../lib/api";
import { setAdminToken, clearAdminToken } from "./auth";
import { useI18n } from "../../lib/i18n.jsx";

export default function AdminLogin() {
  const { t } = useI18n();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function login(e) {
    e.preventDefault();
    setMsg(""); setErr("");
    try {
      const res = await apiPost("/.netlify/functions/adminLogin", { email, password });
      setAdminToken(res.token);
      nav("/admin/dashboard");
    } catch (e2) {
      clearAdminToken();
      setErr(e2.message || "Login failed");
    }
  }

  return (
    <div className="grid" style={{ gap: 18, maxWidth: 520 }}>
      <h2 className="h2">{t("admin.login.title")}</h2>
      <p className="p">{t("admin.login.body")}</p>

      <div className="card">
        <div className="card-body">
          <form className="form" onSubmit={login}>
            <input className="input" type="email" placeholder="Admin email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <input className="input" type="password" placeholder="Admin password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            {msg ? <div className="pill">{msg}</div> : null}
            {err ? <div className="pill" style={{ background: "rgba(230,57,70,.10)", borderColor:"rgba(230,57,70,.35)" }}>{err}</div> : null}
            <button className="btn" type="submit">Sign in</button>
            <small className="help">
              
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}
