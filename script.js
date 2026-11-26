const products = [
  { name: "Biodegradable cups", cat: "Drinkware", desc: "Plant-fibre cups for hot and cold drinks.", sizes: "150 ml, 250 ml, 350 ml", print: true },
  { name: "Paper-fibre plates", cat: "Tableware", desc: "Sturdy plates that compost after use.", sizes: "7 in, 9 in, 10 in", print: false },
  { name: "Bowls", cat: "Tableware", desc: "Deep bowls for soups, rice, and snacks.", sizes: "250 ml, 500 ml", print: false },
  { name: "Carry bags", cat: "Bags", desc: "Strong bags that replace single-use plastic carry bags.", sizes: "Small, medium, large", print: true },
  { name: "Garbage bags", cat: "Bags", desc: "Compostable bin liners for homes and offices.", sizes: "19x21 in, 24x32 in", print: false },
  { name: "Food containers", cat: "Packaging", desc: "Takeaway boxes with a leak-resistant finish.", sizes: "500 ml, 750 ml, 1000 ml", print: true },
  { name: "Cutlery", cat: "Tableware", desc: "Spoons, forks, and knives made from natural materials.", sizes: "Standard", print: false },
  { name: "Packaging film", cat: "Packaging", desc: "Wrapping material for retail and industrial use.", sizes: "Made to order", print: true }
];
const cats = ["All", ...new Set(products.map(p => p.cat))];
let active = "All";
const $ = id => document.getElementById(id);

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

function renderProducts() {
  const q = $("search").value.trim().toLowerCase();
  const list = products.filter(p => (active === "All" || p.cat === active) &&
    (p.name + " " + p.desc + " " + p.cat).toLowerCase().includes(q));
  $("count").textContent = list.length ? `${list.length} product${list.length > 1 ? "s" : ""}` : "No products match. Try a different word or category.";
  $("product-grid").innerHTML = list.map(p => `
    <article class="card">
      <h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>
      <dl><dt>Sizes</dt><dd>${esc(p.sizes)}</dd><dt>Custom print</dt><dd>${p.print ? "Available" : "Not offered"}</dd></dl>
      <button class="btn small" data-name="${esc(p.name)}">Request a quote</button>
    </article>`).join("");
}

$("filters").innerHTML = cats.map(c => `<button type="button" class="chip" aria-pressed="${c === active}">${c}</button>`).join("");
$("filters").addEventListener("click", e => {
  if (!e.target.classList.contains("chip")) return;
  active = e.target.textContent;
  document.querySelectorAll(".chip").forEach(b => b.setAttribute("aria-pressed", b.textContent === active));
  renderProducts();
});
$("search").addEventListener("input", renderProducts);
$("product-grid").addEventListener("click", e => {
  const name = e.target.dataset.name;
  if (!name) return;
  $("product-select").value = name;
  $("contact").scrollIntoView({ behavior: "smooth" });
  document.querySelector("#enquiry [name=qty]").focus({ preventScroll: true });
});
$("product-select").innerHTML = products.map(p => `<option>${esc(p.name)}</option>`).join("");
renderProducts();

// Impact calculator (assumed averages: 5 g plastic per item, 6 kg CO2 per kg plastic)
const GRAMS_PER_ITEM = 5, CO2_PER_KG = 6;
function updateImpact() {
  const items = Math.max(0, Number($("items").value) || 0);
  const perYear = Math.round(items * Number($("share").value) / 100 * 12);
  const kg = perYear * GRAMS_PER_ITEM / 1000;
  $("share-out").textContent = $("share").value + "%";
  $("r-items").textContent = perYear.toLocaleString("en-IN");
  $("r-kg").textContent = Math.round(kg).toLocaleString("en-IN");
  $("r-co2").textContent = Math.round(kg * CO2_PER_KG).toLocaleString("en-IN");
}
$("items").addEventListener("input", updateImpact);
$("share").addEventListener("input", updateImpact);
updateImpact();

// Enquiry form: saved in this browser (localStorage) and shown on leads.html.
// A real deployment would post to a backend or email service instead.
$("enquiry").addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  d.date = new Date().toLocaleString("en-IN");
  try {
    const leads = JSON.parse(localStorage.getItem("redeem_leads") || "[]");
    leads.push(d);
    localStorage.setItem("redeem_leads", JSON.stringify(leads));
    $("form-msg").textContent = `Thanks, ${d.name}. Your request for ${d.product} is saved. We will reply to ${d.email}.`;
    e.target.reset();
  } catch (err) {
    $("form-msg").textContent = "Could not save the request in this browser. Please email info@redeemindustry.com.";
  }
});
