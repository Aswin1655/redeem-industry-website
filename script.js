const products = [
  { name: "Biodegradable cups", desc: "Plant-fibre cups for hot and cold drinks.", tag: "Custom print available" },
  { name: "Plates and bowls", desc: "Sturdy disposable tableware that composts after use.", tag: "Bulk packs" },
  { name: "Carry bags", desc: "Strong bags that replace single-use plastic carry bags.", tag: "Custom sizes" },
  { name: "Food containers", desc: "Takeaway boxes with leak-resistant finish.", tag: "Multiple sizes" },
  { name: "Cutlery", desc: "Spoons, forks, and knives made from natural materials.", tag: "Wrapped or loose" },
  { name: "Packaging film", desc: "Wrapping material for retail and industrial use.", tag: "Made to order" }
];

const grid = document.getElementById("product-grid");
const select = document.getElementById("product-select");
products.forEach(p => {
  grid.insertAdjacentHTML("beforeend",
    `<article class="card"><h3>${p.name}</h3><p>${p.desc}</p><span class="tag">${p.tag}</span></article>`);
  select.insertAdjacentHTML("beforeend", `<option>${p.name}</option>`);
});

// Impact calculator. Assumed averages: 5 g plastic per item, 6 kg CO2 per kg plastic.
const GRAMS_PER_ITEM = 5, CO2_PER_KG = 6;
const itemsEl = document.getElementById("items");
const shareEl = document.getElementById("share");
function updateImpact() {
  const items = Math.max(0, Number(itemsEl.value) || 0);
  const share = Number(shareEl.value) / 100;
  const perYear = Math.round(items * share * 12);
  const kg = perYear * GRAMS_PER_ITEM / 1000;
  document.getElementById("share-out").textContent = shareEl.value + "%";
  document.getElementById("r-items").textContent = perYear.toLocaleString("en-IN");
  document.getElementById("r-kg").textContent = Math.round(kg).toLocaleString("en-IN");
  document.getElementById("r-co2").textContent = Math.round(kg * CO2_PER_KG).toLocaleString("en-IN");
}
itemsEl.addEventListener("input", updateImpact);
shareEl.addEventListener("input", updateImpact);
updateImpact();

// Enquiry form: front-end only. Replace with a real backend or form service to send emails.
document.getElementById("enquiry").addEventListener("submit", e => {
  e.preventDefault();
  const name = new FormData(e.target).get("name");
  document.getElementById("form-msg").textContent = `Thanks, ${name}. Your request has been recorded. We will reply by email.`;
  e.target.reset();
});
