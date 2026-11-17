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

