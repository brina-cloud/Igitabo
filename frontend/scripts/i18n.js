// English / Kinyarwanda toggle.
   
(function () {
  const RW = {
    // page titles
    "Igitabo: supply platform for Rwanda": "Igitabo: urubuga rw'ibikoresho fatizo mu Rwanda",
    "Igitabo: cooperative": "Igitabo: koperative",
    "Igitabo: manufacturer": "Igitabo: uruganda",
    "Igitabo: administrator": "Igitabo: umuyobozi",

    "Supply platform for Rwanda": "Urubuga rw'ibikoresho fatizo mu Rwanda",
    "Find local raw materials. Reach the right manufacturers.": "Shaka ibikoresho fatizo byo mu gihugu. Menyana n'inganda zikubereye.",
    "Igitabo connects rural cooperatives with manufacturers in Rwanda.": "Igitabo gihuza amakoperative yo mu cyaro n'inganda zo mu Rwanda.",
    "Cooperatives list materials and answer requests": "Amakoperative ashyira ibikoresho ku rubuga kandi agasubiza ibisabwa",
    "Manufacturers search, match and request supply": "Inganda zishakisha, zigahuzwa kandi zigasaba ibikoresho",
    "Administrators verify every cooperative": "Abayobozi bemeza buri koperative",
    "Register": "Iyandikishe",
    "Log in": "Injira",
    "Log out": "Sohoka",
    "I am a": "Ndi",
    "Cooperative": "Koperative",
    "Manufacturer": "Uruganda",
    "Name": "Amazina",
    "Company name": "Izina ry'uruganda",
    "Email": "Imeri",
    "Password": "Ijambobanga",
    "At least 8 characters.": "Nibura inyuguti 8.",
    "Location (district)": "Aho uherereye (akarere)",
    "Phone": "Telefone",
    "Create account": "Fungura konti",
    "Administrator accounts are created by the developer.": "Konti z'abayobozi zifungurwa n'uwakoze porogaramu.",

    // navigation and shared
    "Profile": "Umwirondoro",
    "Listings": "Ibikoresho",
    "Requests": "Ibisabwa",
    "Search": "Shakisha",
    "Match suppliers": "Huza n'abatanga",
    "My requests": "Ibyo nasabye",
    "Cooperatives": "Amakoperative",
    "Cancel": "Reka",
    "Verified": "Yemejwe",
    "Pending": "Itegereje",
    "Accepted": "Yemewe",
    "Rejected": "Yanzwe",
    "Available": "Birahari",
    "Low": "Biri hasi",
    "Out of stock": "Byashize",
    "Any": "Byose",
    "All": "Byose",
    "Status": "Imimerere",
    "Location": "Aho giherereye",
    "Category": "Icyiciro",
    "Material": "Igikoresho",
    "Quantity": "Ingano",
    "Price": "Igiciro",
    "Actions": "Ibikorwa",
    "Action": "Igikorwa",

    // profile
    "My profile": "Umwirondoro wanjye",
    "Contact details": "Amakuru yo kuvugana",
    "Manufacturers use these details to reach you.": "Inganda zikoresha aya makuru kugira ngo zikugereho.",
    "Add your location and phone so manufacturers can reach you.": "Ongeraho aho uherereye na telefone kugira ngo inganda zibashe kukugeraho.",
    "Your listings are visible to manufacturers.": "Ibikoresho byawe bigaragara ku nganda.",
    "An administrator must verify you before manufacturers can see your listings.": "Umuyobozi agomba kukwemeza mbere y'uko inganda zibona ibikoresho byawe.",
    "Save profile": "Bika umwirondoro",
    "Pending requests": "Ibisabwa bitegereje",
    "Accepted requests": "Ibisabwa byemewe",
    "Total requests": "Ibisabwa byose",
    "Your requests and their answers are shown below.": "Ibyo wasabye n'ibisubizo byabyo biri hepfo.",

    // cooperative page
    "My listings": "Ibikoresho byanjye",
    "No listings yet. Add your first material.": "Nta bikoresho urashyiraho. Shyiraho igikoresho cya mbere.",
    "Add listing": "Ongeramo igikoresho",
    "Edit listing": "Hindura igikoresho",
    "Material name": "Izina ry'igikoresho",
    "Quantity (kg)": "Ingano (kg)",
    "Price (RWF per kg)": "Igiciro (RWF kuri kg)",
    "Availability is set automatically from the quantity.": "Uko igikoresho gihagaze bigenwa ku buryo bwikora hashingiwe ku ngano.",
    "Save listing": "Bika igikoresho",
    "Cancel edit": "Hagarika guhindura",
    "Incoming requests": "Ibisabwa byakiriwe",
    "Edit": "Hindura",
    "Delete": "Siba",
    "Accept": "Emera",
    "Reject": "Anga",
    "No requests yet.": "Nta byasabwe kugeza ubu.",
    "{0} wants {1} kg": "{0} arasaba ibiro {1}",
    "Delete this listing?": "Wasiba iki gikoresho?",
    "Profile saved": "Umwirondoro wabitswe",
    "Listing deleted": "Igikoresho cyasibwe",
    "Listing updated": "Igikoresho cyahinduwe",
    "Listing added": "Igikoresho cyongewemo",
    "Request accepted": "Ubusabe bwemewe",
    "Request rejected": "Ubusabe bwanzwe",

    // manufacturer page
    "Find suppliers": "Shaka abatanga ibikoresho",
    "e.g. Maize": "urugero: Ibigori",
    "Availability": "Uko bihagaze",
    "Match suppliers to my need": "Huza n'abatanga bijyanye n'ibyo nkeneye",
    "Enter what you need. Igitabo lists verified cooperatives that have enough, best match first.": "Andika ibyo ukeneye. Igitabo kikwereka amakoperative yemejwe afite ibihagije, ahuje n'ibyo ukeneye cyane ari ku isonga.",
    "Quantity needed (kg)": "Ingano ukeneye (kg)",
    "Preferred location": "Aho ukunda",
    "Find matches": "Shaka abahuje",
    "Send request": "Ohereza ubusabe",
    "Message (optional)": "Ubutumwa (si itegeko)",
    "Request sent": "Ubusabe bwoherejwe",
    "No listings match. Try fewer filters.": "Nta bikoresho bihuye. Gerageza kugabanya ibyo ushakisha.",
    "No verified cooperative has that much. Try a smaller quantity.": "Nta koperative yemejwe ifite ingano nk'iyo. Gerageza ingano ntoya.",
    "You have not sent any requests yet.": "Ntacyo urasaba kugeza ubu.",
    "Match score {0}": "Amanota yo guhuza: {0}",
    "Has {0} kg, enough for {1} kg": "Ifite ibiro {0}, bihagije ku biro {1}",
    "Same location": "Ahantu hamwe",
    "Well stocked": "Ibihagije",
    "{0} kg from {1}": "Ibiro {0} biturutse kuri {1}",
    "{0} from {1}. Up to {2} kg available.": "{0} kuri {1}. Ibiro bigera kuri {2} birahari.",

    // admin page
    "Verify cooperatives": "Emeza amakoperative",
    "Review each cooperative’s details before verifying it. Listings from unverified cooperatives stay hidden from manufacturers.": "Suzuma amakuru ya buri koperative mbere yo kuyemeza. Ibikoresho by'amakoperative atemejwe ntibigaragara ku nganda.",
    "Show": "Erekana",
    "Registered": "Yiyandikishije",
    "No cooperatives to show.": "Nta makoperative yo kwerekana.",
    "Verify": "Emeza",
    "Cooperative verified": "Koperative yemejwe",

    // categories and common materials
    "Cereal": "Ibinyampeke",
    "Legume": "Ibinyamisogwe",
    "Oilseed": "Imbuto z'amavuta",
    "Flour": "Ifu",
    "Coffee": "Ikawa",
    "Tuber": "Ibinyabijumba",
    "Other": "Ibindi",
    "Maize": "Ibigori",
    "Beans": "Ibishyimbo",
    "Irish potatoes": "Ibirayi",
    "Sorghum": "Amasaka",
    "Soybeans": "Soya",
    "Cassava flour": "Ifu y'imyumbati",
    "Coffee cherries": "Imbuto z'ikawa",
    "Sunflower seeds": "Imbuto z'ururabyo",

    // messages from the server and the browser
    "Wrong email or password": "Imeri cyangwa ijambobanga si byo",
    "This email is already registered": "Iyi imeri isanzwe yanditswe",
    "Please log in": "Nyamuneka injira",
    "Your session has expired. Please log in again": "Igihe cyawe cyarangiye. Injira bundi bushya",
    "Account not found": "Konti ntibonetse",
    "You do not have access to this function": "Nta burenganzira ufite kuri iki gikorwa",
    "Cannot reach the server. Check your connection.": "Seriveri ntibonetse. Reba murandasi yawe.",
    "Something went wrong.": "Hari ikitagenze neza.",
    "Listing not found": "Igikoresho nticyabonetse",
    "This listing belongs to another cooperative": "Iki gikoresho ni icya koperative yindi",
    "This cooperative is not verified": "Iyi koperative ntiremezwa",
    "Request not found": "Ubusabe ntibwabonetse",
    "Cooperative not found": "Koperative ntiyabonetse"
  };

  const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "NOSCRIPT"]);
  const textSeen = new WeakMap();
  const attrSeen = new WeakMap();
  let lang = "en";
  try { lang = localStorage.getItem("igitabo_lang") === "rw" ? "rw" : "en"; } catch (e) {}

  const tr = key => (lang === "rw" && Object.prototype.hasOwnProperty.call(RW, key)) ? RW[key] : key;
  const t = (key, ...args) => tr(key).replace(/\{(\d+)\}/g, (m, i) => (args[i] !== undefined ? args[i] : m));

  function trNode(node) {
    const parent = node.parentNode;
    if (!parent || SKIP.has(parent.nodeName)) return;
    const rec = textSeen.get(node);
    const cur = node.nodeValue;
    const src = rec && cur === rec.out ? rec.en : cur;
    const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(src);
    if (!m[2]) return;
    const out = m[1] + tr(m[2]) + m[3];
    if (out !== cur) node.nodeValue = out;
    textSeen.set(node, { en: src, out });
    if (parent.nodeName === "OPTION" && !parent.hasAttribute("value")) parent.setAttribute("value", m[2]);
  }

  function trAttr(el) {
    const cur = el.getAttribute("placeholder");
    if (cur === null) return;
    const rec = attrSeen.get(el);
    const src = rec && cur === rec.out ? rec.en : cur;
    const out = tr(src);
    if (out !== cur) el.setAttribute("placeholder", out);
    attrSeen.set(el, { en: src, out });
  }

  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === 3) { trNode(root); return; }
    if (root.nodeType !== 1) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(trNode);
    if (root.hasAttribute("placeholder")) trAttr(root);
    root.querySelectorAll("[placeholder]").forEach(trAttr);
  }

  const titleEn = document.title;
  const trTitle = () => { document.title = tr(titleEn); };

  function syncToggle() {
    document.querySelectorAll(".lang button").forEach(b =>
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  }

  function setLang(code) {
    lang = code === "rw" ? "rw" : "en";
    try { localStorage.setItem("igitabo_lang", lang); } catch (e) {}
    document.documentElement.lang = lang;
    syncToggle();
    trTitle();
    translateTree(document.body);
    if (typeof window.onIgitaboLang === "function") window.onIgitaboLang(lang);
  }

  function mountToggle() {
    const host = document.querySelector(".nav .who") || document.querySelector(".nav");
    if (!host || host.querySelector(".lang")) return;
    const box = document.createElement("div");
    box.className = "lang";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Language");
    [["en", "EN", "English"], ["rw", "RW", "Kinyarwanda"]].forEach(([code, label, name]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.title = name;
      b.dataset.lang = code;
      b.addEventListener("click", () => setLang(code));
      box.appendChild(b);
    });
    host.insertBefore(box, host.firstChild);
    syncToggle();
  }

  document.documentElement.lang = lang;
  mountToggle();
  trTitle();
  translateTree(document.body);
  new MutationObserver(records => {
    records.forEach(r => r.addedNodes.forEach(translateTree));
  }).observe(document.body, { childList: true, subtree: true });

  window.t = t;
  window.getLang = () => lang;
  window.setLang = setLang;
})();