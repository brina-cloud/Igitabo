const user = requireRole("cooperative");
const $ = id => document.getElementById(id);


const ROUTES = {
  profile: "/cooperative/profile",      
  mine: "/listings/mine",            
  listings: "/listings",             
  incoming: "/requests/mine",    
  respond: id => `/requests/${id}/respond`, 
};

let myListings = [];

async function init() {
  const options = await api("/content/options", { auth: false });
  $("l-category").innerHTML = options.categories.map(c => `<option>${esc(c)}</option>`).join("");
  $("locations").innerHTML = options.locations.map(l => `<option value="${esc(l)}">`).join("");
  await Promise.all([loadProfile(), loadListings(), loadRequests()]);
}

async function loadProfile() {
  const [p, me] = await Promise.all([
    api(ROUTES.profile),
    api("/auth/me"),
  ]);
  renderProfileHead(me, "Cooperative");
  $("p-location").value = p.location || "";
  $("p-phone").value = p.phone || "";
  $("verified").innerHTML = p.is_verified
    ? chip("Verified") + " Your listings are visible to manufacturers."
    : chip("Pending") + " An administrator must verify you before manufacturers can see your listings.";
  $("verify-note").textContent = p.is_verified
    ? "Your listings are visible to manufacturers."
    : "An administrator must verify you before manufacturers can see your listings.";
  $("verify-note").className = p.is_verified ? "banner banner-ok" : "banner banner-warn";
  $("complete-note").hidden = Boolean(p.location && p.phone);
}

$("profile-form").addEventListener("submit", e => {
  e.preventDefault();
  run(async () => {
    await api(ROUTES.profile, { method: "PUT", body: { location: $("p-location").value.trim(), phone: $("p-phone").value.trim() } });
    toast("Profile saved");
    await loadProfile();
  });
});

async function loadListings() {
  myListings = await api(ROUTES.mine);
  setStat("st-listings", myListings.length);
  $("listing-empty").hidden = myListings.length > 0;
  $("listing-rows").innerHTML = myListings.map(l => `
    <tr>
      <td>${esc(l.name)}</td><td>${esc(l.category || "")}</td><td>${num(l.quantity)} kg</td>
      <td>${money(l.price)}</td><td>${chip(l.availability)}</td>
      <td><button class="btn btn-small btn-outline" data-edit="${l.id}" type="button">Edit</button>
          <button class="btn btn-small btn-outline" data-delete="${l.id}" type="button">Delete</button></td>
    </tr>`).join("");
}

function resetForm() {
  $("listing-form").reset();
  $("l-id").value = "";
  $("form-title").textContent = "Add listing";
  $("l-cancel").hidden = true;
}

$("l-cancel").addEventListener("click", resetForm);

$("listing-rows").addEventListener("click", e => {
  const edit = e.target.closest("[data-edit]");
  const del = e.target.closest("[data-delete]");
  if (edit) {
    const l = myListings.find(x => x.id === Number(edit.dataset.edit));
    if (!l) return;
    $("l-id").value = l.id;
    $("l-name").value = l.name;
    $("l-category").value = l.category || "";
    $("l-quantity").value = l.quantity;
    $("l-price").value = l.price ?? "";
    $("l-location").value = l.location || "";
    $("form-title").textContent = "Edit listing";
    $("l-cancel").hidden = false;
    $("listing-form").scrollIntoView({ behavior: "smooth" });
  }
  if (del && confirm("Delete this listing?")) {
    run(async () => {
      await api(`${ROUTES.listings}/${del.dataset.delete}`, { method: "DELETE" });
      toast("Listing deleted");
      await loadListings();
    });
  }
});

$("listing-form").addEventListener("submit", e => {
  e.preventDefault();
  const id = $("l-id").value;
  const body = {
    name: $("l-name").value.trim(),
    category: $("l-category").value,
    quantity: parseFloat($("l-quantity").value),
    price: parseFloat($("l-price").value),
    location: $("l-location").value.trim(),
  };
  run(async () => {
    await api(id ? `${ROUTES.listings}/${id}` : ROUTES.listings, { method: id ? "PUT" : "POST", body });
    toast(id ? "Listing updated" : "Listing added");
    resetForm();
    await loadListings();
  });
});

async function loadRequests() {
  const requests = await api(ROUTES.incoming);
  setStat("st-pending", requests.filter(r => r.status === "Pending").length);
  setStat("st-accepted", requests.filter(r => r.status === "Accepted").length);
  $("request-list").innerHTML = requests.length ? requests.map(r => `
    <div class="item" style="margin-bottom:12px">
      <div class="top"><b>${esc(r.listing_name)}</b>${chip(r.status)}</div>
      <p>${esc(r.manufacturer_name)} wants ${num(r.quantity)} kg · ${fmtDate(r.created_at)}${r.message ? `<br>“${esc(r.message)}”` : ""}</p>
      ${r.status === "Pending" ? `<div class="actions">
        <button class="btn btn-small" data-decision="accept" data-id="${r.id}" type="button">Accept</button>
        <button class="btn btn-small btn-outline" data-decision="reject" data-id="${r.id}" type="button">Reject</button></div>` : ""}
    </div>`).join("") : '<p class="empty">No requests yet.</p>';
}

$("request-list").addEventListener("click", e => {
  const btn = e.target.closest("[data-decision]");
  if (!btn) return;
  run(async () => {
    await api(ROUTES.respond(btn.dataset.id), { method: "POST", body: { decision: btn.dataset.decision } });
    toast("Request " + (btn.dataset.decision === "accept" ? "accepted" : "rejected"));
    await Promise.all([loadRequests(), loadListings()]);
  });
});

if (user) run(init);