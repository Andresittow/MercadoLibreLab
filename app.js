// app.js

// Productos demo (puedes agregar más)
const products = [
  { id: 1, name: "Celular Samsung Galaxy", brand: "Samsung", price: 1200000, shipping: true, img: "producto1.jpg" },
  { id: 2, name: "Audífonos Bluetooth", brand: "Xiaomi", price: 150000, shipping: true, img: "producto2.jpg" },
  { id: 3, name: "iPhone 13 128GB", brand: "Apple", price: 2500000, shipping: true, img: "producto1.jpg" },
  { id: 4, name: "Samsung Buds Pro", brand: "Samsung", price: 320000, shipping: false, img: "producto2.jpg" },
];

// Helpers
const formatCOP = (value) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);

document.addEventListener("DOMContentLoaded", () => {
  const inputSearch = document.querySelector(".search-bar input");
  const btnSearch = document.querySelector(".search-bar button");

  const rangePrice = document.querySelector(".filters input[type='range']");
  const selectBrand = document.querySelector(".filters select");

  const resultsHeader = document.querySelector(".search-results");
  const productList = document.querySelector(".product-list");

  // Si no existe, no rompas la página
  if (!inputSearch || !rangePrice || !selectBrand || !productList || !resultsHeader) return;

  // Configurar rango de precios automáticamente según productos
  const maxPrice = Math.max(...products.map(p => p.price));
  rangePrice.min = 0;
  rangePrice.max = maxPrice;
  rangePrice.value = maxPrice;

  // Crear "range meta" debajo del range (si no existe)
  let meta = document.querySelector(".filters .range-meta");
  if (!meta) {
    meta = document.createElement("div");
    meta.className = "range-meta";
    meta.innerHTML = `<span id="minPrice">${formatCOP(0)}</span><span id="maxPrice">${formatCOP(maxPrice)}</span>`;
    rangePrice.insertAdjacentElement("afterend", meta);
  }

  const maxPriceEl = meta.querySelector("#maxPrice");

  function render(list) {
    productList.innerHTML = list.map(p => `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">${formatCOP(p.price)}</p>
        <p class="shipping">${p.shipping ? "Envío gratis" : "Envío con costo"}</p>
        <button data-id="${p.id}">Ver producto</button>
      </div>
    `).join("");

    // Actualizar header
    const q = inputSearch.value.trim();
    const b = selectBrand.value;
    const priceTop = Number(rangePrice.value);

    resultsHeader.innerHTML = `
      <h2>Resultados de búsqueda</h2>
      <div class="subtitle">
        ${list.length} resultado(s)
        ${q ? `• búsqueda: <b>${q}</b>` : ""}
        ${b ? `• marca: <b>${b}</b>` : ""}
        • hasta: <b>${formatCOP(priceTop)}</b>
      </div>
    `;

    // Botón ver producto (demo)
    productList.querySelectorAll("button[data-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const prod = products.find(x => x.id === id);
        alert(`Producto: ${prod.name}\nPrecio: ${formatCOP(prod.price)}\nMarca: ${prod.brand}`);
      });
    });
  }

  function applyFilters() {
    const query = inputSearch.value.trim().toLowerCase();
    const brand = selectBrand.value;
    const priceLimit = Number(rangePrice.value);

    if (maxPriceEl) maxPriceEl.textContent = formatCOP(priceLimit);

    const filtered = products.filter(p => {
      const matchQuery = !query || p.name.toLowerCase().includes(query);
      const matchBrand = !brand || p.brand === brand; // si quieres opción "Todas", lo hacemos
      const matchPrice = p.price <= priceLimit;
      return matchQuery && matchBrand && matchPrice;
    });

    render(filtered);
  }

  // UX: buscar al escribir
  inputSearch.addEventListener("input", applyFilters);

  // Botón buscar (por si lo quieren usar)
  btnSearch.addEventListener("click", applyFilters);

  // Filtros
  rangePrice.addEventListener("input", applyFilters);
  selectBrand.addEventListener("change", applyFilters);

  // Inicial
  applyFilters();
});