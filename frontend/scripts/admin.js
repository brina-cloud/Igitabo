const user = requireRole("administrator");
const $ = id => document.getElementById(id);

async function load() {
  const coops = await api("/admin/cooperatives?status=" + $("filter").value);
  $("empty").hidden = coops.length > 0;
  $("rows").innerHTML = coops.map(c => `
    <tr>
      <td>${esc(c.name)}</td><td>${esc(c.email)}</td><td>${esc(c.location || "")}</td><td>${esc(c.phone || "")}</td>
      <td>${fmtDate(c.registered_at)}</td><td>${chip(c.is_verified ? "Verified" : "Pending")}</td>
      <td>${c.is_verified ? "" : `<button class="btn btn-small" data-verify="${c.id}" type="button">Verify</button>`}</td>
    </tr>`).join("");
}
$("filter").addEventListener("change", () => run(load));
$("rows").addEventListener("click", e => {
  const btn = e.target.closest("[data-verify]");
  if (!btn) return;
  run(async () => {
    await api(`/admin/cooperatives/${btn.dataset.verify}/verify`, { method: "POST" });
    toast("Cooperative verified");
    await load();
  });
});

if (user) run(load);
