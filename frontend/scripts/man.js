const user = requireRole("manufacturer");
const $ = id => document.getElementById(id);

async function init() {
  const options = await api("/content/options", { auth: false });
  $("s-category").innerHTML = '<option value="">Any</option>' + options.categories.map(c => `<option>${esc(c)}</option>`).join("");
  $("locations").innerHTML = options.locations.map(l => `<option value="${esc(l)}">`).join("");
  await Promise.all([searchListings(), loadRequests()]);
}

