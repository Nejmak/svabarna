/* ============================================================
   ŠVÁBÁRNA — app.js
   Struktura:
   1.  Konfigurace & API vrstva (připraveno pro DB napojení)
   2.  Demo data (nahradit API voláními po napojení DB)
   3.  State
   4.  API helpers
   5.  Shop — produkty & filtrování
   6.  Product detail modal
   7.  Košík
   8.  Checkout
   9.  Kontaktní formulář
   10. Admin — inicializace & navigace
   11. Admin — Dashboard
   12. Admin — Produkty (CRUD)
   13. Admin — Objednávky
   14. Admin — Zásoby
   15. Admin — Zákazníci
   16. Admin — Nastavení / API
   17. Utility (notify, helpers)
   18. Init
   ============================================================ */

/* ============================================================
   1. KONFIGURACE & API VRSTVA
   Po napojení DB stačí vyplnit API_BASE a API_TOKEN a přepnout
   USE_MOCK_DATA na false. Všechny funkce poté volají backend.
   ============================================================ */
const CONFIG = {
  API_BASE:      '',          // např. 'https://api.svabarna.cz/v1'
  API_TOKEN:     '',          // Bearer token
  USE_MOCK_DATA: true,        // true = offline demo, false = live API
  LOW_STOCK_THRESHOLD: 10,
  CURRENCY: 'Kč',
};

/**
 * Generická fetch funkce — centrální místo pro API volání.
 * Až bude DB ready, implementace zůstane stejná, jen CONFIG.USE_MOCK_DATA = false.
 */
async function apiCall(method, endpoint, body = null) {
  if (CONFIG.USE_MOCK_DATA) {
    // V demo režimu rovnou vrátí lokální data — viz sekce 4.
    return mockApiRouter(method, endpoint, body);
  }
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(CONFIG.API_TOKEN ? { 'Authorization': `Bearer ${CONFIG.API_TOKEN}` } : {}),
    },
  };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(CONFIG.API_BASE + endpoint, options);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

/* ============================================================
   2. DEMO DATA (nahradit API po napojení DB)
   ============================================================ */
let products = [
  { id: 1, name: 'Šváb argentinský malý',    latin: 'Blaptica dubia',            category: 'dubia',      price: 2,    stock: 500, minOrder: 20,  emoji: '🪳', featured: true,  tags: ['krmivo','živorodý','dubia'],          desc: 'Nejoblíbenější krmný šváb — velikost 1,5–2,5 cm. Neleze po skle. Ideální krmivo pro agamy, chameleony i pavouky. Prodej od 20 ks.' },
  { id: 2, name: 'Šváb argentinský velký',   latin: 'Blaptica dubia',            category: 'dubia',      price: 3,    stock: 300, minOrder: 10,  emoji: '🪳', featured: false, tags: ['krmivo','živorodý','dubia','velký'],   desc: 'Větší exempláře 3–4 cm. Ideální pro větší terarijní zvířata — varani, krajty. Neleze po hladkém plastu.' },
  { id: 3, name: 'Šváb turkestánský',        latin: 'Shelfordella tartara',      category: 'turkestan',  price: 2,    stock: 200, minOrder: 20,  emoji: '🟠', featured: false, tags: ['krmivo','rychlý','terrarium'],         desc: 'Rychlý, aktivní druh. Výborné krmivo pro agamy a chameleony. Neleze po skle, snáší nižší teploty.' },
  { id: 4, name: 'Šváb madagaskarský syčivý',latin: 'Gromphadorhina portentosa', category: 'madagaskar', price: 45,   stock: 15,  minOrder: 1,   emoji: '🟤', featured: true,  tags: ['terrarium','sběratel','syčivý'],       desc: 'Impozantní šváb syčící při ohrožení. Oblíbený terarijní druh, žije 3–5 let. Vhodný pro začátečníky.' },
  { id: 5, name: 'Šváb smrtihlav',           latin: 'Blaberus craniifer',        category: 'exoticky',   price: 35,   stock: 8,   minOrder: 1,   emoji: '💀', featured: false, tags: ['sběratel','vzácný','exot'],            desc: 'Vzácný exotický druh se smrtihlávím vzorem na štítu. Pro zkušené chovatele a sběratele.' },
  { id: 6, name: 'Šváb šedý',                latin: 'Nauphoeta cinerea',         category: 'turkestan',  price: 2,    stock: 0,   minOrder: 30,  emoji: '⚫', featured: false, tags: ['krmivo','pavouci','mravenci'],          desc: 'Menší aktivní šváb — skvělý jako krmivo pro pavouky a mravence. Aktuálně vyprodáno.' },
  { id: 7, name: 'Šváb tropický zlatý',      latin: 'Eublaberus posticus',       category: 'exoticky',   price: 40,   stock: 5,   minOrder: 1,   emoji: '🟡', featured: false, tags: ['terrarium','sběratel','exot','zlatý'],  desc: 'Překrásné zlatavé zbarvení. Ideální pro expoziční terárium nebo výstavy.' },
  { id: 8, name: 'Šváb dubový mix',          latin: 'Blaptica dubia mix',        category: 'dubia',      price: 2,    stock: 150, minOrder: 50,  emoji: '🪳', featured: false, tags: ['krmivo','mix','výhodné'],              desc: 'Mix velikostí — vhodný pro různorodé krmení. Výhodné balení pro pravidelné chovatele.' },
];

let orders = [
  { id: '#1047', customer: 'Jan Novák',         email: 'jan@email.cz',    phone: '+420 777 001 001', address: 'Nám. Republiky 1, 500 02 HK',    items: 'Šváb argentinský velký ×50',            total: 150,  shipping: 89,  status: 'new',        date: '2026-03-22', note: '' },
  { id: '#1046', customer: 'Petra Svobodová',    email: 'petra@email.cz',  phone: '+420 777 002 002', address: 'Dlouhá 15, 500 03 HK',             items: 'Šváb madagaskarský ×3',                 total: 135,  shipping: 89,  status: 'processing', date: '2026-03-21', note: 'Prosím opatrně s balením' },
  { id: '#1045', customer: 'Marek Dvořák',       email: 'marek@email.cz',  phone: '+420 777 003 003', address: 'Štefánikova 8, 547 01 Náchod',     items: 'Šváb smrtihlav ×2',                     total: 70,   shipping: 120, status: 'shipped',    date: '2026-03-20', note: '' },
  { id: '#1044', customer: 'Eva Procházková',    email: 'eva@email.cz',    phone: '+420 777 004 004', address: 'Husova 3, 543 01 Vrchlabí',         items: 'Šváb turkestánský ×100',                total: 200,  shipping: 89,  status: 'done',       date: '2026-03-19', note: '' },
  { id: '#1043', customer: 'Tomáš Krejčí',       email: 'tomas@email.cz',  phone: '+420 777 005 005', address: 'Komenského 22, 544 01 Dvůr Králové', items: 'Šváb argentinský malý ×100',           total: 200,  shipping: 89,  status: 'done',       date: '2026-03-18', note: '' },
  { id: '#1042', customer: 'Lucie Marková',      email: 'lucie@email.cz',  phone: '+420 777 006 006', address: 'Riegrovo nám. 5, 500 02 HK',       items: 'Šváb tropický zlatý ×1, Madagaskar ×2', total: 130,  shipping: 0,   status: 'done',       date: '2026-03-15', note: 'Osobní odběr' },
];

const salesData = [420, 680, 390, 810, 540, 760, 620];
const salesDays  = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

/* ============================================================
   3. STATE
   ============================================================ */
let cart             = [];
let cartShipping     = 0;
let currentFilter    = 'all';
let currentSearch    = '';
let currentSort      = 'default';
let editingProductId = null;
let modalQty         = 1;
let orderFilterStatus = 'all';
let orderSearch       = '';

/* ============================================================
   4. MOCK API ROUTER
   Simuluje REST backend — po napojení DB tato funkce odpadne.
   Zachovejte rozhraní (endpoints) — backend by měl odpovídat stejnou strukturou.
   ============================================================ */
function mockApiRouter(method, endpoint, body) {
  // GET /products
  if (method === 'GET' && endpoint === '/products')    return Promise.resolve([...products]);
  // GET /orders
  if (method === 'GET' && endpoint === '/orders')      return Promise.resolve([...orders]);
  // POST /products
  if (method === 'POST' && endpoint === '/products') {
    body.id = Date.now();
    products.push(body);
    return Promise.resolve(body);
  }
  // PUT /products/:id
  if (method === 'PUT' && endpoint.startsWith('/products/')) {
    const id = parseInt(endpoint.split('/')[2]);
    const idx = products.findIndex(p => p.id === id);
    if (idx >= 0) products[idx] = { ...products[idx], ...body };
    return Promise.resolve(products[idx]);
  }
  // DELETE /products/:id
  if (method === 'DELETE' && endpoint.startsWith('/products/')) {
    const id = parseInt(endpoint.split('/')[2]);
    products = products.filter(p => p.id !== id);
    return Promise.resolve({ ok: true });
  }
  // PUT /orders/:id
  if (method === 'PUT' && endpoint.startsWith('/orders/')) {
    const id = endpoint.split('/')[2];
    const o = orders.find(x => x.id === id);
    if (o) Object.assign(o, body);
    return Promise.resolve(o);
  }
  // POST /orders
  if (method === 'POST' && endpoint === '/orders') {
    body.id = '#' + (1047 + orders.length + 1);
    body.date = new Date().toISOString().split('T')[0];
    orders.unshift(body);
    return Promise.resolve(body);
  }
  return Promise.reject(new Error('Unknown endpoint: ' + endpoint));
}

/* ============================================================
   5. SHOP — PRODUKTY & FILTROVÁNÍ
   ============================================================ */
function getStockClass(stock) {
  if (stock === 0)                              return ['out-stock', 'Vyprodáno'];
  if (stock <= CONFIG.LOW_STOCK_THRESHOLD)      return ['low-stock', `Poslední ${stock} ks`];
  return ['in-stock', 'Skladem'];
}

function getFilteredProducts() {
  let list = [...products];
  if (currentFilter !== 'all') list = list.filter(p => p.category === currentFilter);
  if (currentSearch)           list = list.filter(p =>
    p.name.toLowerCase().includes(currentSearch)   ||
    p.latin.toLowerCase().includes(currentSearch)  ||
    (p.tags || []).some(t => t.toLowerCase().includes(currentSearch))
  );
  switch (currentSort) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price);    break;
    case 'price-desc': list.sort((a, b) => b.price - a.price);    break;
    case 'name':       list.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'stock':      list.sort((a, b) => b.stock - a.stock);    break;
    default:           list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
  }
  return list;
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  const list = getFilteredProducts();
  if (!list.length) {
    grid.innerHTML = '<div class="no-results">🔍 Žádné produkty neodpovídají filtru.</div>';
    return;
  }
  grid.innerHTML = list.map(p => {
    const [cls, label] = getStockClass(p.stock);
    const tags = (p.tags || []).map(t => `<span class="product-tag">${t}</span>`).join('');
    return `
      <div class="product-card ${p.featured ? 'featured' : ''}" onclick="openProductModal(${p.id})">
        <div class="product-img">
          <span>${p.emoji}</span>
          <span class="stock-badge ${cls}">${label}</span>
        </div>
        <div class="product-body">
          <div class="product-category">${p.category}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-latin">${p.latin}</div>
          <div class="product-tags">${tags}</div>
          <div class="product-footer">
            <div class="product-price">
              ${p.price} ${CONFIG.CURRENCY}
              <span>/ ks ${p.minOrder > 1 ? `· min. ${p.minOrder} ks` : ''}</span>
            </div>
            <button class="btn-add" onclick="event.stopPropagation(); addToCart(${p.id}, 1)"
              ${p.stock === 0 ? 'disabled' : ''}>
              ${p.stock === 0 ? 'Vyprodáno' : '+ Košík'}
            </button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function filterProducts(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts();
}

function searchProducts(val) {
  currentSearch = val.toLowerCase().trim();
  renderProducts();
}

function sortProducts(val) {
  currentSort = val;
  renderProducts();
}

/* ============================================================
   6. PRODUCT DETAIL MODAL
   ============================================================ */
function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  modalQty = p.minOrder || 1;
  const [cls, label] = getStockClass(p.stock);
  const tags = (p.tags || []).map(t => `<span class="product-tag">${t}</span>`).join('');

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-emoji">${p.emoji}</div>
    <div class="modal-category">${p.category}</div>
    <div class="modal-name">${p.name}</div>
    <div class="modal-latin">${p.latin}</div>
    <div class="product-tags" style="margin-bottom:1rem">${tags}</div>
    <div class="modal-desc">${p.desc}</div>
    <div class="modal-meta">
      <div class="modal-meta-item">
        <label>Cena za ks</label>
        <strong>${p.price} ${CONFIG.CURRENCY}</strong>
      </div>
      <div class="modal-meta-item">
        <label>Min. objednávka</label>
        <strong>${p.minOrder || 1} ks</strong>
      </div>
      <div class="modal-meta-item">
        <label>Dostupnost</label>
        <strong><span class="status-pill ${cls}">${label}</span></strong>
      </div>
    </div>
    <div class="modal-actions" id="modal-actions">
      ${p.stock > 0 ? `
        <div class="modal-qty">
          <button onclick="changeModalQty(-${p.minOrder || 1}, ${p.minOrder || 1})">−</button>
          <span id="modal-qty-val">${modalQty}</span>
          <button onclick="changeModalQty(${p.minOrder || 1}, ${p.minOrder || 1})">+</button>
        </div>
        <button class="btn-primary" onclick="addToCart(${p.id}, modalQty); closeModal()">
          🛒 Přidat do košíku
        </button>
      ` : `<span class="text-muted">Produkt není momentálně dostupný.</span>`}
    </div>
    <div id="modal-total" style="margin-top:0.8rem;font-size:0.85rem;color:var(--amber);font-weight:700;"></div>
  `;
  updateModalTotal(p);
  document.getElementById('product-modal').classList.add('open');
}

function changeModalQty(delta, min) {
  modalQty = Math.max(min, modalQty + delta);
  const el = document.getElementById('modal-qty-val');
  if (el) el.textContent = modalQty;
  const p = products.find(x => x.id === parseInt(
    document.querySelector('.modal-name') ? null : 0
  ));
  // Re-compute total from current product in modal
  const nameEl = document.querySelector('.modal-name');
  if (!nameEl) return;
  const found = products.find(x => x.name === nameEl.textContent);
  if (found) updateModalTotal(found);
}

function updateModalTotal(p) {
  const el = document.getElementById('modal-total');
  if (el) el.textContent = `Celkem: ${p.price * modalQty} ${CONFIG.CURRENCY} za ${modalQty} ks`;
}

function closeModal() {
  document.getElementById('product-modal').classList.remove('open');
}

function closeProductModal(e) {
  if (e.target.id === 'product-modal') closeModal();
}

/* ============================================================
   7. KOŠÍK
   ============================================================ */
function addToCart(id, qty) {
  const p = products.find(x => x.id === id);
  if (!p || p.stock === 0) return;
  const amount = typeof qty === 'number' ? qty : 1;
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty += amount;
  else cart.push({ ...p, qty: amount });
  updateCartCount();
  notify(`🪳 ${p.name} (${amount} ks) přidán do košíku!`);
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function toggleCart() {
  const ov = document.getElementById('cart-overlay');
  const isOpen = ov.classList.toggle('open');
  if (isOpen) showCartView();
}

function closeCartOutside(e) {
  if (e.target.id === 'cart-overlay') toggleCart();
}

function showCartView() {
  document.getElementById('checkout-form').style.display = 'none';
  document.getElementById('cart-items').style.display = 'block';
  renderCart();
}

function renderCart() {
  const itemsEl   = document.getElementById('cart-items');
  const summaryEl = document.getElementById('cart-summary');
  const actionsEl = document.getElementById('cart-actions');

  if (!cart.length) {
    itemsEl.innerHTML  = '<p style="color:#999;margin:1rem 0">Košík je prázdný.</p>';
    summaryEl.innerHTML = '';
    actionsEl.innerHTML = '';
    return;
  }

  itemsEl.innerHTML = cart.map(i => `
    <div class="cart-item">
      <div class="cart-item-emoji">${i.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${i.name}</div>
        <div class="cart-item-price">${i.price * i.qty} ${CONFIG.CURRENCY} (${i.qty} ks)</div>
      </div>
      <div class="cart-qty">
        <button class="qty-btn" onclick="changeQty(${i.id}, -${i.minOrder || 1})">−</button>
        <span>${i.qty}</span>
        <button class="qty-btn" onclick="changeQty(${i.id}, ${i.minOrder || 1})">+</button>
        <button class="qty-btn" style="color:var(--danger)" onclick="removeFromCart(${i.id})" title="Odebrat">✕</button>
      </div>
    </div>`).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total    = subtotal + cartShipping;

  summaryEl.innerHTML = `
    <div class="cart-summary-row"><span>Mezisoučet</span><span>${subtotal} ${CONFIG.CURRENCY}</span></div>
    <div class="cart-summary-row"><span>Doprava</span><span>${cartShipping === 0 ? 'Zdarma' : cartShipping + ' ' + CONFIG.CURRENCY}</span></div>
    <div class="cart-summary-row total"><span>Celkem</span><span>${total} ${CONFIG.CURRENCY}</span></div>
  `;

  actionsEl.innerHTML = `
    <button class="btn-go-checkout" onclick="goToCheckout()">Pokračovat k objednávce →</button>
  `;
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  const min = item.minOrder || 1;
  item.qty = Math.max(min, item.qty + delta);
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  updateCartCount();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCartCount();
  renderCart();
}

/* ============================================================
   8. CHECKOUT
   ============================================================ */
function goToCheckout() {
  if (!cart.length) return;
  document.getElementById('cart-items').style.display = 'none';
  document.getElementById('cart-summary').style.display = 'none';
  document.getElementById('cart-actions').style.display = 'none';
  document.getElementById('checkout-form').style.display = 'block';
}

function backToCart() {
  document.getElementById('cart-items').style.display = 'block';
  document.getElementById('cart-summary').style.display = 'block';
  document.getElementById('cart-actions').style.display = 'block';
  document.getElementById('checkout-form').style.display = 'none';
}

function updateShipping() {
  const sel = document.getElementById('o-shipping');
  cartShipping = parseInt(sel.value) || 0;
}

async function submitOrder() {
  const name    = document.getElementById('o-name').value.trim();
  const email   = document.getElementById('o-email').value.trim();
  const address = document.getElementById('o-address').value.trim();

  if (!name || !email || !address) {
    notify('⚠️ Vyplňte prosím povinné údaje', 'warn'); return;
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const orderData = {
    customer: name, email,
    phone:    document.getElementById('o-phone').value.trim(),
    address,
    items:    cart.map(i => `${i.name} ×${i.qty}`).join(', '),
    total:    subtotal,
    shipping: cartShipping,
    status:   'new',
    note:     document.getElementById('o-note').value.trim(),
  };

  try {
    await apiCall('POST', '/orders', orderData);
    notify('✅ Objednávka odeslána! Potvrzení posíláme na email.');
    cart = []; cartShipping = 0;
    updateCartCount();
    toggleCart();
  } catch (e) {
    notify('❌ Chyba při odesílání objednávky', 'error');
  }
}

/* ============================================================
   9. KONTAKTNÍ FORMULÁŘ
   ============================================================ */
function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById('c-name').value.trim();
  const email = document.getElementById('c-email').value.trim();
  const msg   = document.getElementById('c-msg').value.trim();
  if (!name || !email || !msg) {
    notify('⚠️ Vyplňte prosím všechna pole', 'warn'); return;
  }
  // TODO: POST /contact nebo EmailJS apod.
  notify('✅ Zpráva odeslána! Odpovíme do 24 hodin.');
  e.target.reset();
}

/* ============================================================
   10. ADMIN — INICIALIZACE & NAVIGACE
   ============================================================ */
function openAdmin() {
  document.getElementById('admin').classList.add('open');
  document.getElementById('today-date').textContent = new Date().toLocaleDateString('cs-CZ');
  refreshAllAdminSections();
}

function closeAdmin() {
  document.getElementById('admin').classList.remove('open');
  renderProducts();
}

function showAdminSection(name, el) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  el.classList.add('active');
}

function refreshAllAdminSections() {
  renderAdminDashboard();
  renderProductsTable();
  renderOrdersTable();
  renderStockTable();
  renderCustomersTable();
}

/* ============================================================
   11. ADMIN — DASHBOARD
   ============================================================ */
function renderAdminDashboard() {
  // Stats
  const totalRevenue  = orders.reduce((s, o) => s + o.total + o.shipping, 0);
  const avgOrder      = orders.length ? Math.round(totalRevenue / orders.length) : 0;
  const activeProds   = products.filter(p => p.stock > 0).length;
  const weekOrders    = orders.filter(o => {
    const d = new Date(o.date); const now = new Date();
    return (now - d) / 86400000 <= 7;
  }).length;

  document.getElementById('stat-revenue').textContent     = fmtPrice(totalRevenue);
  document.getElementById('stat-revenue-sub').textContent = `▲ celkem ${orders.length} objednávek`;
  document.getElementById('stat-orders').textContent      = orders.length;
  document.getElementById('stat-orders-sub').textContent  = `▲ ${weekOrders} tento týden`;
  document.getElementById('stat-products').textContent    = activeProds;
  document.getElementById('stat-avg').textContent         = fmtPrice(avgOrder);

  // Bar chart
  const max = Math.max(...salesData, 1);
  document.getElementById('bar-chart').innerHTML = salesData.map((v, i) => `
    <div class="bar-wrap">
      <div class="bar" style="height:${Math.round(v/max*100)}%" data-value="${v} ${CONFIG.CURRENCY}" title="${v} ${CONFIG.CURRENCY}"></div>
      <div class="bar-label">${salesDays[i]}</div>
    </div>`).join('');

  // Category chart
  const cats = {};
  products.forEach(p => { cats[p.category] = (cats[p.category] || 0) + p.stock; });
  const maxCat = Math.max(...Object.values(cats), 1);
  document.getElementById('category-chart').innerHTML = Object.entries(cats).map(([k, v]) => `
    <div class="cat-bar-row">
      <div class="cat-bar-label">${k}</div>
      <div class="cat-bar-track">
        <div class="cat-bar-fill" style="width:${Math.round(v/maxCat*100)}%"></div>
      </div>
      <div class="cat-bar-count">${v} ks</div>
    </div>`).join('');

  // Recent orders table
  document.getElementById('recent-orders-table').innerHTML =
    `<thead><tr><th>ID</th><th>Zákazník</th><th>Položky</th><th>Celkem</th><th>Stav</th></tr></thead>
     <tbody>${orders.slice(0,5).map(o => `
       <tr>
         <td><strong>${o.id}</strong></td>
         <td>${o.customer}</td>
         <td class="text-muted text-small">${o.items}</td>
         <td class="text-amber">${fmtPrice(o.total + o.shipping)}</td>
         <td><span class="status-pill status-${o.status}">${statusLabel(o.status)}</span></td>
       </tr>`).join('')}
     </tbody>`;
}

/* ============================================================
   12. ADMIN — PRODUKTY (CRUD)
   ============================================================ */
function renderProductsTable(filterVal = '') {
  let list = [...products];
  if (filterVal) list = list.filter(p =>
    p.name.toLowerCase().includes(filterVal) ||
    p.latin.toLowerCase().includes(filterVal)
  );
  document.getElementById('products-table').innerHTML =
    `<thead><tr><th>Produkt</th><th>Kategorie</th><th>Cena</th><th>Sklad</th><th>Min.</th><th>Doporučen</th><th>Akce</th></tr></thead>
     <tbody>${list.map(p => `
       <tr>
         <td>${p.emoji} <strong>${p.name}</strong><br><small class="text-muted">${p.latin}</small></td>
         <td>${p.category}</td>
         <td><strong>${fmtPrice(p.price)}</strong></td>
         <td><span class="status-pill ${p.stock===0?'out-stock':p.stock<=CONFIG.LOW_STOCK_THRESHOLD?'low-stock':'in-stock'}">${p.stock} ks</span></td>
         <td class="text-muted text-small">${p.minOrder || 1} ks</td>
         <td>${p.featured ? '⭐' : '—'}</td>
         <td>
           <button class="btn-icon" onclick="editProduct(${p.id})" title="Upravit">✏️</button>
           <button class="btn-icon" onclick="deleteProduct(${p.id})" title="Smazat">🗑️</button>
         </td>
       </tr>`).join('')}
     </tbody>`;
}

function filterAdminProducts(val) {
  renderProductsTable(val.toLowerCase());
}

function newProduct() {
  editingProductId = null;
  document.getElementById('form-title').textContent = 'Nový produkt';
  ['name','latin','price','stock','desc','emoji','minorder','tags'].forEach(f => {
    const el = document.getElementById('f-' + f);
    if (el) el.value = '';
  });
  document.getElementById('f-featured').checked = false;
  document.getElementById('f-id').value = '';
}

function editProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingProductId = id;
  document.getElementById('form-title').textContent  = 'Upravit produkt';
  document.getElementById('f-name').value            = p.name;
  document.getElementById('f-latin').value           = p.latin;
  document.getElementById('f-category').value        = p.category;
  document.getElementById('f-price').value           = p.price;
  document.getElementById('f-stock').value           = p.stock;
  document.getElementById('f-desc').value            = p.desc;
  document.getElementById('f-emoji').value           = p.emoji;
  document.getElementById('f-minorder').value        = p.minOrder || 1;
  document.getElementById('f-tags').value            = (p.tags || []).join(', ');
  document.getElementById('f-featured').checked      = !!p.featured;
  document.getElementById('f-id').value              = id;
  // Přepnout na záložku produktů
  showAdminSection('products', document.querySelector('[data-section="products"]'));
}

async function saveProduct() {
  const name = document.getElementById('f-name').value.trim();
  if (!name) { notify('⚠️ Vyplňte název produktu', 'warn'); return; }

  const data = {
    name,
    latin:    document.getElementById('f-latin').value.trim(),
    category: document.getElementById('f-category').value,
    price:    parseFloat(document.getElementById('f-price').value) || 0,
    stock:    parseInt(document.getElementById('f-stock').value)   || 0,
    desc:     document.getElementById('f-desc').value.trim(),
    emoji:    document.getElementById('f-emoji').value || '🪳',
    minOrder: parseInt(document.getElementById('f-minorder').value) || 1,
    tags:     document.getElementById('f-tags').value.split(',').map(t => t.trim()).filter(Boolean),
    featured: document.getElementById('f-featured').checked,
  };

  try {
    if (editingProductId) {
      await apiCall('PUT', `/products/${editingProductId}`, data);
      notify('✅ Produkt upraven!');
    } else {
      await apiCall('POST', '/products', data);
      notify('✅ Produkt přidán!');
    }
    renderProductsTable();
    renderStockTable();
    renderAdminDashboard();
    newProduct();
  } catch (e) {
    notify('❌ Chyba při ukládání produktu', 'error');
  }
}

async function deleteProduct(id) {
  if (!confirm('Opravdu smazat tento produkt?')) return;
  try {
    await apiCall('DELETE', `/products/${id}`);
    renderProductsTable();
    renderStockTable();
    renderAdminDashboard();
    notify('🗑️ Produkt smazán');
  } catch (e) {
    notify('❌ Chyba při mazání', 'error');
  }
}

/* ============================================================
   13. ADMIN — OBJEDNÁVKY
   ============================================================ */
function renderOrdersTable() {
  let list = [...orders];
  if (orderFilterStatus !== 'all') list = list.filter(o => o.status === orderFilterStatus);
  if (orderSearch) list = list.filter(o =>
    o.customer.toLowerCase().includes(orderSearch) ||
    o.id.toLowerCase().includes(orderSearch)
  );
  document.getElementById('orders-table').innerHTML =
    `<thead><tr><th>ID</th><th>Zákazník</th><th>Kontakt</th><th>Položky</th><th>Celkem</th><th>Datum</th><th>Stav</th><th>Poznámka</th></tr></thead>
     <tbody>${list.map(o => `
       <tr>
         <td><strong>${o.id}</strong></td>
         <td>${o.customer}</td>
         <td class="text-muted text-small">${o.email}<br>${o.phone || ''}</td>
         <td class="text-muted text-small" style="max-width:180px">${o.items}</td>
         <td class="text-amber"><strong>${fmtPrice(o.total + o.shipping)}</strong>
           <br><small class="text-muted">doprava: ${o.shipping ? fmtPrice(o.shipping) : 'zdarma'}</small>
         </td>
         <td class="text-muted text-small">${o.date}</td>
         <td>
           <select class="sort-select" style="font-size:0.78rem" onchange="updateOrderStatus('${o.id}', this.value)">
             ${['new','processing','shipped','done','cancelled'].map(s =>
               `<option value="${s}" ${o.status===s?'selected':''}>${statusLabel(s)}</option>`
             ).join('')}
           </select>
         </td>
         <td class="text-muted text-small">${o.note || '—'}</td>
       </tr>`).join('')}
     </tbody>`;
}

function filterOrders(status) {
  orderFilterStatus = status;
  renderOrdersTable();
}

function searchOrders(val) {
  orderSearch = val.toLowerCase().trim();
  renderOrdersTable();
}

async function updateOrderStatus(id, status) {
  try {
    await apiCall('PUT', `/orders/${id}`, { status });
    renderOrdersTable();
    renderAdminDashboard();
    notify(`✅ Objednávka ${id} → ${statusLabel(status)}`);
  } catch (e) {
    notify('❌ Chyba aktualizace stavu', 'error');
  }
}

/* ============================================================
   14. ADMIN — ZÁSOBY
   ============================================================ */
function renderStockTable() {
  // Alerty pro nízké zásoby
  const alertsEl = document.getElementById('stock-alerts');
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= CONFIG.LOW_STOCK_THRESHOLD);
  const outStock = products.filter(p => p.stock === 0);
  let alerts = '';
  outStock.forEach(p => {
    alerts += `<div class="stock-alert danger">🔴 <strong>${p.name}</strong> — VYPRODÁNO</div>`;
  });
  lowStock.forEach(p => {
    alerts += `<div class="stock-alert">⚠️ <strong>${p.name}</strong> — pouze ${p.stock} ks na skladě</div>`;
  });
  if (alertsEl) alertsEl.innerHTML = alerts;

  document.getElementById('stock-table').innerHTML =
    `<thead><tr><th>Produkt</th><th>Kategorie</th><th>Cena (${CONFIG.CURRENCY}/ks)</th><th>Zásoby (ks)</th><th>Min. objednávka</th><th>Uložit</th></tr></thead>
     <tbody>${products.map(p => `
       <tr>
         <td>${p.emoji} <strong>${p.name}</strong><br><small class="text-muted">${p.latin}</small></td>
         <td class="text-muted">${p.category}</td>
         <td><input type="number" step="0.5" value="${p.price}"   id="sp-price-${p.id}"  class="form-input" style="width:90px"></td>
         <td><input type="number"            value="${p.stock}"   id="sp-stock-${p.id}"  class="form-input" style="width:85px"></td>
         <td><input type="number"            value="${p.minOrder || 1}" id="sp-min-${p.id}" class="form-input" style="width:75px"></td>
         <td><button class="btn-save" style="width:auto;padding:0.4rem 1rem" onclick="saveStock(${p.id})">Uložit</button></td>
       </tr>`).join('')}
     </tbody>`;
}

async function saveStock(id) {
  const p = products.find(x => x.id === id);
  const newPrice = parseFloat(document.getElementById(`sp-price-${id}`).value);
  const newStock = parseInt(document.getElementById(`sp-stock-${id}`).value);
  const newMin   = parseInt(document.getElementById(`sp-min-${id}`).value);
  const data     = { price: newPrice || p.price, stock: newStock || 0, minOrder: newMin || 1 };
  try {
    await apiCall('PUT', `/products/${id}`, data);
    notify(`✅ ${p.name} — uloženo`);
    renderProductsTable();
    renderAdminDashboard();
    renderStockTable();
  } catch (e) {
    notify('❌ Chyba při ukládání', 'error');
  }
}

function exportStock() {
  const header = ['ID','Název','Latinský název','Kategorie','Cena','Zásoby','Min. obj.'];
  const rows   = products.map(p => [p.id, p.name, p.latin, p.category, p.price, p.stock, p.minOrder || 1]);
  const csv    = [header, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const blob   = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url    = URL.createObjectURL(blob);
  const a      = Object.assign(document.createElement('a'), { href: url, download: 'svabarna-zasoby.csv' });
  a.click(); URL.revokeObjectURL(url);
  notify('📥 Export CSV stažen');
}

/* ============================================================
   15. ADMIN — ZÁKAZNÍCI
   ============================================================ */
function getCustomers() {
  const map = {};
  orders.forEach(o => {
    if (!map[o.email]) map[o.email] = { name: o.customer, email: o.email, phone: o.phone || '', orders: 0, total: 0 };
    map[o.email].orders++;
    map[o.email].total += o.total + o.shipping;
  });
  return Object.values(map);
}

function renderCustomersTable(filterVal = '') {
  let list = getCustomers();
  if (filterVal) list = list.filter(c =>
    c.name.toLowerCase().includes(filterVal) ||
    c.email.toLowerCase().includes(filterVal)
  );
  list.sort((a, b) => b.total - a.total); // seřadit dle tržeb

  document.getElementById('customers-table').innerHTML =
    `<thead><tr><th>Zákazník</th><th>E-mail</th><th>Telefon</th><th>Počet objednávek</th><th>Celkem utraceno</th></tr></thead>
     <tbody>${list.map(c => `
       <tr>
         <td><strong>${c.name}</strong></td>
         <td class="text-muted">${c.email}</td>
         <td class="text-muted">${c.phone || '—'}</td>
         <td>${c.orders}×</td>
         <td class="text-amber"><strong>${fmtPrice(c.total)}</strong></td>
       </tr>`).join('')}
     </tbody>`;
}

function searchCustomers(val) {
  renderCustomersTable(val.toLowerCase().trim());
}

/* ============================================================
   16. ADMIN — NASTAVENÍ / API
   ============================================================ */
async function saveApiSettings() {
  const url   = document.getElementById('api-url').value.trim();
  const token = document.getElementById('api-token').value.trim();
  const el    = document.getElementById('api-status');

  if (!url) { el.textContent = '⚠️ Zadejte URL'; return; }
  el.textContent = '⏳ Testuji připojení…';

  try {
    const res = await fetch(url + '/health', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (res.ok) {
      CONFIG.API_BASE  = url;
      CONFIG.API_TOKEN = token;
      CONFIG.USE_MOCK_DATA = false;
      el.textContent = '✅ Připojení úspěšné! API aktivní.';
      el.style.color = 'var(--leaf)';
      notify('✅ API připojeno — přepínám na live data');
    } else {
      el.textContent = `❌ Server odpověděl kódem ${res.status}`;
      el.style.color = 'var(--danger)';
    }
  } catch {
    el.textContent = '❌ Nepodařilo se připojit k API. Zůstávám v demo režimu.';
    el.style.color = 'var(--danger)';
  }
}

/* ============================================================
   17. UTILITY
   ============================================================ */
function fmtPrice(val) {
  return val + ' ' + CONFIG.CURRENCY;
}

function statusLabel(s) {
  return { new: 'Nová', processing: 'Zpracovává', shipped: 'Odesláno', done: 'Dokončeno', cancelled: 'Zrušeno' }[s] || s;
}

let notifTimer = null;
function notify(msg, type = 'success') {
  const el = document.getElementById('notif');
  el.textContent = msg;
  el.className   = 'notif show' + (type !== 'success' ? ' ' + type : '');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

/* ============================================================
   18. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  // Klávesnice ESC zavře modaly
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      if (document.getElementById('cart-overlay').classList.contains('open')) toggleCart();
      if (document.getElementById('admin').classList.contains('open'))        closeAdmin();
    }
  });
});
