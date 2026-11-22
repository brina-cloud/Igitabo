const PAGES = {
  cooperative: "cooper.html",
  manufacturer: "man.html",
  administrator: "admin.html",
};

const store = {
  token: () => localStorage.getItem("igitabo_token"),
  user: () => {
    try {
      return JSON.parse(localStorage.getItem("igitabo_user") || "null");
    } catch {
      return null;
    }
  },
  set: data => {
    localStorage.setItem("igitabo_token", data.access_token);
    localStorage.setItem("igitabo_user", JSON.stringify({
      role: data.role,
      name: data.name,
    }));
  },
};

const $ = id => document.getElementById(id);

function show(which) {
  $("register-form").hidden = which !== "register";
  $("login-form").hidden = which !== "login";
  $("tab-register").className = "btn" + (which === "register" ? "" : " btn-outline");
  $("tab-login").className = "btn" + (which === "login" ? "" : " btn-outline");
  $("msg").textContent = "";
}

function errorText(data) {
  if (!data) return "Something went wrong.";
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.detail)) {
    return data.detail.map(error => {
      const field = (error.loc || []).slice(1).join(" ");
      return field ? `${field}: ${error.msg}` : error.msg;
    }).join("; ");
  }
  return "Something went wrong.";
}

async function api(path, body) {
  let response;
  try {
    response = await fetch("/api" + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Cannot reach the server. Check your connection.");
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(errorText(data));
  return data;
}

async function authenticate(path, body) {
  $("msg").textContent = "";
  try {
    const data = await api(path, body);
    store.set(data);
    location.href = PAGES[data.role];
  } catch (error) {
    $("msg").textContent = error.message;
  }
}

const existingToken = store.token();
const existingUser = store.user();
if (existingToken && existingUser && PAGES[existingUser.role]) {
  location.href = PAGES[existingUser.role];
}

$("tab-register").onclick = () => show("register");
$("tab-login").onclick = () => show("login");
$("r-role").onchange = () => {
  $("org-row").hidden = $("r-role").value !== "manufacturer";
};

$("login-form").addEventListener("submit", event => {
  event.preventDefault();
  authenticate("/auth/login", {
    email: $("l-email").value,
    password: $("l-password").value,
  });
});

$("register-form").addEventListener("submit", event => {
  event.preventDefault();
  authenticate("/auth/register", {
    role: $("r-role").value,
    name: $("r-name").value,
    email: $("r-email").value,
    password: $("r-password").value,
    organisation: $("r-org").value || null,
    location: $("r-location").value || null,
    phone: $("r-phone").value || null,
  });
});

fetch("/api/content/options")
  .then(response => response.ok ? response.json() : null)
  .then(options => {
    if (!options) return;
    $("locations").innerHTML = options.locations
      .map(location => `<option value="${location.replace(/[&<>"']/g, "")}">`)
      .join("");
  })
  .catch(() => {});
