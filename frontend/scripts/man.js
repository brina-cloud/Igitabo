const user = requireRole("manufacturer");
const $ = id => document.getElementById(id);

let myRequests = [];
let lastMatches = null;

const optionList = items => items.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join("");

async function init() {
  const options = await api("/content/options", { auth: false });
  $("s-category").innerHTML = '<option value="">Any</option>' + optionList(options.categories);
  $("locations").innerHTML = options.locations.map(l => `<option value="${esc(l)}">`).join("");
  await Promise.all([loadProfile(), searchListings(), loadRequests()]);
}


window.onIgitaboLang = () => { renderMatches(); renderRequests(); };

async function loadProfile() {
  const me = await api("/auth/me");
  renderProfileHead(me, "Manufacturer");
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

