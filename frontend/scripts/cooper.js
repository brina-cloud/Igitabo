const API = "/api";
const PAGES = { cooperative: "cooper.html", manufacturer: "man.html", administrator: "admin.html" };

const store = {
  get token() { return localStorage.getItem("igitabo_token"); },
  get user() {
    try { return JSON.parse(localStorage.getItem("igitabo_user") || "null"); } catch { return null; }
  },
  set(data) {
    localStorage.setItem("igitabo_token", data.access_token);
    localStorage.setItem("igitabo_user", JSON.stringify({ role: data.role, name: data.name }));
  },
  clear() {
    localStorage.removeItem("igitabo_token");
    localStorage.removeItem("igitabo_user");
  },
};

function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function errorText(data) {
  if (!data) return "Something went wrong.";
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.detail)) {
    return data.detail.map(e => `${(e.loc || []).slice(1).join(" ")}: ${e.msg}`).join("; ");
  }
  return "Something went wrong.";
}

async function api(path, opts = {}) {
  const headers = { "Content-Type": "application/json" };
  if (opts.auth !== false && store.token) headers.Authorization = "Bearer " + store.token;
  let res;
  try {
    res = await fetch(API + path, {
      method: opts.method || "GET",
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. Check your connection.");
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401 && opts.auth !== false) logout();
    throw new Error(errorText(data));
  }
  return data;
}

function logout() {
  store.clear();
  location.href = "index.html";
}


function requireRole(role) {
  const user = store.user;
  if (!store.token || !user || user.role !== role) {
    location.href = "index.html";
    return null;
  }
  document.querySelectorAll("[data-user]").forEach(el => (el.textContent = user.name));
  document.querySelectorAll("[data-logout]").forEach(el => el.addEventListener("click", logout));
  return user;
}

let toastTimer;
function toast(message, kind = "ok") {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.className = "toast show" + (kind === "bad" ? " bad" : "");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.className = "toast"), 3500);
}

// Run an action and show any error as a message instead of failing silently.
async function run(action) {
  try { return await action(); } catch (err) { toast(err.message, "bad"); }
}

const STATUS_CLASS = { Available: "ok", Accepted: "ok", Verified: "ok", Low: "warn", Pending: "warn", "Out of stock": "bad", Rejected: "bad" };
const chip = text => `<span class="chip ${STATUS_CLASS[text] || "muted"}">${esc(text)}</span>`;
const num = n => Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });
const money = n => (n == null ? "" : "RWF " + num(n));
const fmtDate = s => new Date(s.endsWith("Z") ? s : s + "Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });