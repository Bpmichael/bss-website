import React, { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "../../lib/api";
import { clearAdminToken, getAdminToken } from "./auth";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../lib/i18n.jsx";

const STATUSES = ["New", "Contacted", "Processing", "Admission Submitted", "Visa Processing", "Approved", "Closed"];

export default function Dashboard() {
  const { t } = useI18n();
  const nav = useNavigate();
  const token = getAdminToken();

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true); setErr("");
    try {
      const res = await apiGet("/.netlify/functions/getApplications?token=" + encodeURIComponent(token));
      setItems(res.items || []);
    } catch (e) {
      setErr(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (!filter) return items;
    return items.filter((x) => (x.service || "").toLowerCase().includes(filter.toLowerCase()));
  }, [items, filter]);

  async function updateTracking(appId, status, notes) {
    try {
      await apiPost("/.netlify/functions/updateTracking", { token, applicationId: appId, status, notes });
      await load();
    } catch (e) {
      alert(e.message || "Update failed");
    }
  }

  function logout() {
    clearAdminToken();
    nav("/admin");
  }

  return (
    <div className="grid" style={{ gap: 18 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap" }}>
        <div>
          <h2 className="h2" style={{ marginBottom: 4 }}>{t("admin.dash.title")}</h2>
          <p className="p" style={{ marginTop: 0 }}>{t("admin.dash.body")}</p>
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <button className="btn secondary" onClick={load} disabled={loading}>{loading ? "Refreshing..." : "Refresh"}</button>
          <button className="btn danger" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="card">
        <div className="card-body" style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
          <input className="input" style={{ maxWidth: 360 }} placeholder="Filter by service (e.g. visa, security, cleaning)" value={filter} onChange={(e)=>setFilter(e.target.value)} />
          <a className="btn secondary" href="/.netlify/functions/exportCsv?token=" target="_blank" rel="noreferrer" onClick={(e)=>{ e.currentTarget.href=`/.netlify/functions/exportCsv?token=${encodeURIComponent(token)}`; }}>
            Download CSV
          </a>
          <small className="help">Student tracking is built-in: set a status and add notes per application.</small>
        </div>
      </div>

      {err ? <div className="pill" style={{ background: "rgba(230,57,70,.10)", borderColor:"rgba(230,57,70,.35)" }}>{err}</div> : null}

      <div className="card">
        <div className="card-body" style={{ overflowX:"auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Service</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((x) => (
                <Row key={x.id} item={x} onSave={updateTracking} />
              ))}
              {!loading && filtered.length === 0 ? (
                <tr><td colSpan="8" className="p">No applications yet.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Row({ item, onSave }) {
  const [status, setStatus] = useState(item.tracking_status || "New");
  const [notes, setNotes] = useState(item.tracking_notes || "");

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.first_name} {item.middle_name || ""} {item.last_name}</td>
      <td>{item.service}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>
        <select value={status} onChange={(e)=>setStatus(e.target.value)}>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </td>
      <td>
        <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={2} style={{ width: 260 }} />
      </td>
      <td>
        <button className="btn" onClick={()=>onSave(item.id, status, notes)}>Update</button>
      </td>
    </tr>
  );
}
