if (store.token && store.user) location.href = PAGES[store.user.role];
    const $ = id => document.getElementById(id);

    function show(which) {
      $("register-form").hidden = which !== "register";
      $("login-form").hidden = which !== "login";
      $("tab-register").className = "btn" + (which === "register" ? "" : " btn-outline");
      $("tab-login").className = "btn" + (which === "login" ? "" : " btn-outline");
      $("msg").textContent = "";
    }
    $("tab-register").onclick = () => show("register");
    $("tab-login").onclick = () => show("login");
    $("r-role").onchange = () => { $("org-row").hidden = $("r-role").value !== "manufacturer"; };

    async function authenticate(path, body) {
      $("msg").textContent = "";
      try {
        const data = await api(path, { method: "POST", body, auth: false });
        store.set(data);
        location.href = PAGES[data.role];
      } catch (err) { $("msg").textContent = err.message; }
    }
    $("login-form").addEventListener("submit", e => {
      e.preventDefault();
      authenticate("/auth/login", { email: $("l-email").value, password: $("l-password").value });
    });