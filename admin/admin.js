(() => {
  const $ = id => document.getElementById(id);
  let page = 1, pages = 1, status = "", current = null, timer;

  const toast = msg => { const t = $("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200); };
  const fmt = d => new Date(d).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
  const mk = (tag, text, cls) => { const e = document.createElement(tag); if (text != null) e.textContent = text; if (cls) e.className = cls; return e; };
  const initials = n => String(n).trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase() || "?";

  async function api(url, opts = {}) {
    const r = await fetch(url, { credentials: "same-origin", headers: { "Content-Type": "application/json" }, ...opts });
    if (r.status === 401) { location.replace("/admin/login"); throw new Error("auth"); }
    return r.json();
  }

  /* greeting */
  const h = new Date().getHours();
  $("hello").textContent = (h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening") + ", team";

  /* stats + chart */
  async function loadStats() {
    const { stats, trend } = await api("/api/admin/stats");
    const box = $("stats"); box.textContent = "";
    [["Total", stats.total, ""], ["New", stats.new, "s-new"], ["Read", stats.read, "s-read"], ["Replied", stats.replied, "s-replied"], ["Today", stats.today, "s-today"]].forEach(([l, v, c]) => {
      const d = mk("div", null, "stat " + c); d.append(mk("small", l), mk("strong", v)); box.append(d);
    });
    const nc = $("newCount"); nc.hidden = !stats.new; nc.textContent = stats.new;
    document.title = (stats.new ? `(${stats.new}) ` : "") + "Admin Panel | NZK Techs";
    $("sub").textContent = stats.new ? `You have ${stats.new} new enquir${stats.new === 1 ? "y" : "ies"} waiting.` : "You are all caught up. No new enquiries.";

    const max = Math.max(1, ...trend.map(t => t.n));
    const chart = $("chart"); chart.textContent = "";
    trend.forEach(t => {
      const col = mk("div", null, "bar"), bar = document.createElement("i");
      col.append(mk("b", t.n), bar, mk("span", t.label)); chart.append(col);
      requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.height = Math.max(4, (t.n / max) * 100) + "%"; }));
    });
    const split = $("split"); split.textContent = "";
    [["New", stats.new, "var(--new)"], ["Read", stats.read, "var(--read)"], ["Replied", stats.replied, "var(--replied)"]].forEach(([l, v, c]) => {
      const row = mk("div"), top = mk("div", null, "row"), tr = mk("div", null, "track"), fill = document.createElement("i");
      top.append(mk("span", l), mk("b", v)); fill.style.background = c; tr.append(fill); row.append(top, tr); split.append(row);
      requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = (stats.total ? v / stats.total * 100 : 0) + "%"; }));
    });
  }

  /* list */
  const qs = () => new URLSearchParams({ search: $("search").value.trim(), status, page, limit: 20 });
  function skeleton() {
    const b = $("rows"); b.textContent = "";
    for (let i = 0; i < 5; i++) { const tr = mk("tr", null, "skel"); for (let j = 0; j < 5; j++) { const td = mk("td"); td.append(document.createElement("i")); tr.append(td); } b.append(tr); }
  }
  async function loadList(first) {
    if (first) skeleton();
    const d = await api("/api/admin/contacts?" + qs());
    pages = d.pages;
    const body = $("rows"); body.textContent = "";
    d.items.forEach(c => {
      const tr = mk("tr", null, "row" + (c.status === "new" ? " is-new" : ""));
      const who = mk("td"), p = mk("div", null, "person"), nm = mk("div");
      nm.append(mk("div", c.name, "pname")); p.append(mk("div", initials(c.name), "avatar"), nm); who.append(p);
      const contact = mk("td"); contact.append(mk("div", c.phone), mk("div", c.email, "psub"));
      const st = mk("td"); st.append(mk("span", c.status, "badge " + c.status));
      tr.append(who, contact, mk("td", c.message, "msg"), mk("td", fmt(c.createdAt)), st);
      tr.addEventListener("click", () => openDrawer(c));
      body.append(tr);
    });
    $("empty").hidden = d.items.length > 0;
    $("count").textContent = `${d.total} enquir${d.total === 1 ? "y" : "ies"} · page ${d.page} of ${d.pages}`;
    $("prev").disabled = page <= 1; $("next").disabled = page >= pages;
  }
  const reload = first => Promise.all([loadStats(), loadList(first)]).catch(() => {});

  /* drawer */
  function openDrawer(c) {
    current = c;
    $("d-av").textContent = initials(c.name); $("d-name").textContent = c.name; $("d-date").textContent = fmt(c.createdAt);
    const ph = mk("a", c.phone); ph.href = "tel:" + c.phone; $("d-phone").replaceChildren(ph);
    const em = mk("a", c.email); em.href = "mailto:" + c.email; $("d-email").replaceChildren(em);
    $("d-mail").textContent = `Visitor: ${c.userEmailSent ? "sent" : "not sent"} · Team: ${c.teamEmailSent ? "sent" : "not sent"}`;
    $("d-msg").textContent = c.message;
    $("d-status").value = c.status; $("d-note").value = c.note || "";
    let digits = c.phone.replace(/\D/g, ""); if (digits.startsWith("0")) digits = "92" + digits.slice(1);
    $("d-wa").href = "https://wa.me/" + digits;
    $("d-mailto").href = "mailto:" + c.email + "?subject=" + encodeURIComponent("Re: your message to NZK Techs");
    $("drawer").classList.add("open"); $("scrim").classList.add("open");
    if (c.status === "new") save(true, "read");
  }
  const closeDrawer = () => { $("drawer").classList.remove("open"); $("scrim").classList.remove("open"); current = null; };
  async function save(silent, forceStatus) {
    if (!current) return;
    const body = { status: forceStatus || $("d-status").value, note: $("d-note").value };
    const d = await api("/api/admin/contacts/" + current._id, { method: "PATCH", body: JSON.stringify(body) });
    if (d.ok) { current = d.item; if (forceStatus) $("d-status").value = forceStatus; if (!silent) toast("Saved"); reload(); }
    else toast(d.message || "Could not save");
  }
  $("d-save").onclick = () => save(false);
  $("d-close").onclick = closeDrawer; $("scrim").onclick = closeDrawer;
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeDrawer(); $("side").classList.remove("open"); } });
  $("d-del").onclick = async () => {
    if (!current || !confirm("Delete this enquiry permanently?")) return;
    const d = await api("/api/admin/contacts/" + current._id, { method: "DELETE" });
    if (d.ok) { toast("Deleted"); closeDrawer(); reload(); } else toast(d.message || "Could not delete");
  };

  /* controls */
  $("tabs").addEventListener("click", e => {
    const b = e.target.closest(".tab"); if (!b) return;
    document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === b));
    status = b.dataset.s; page = 1; loadList();
  });
  $("search").addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => { page = 1; loadList(); }, 300); });
  $("clear").onclick = () => { $("search").value = ""; status = ""; page = 1; document.querySelectorAll(".tab").forEach((t, i) => t.classList.toggle("active", i === 0)); loadList(); };
  $("prev").onclick = () => { if (page > 1) { page--; loadList(); } };
  $("next").onclick = () => { if (page < pages) { page++; loadList(); } };
  $("refresh").onclick = () => { reload(); toast("Refreshed"); };
  $("export").onclick = () => { location.href = "/api/admin/export.csv?" + new URLSearchParams({ search: $("search").value.trim(), status }); };
  $("menu").onclick = () => $("side").classList.toggle("open");
  $("logout").onclick = async () => { await fetch("/api/admin/logout", { method: "POST" }); location.replace("/admin/login"); };

  reload(true);
  setInterval(() => { if (!$("drawer").classList.contains("open")) reload(); }, 60000);
})();
