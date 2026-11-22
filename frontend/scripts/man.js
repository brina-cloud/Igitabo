const user = requireRole("manufacturer");
const $ = id => document.getElementById(id);

async function init() {
  const options = await api("/content/options", { auth: false });
  $("s-category").innerHTML = '<option value="">Any</option>' + options.categories.map(c => `<option>${esc(c)}</option>`).join("");
  $("locations").innerHTML = options.locations.map(l => `<option value="${esc(l)}">`).join("");
  await Promise.all([searchListings(), loadRequests()]);
}


function listingCard(l, extra = "") {
  const out = l.availability === "Out of stock";
  return `
    <div class="item">
      <div class="top"><b>${esc(l.name)}</b>${chip(l.availability)}</div>
      <p>${esc(l.cooperative_name)}<br>${esc(l.location || "")} · ${num(l.quantity)} kg · ${money(l.price)}/kg</p>
      ${extra}
      <div class="foot"><span class="chip ok">Verified</span>
        <button class="btn btn-small" type="button" data-request="${l.id}" data-name="${esc(l.name)}"
          data-coop="${esc(l.cooperative_name)}" data-max="${l.quantity}" ${out ? "disabled" : ""}>Send request</button></div>
    </div>`;
}

async function searchListings() {
  const params = new URLSearchParams();
  [["material", "s-material"], ["category", "s-category"], ["location", "s-location"], ["availability", "s-availability"]]
    .forEach(([key, id]) => { if ($(id).value.trim()) params.set(key, $(id).value.trim()); });
  const results = await api("/listings/search?" + params);
  $("search-results").innerHTML = results.length ? results.map(l => listingCard(l)).join("")
    : '<p class="empty">No listings match. Try fewer filters.</p>';
}
$("search-form").addEventListener("submit", e => { e.preventDefault(); run(searchListings); });


$("match-form").addEventListener("submit", e => {
  e.preventDefault();
  run(async () => {
    const params = new URLSearchParams({ material: $("m-material").value.trim(), quantity: $("m-quantity").value });
    if ($("m-location").value.trim()) params.set("location", $("m-location").value.trim());
    const matches = await api("/match?" + params);
    $("match-results").innerHTML = matches.length ? matches.map(m => listingCard(m.listing,
      `<p><span class="chip ok">Match score ${m.score}</span></p><ul class="reasons">${m.reasons.map(r => `<li>${esc(r)}</li>`).join("")}</ul>`)).join("")
      : '<p class="empty">No verified cooperative has that much. Try a smaller quantity.</p>';
  });
});


document.addEventListener("click", e => {
  const btn = e.target.closest("[data-request]");
  if (!btn) return;
  $("d-listing").value = btn.dataset.request;
  $("d-info").textContent = `${btn.dataset.name} from ${btn.dataset.coop}. Up to ${num(btn.dataset.max)} kg available.`;
  $("d-quantity").max = btn.dataset.max;
  $("d-quantity").value = "";
  $("d-message").value = "";
  $("request-dialog").showModal();
});
$("d-cancel").addEventListener("click", () => $("request-dialog").close());
$("request-form").addEventListener("submit", e => {
  e.preventDefault();
  run(async () => {
    await api("/requests", { method: "POST", body: {
      listing_id: Number($("d-listing").value), quantity: parseFloat($("d-quantity").value), message: $("d-message").value || null } });
    $("request-dialog").close();
    toast("Request sent");
    await loadRequests();
    location.hash = "#requests";
  });
});


async function loadRequests() {
  const requests = await api("/requests/mine");
  $("request-list").innerHTML = requests.length ? requests.map(r => `
    <div class="item" style="margin-bottom:12px">
      <div class="top"><b>${esc(r.listing_name)}</b>${chip(r.status)}</div>
      <p>${num(r.quantity)} kg from ${esc(r.cooperative_name)} · ${fmtDate(r.created_at)}${r.message ? `<br>“${esc(r.message)}”` : ""}</p>
    </div>`).join("") : '<p class="empty">You have not sent any requests yet.</p>';
}

if (user) run(init);
