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