// CREAR EL PANEL EN EL DOM
const carritoHTML = `
<div id="carrito-overlay" onclick="cerrarCarrito()"></div>

<div id="carrito-panel">
    <div class="carrito-header">
        <h2><i class="fa-solid fa-cart-shopping"></i> Mi carrito</h2>
        <button onclick="cerrarCarrito()" class="carrito-cerrar">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div id="carrito-lista"></div>
    <div id="carrito-footer" style="display:none;">
        <button class="btn-wsp-carrito" onclick="enviarWhatsApp()">
            <i class="fa-brands fa-whatsapp"></i> Consultar por WhatsApp
        </button>
    </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', carritoHTML);

// ─── FUNCIONES ───────────────────────────────────────────────────────────────
function abrirCarrito() {
    renderCarrito();
    document.getElementById('carrito-panel').classList.add('abierto');
    document.getElementById('carrito-overlay').classList.add('activo');
    document.body.style.overflow = 'hidden';
}

function cerrarCarrito() {
    document.getElementById('carrito-panel').classList.remove('abierto');
    document.getElementById('carrito-overlay').classList.remove('activo');
    document.body.style.overflow = '';
}

function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const lista = document.getElementById('carrito-lista');
    const footer = document.getElementById('carrito-footer');

    actualizarContador();

    if (carrito.length === 0) {
        lista.innerHTML = `
            <div class="carrito-vacio">
                <i class="fa-solid fa-house-circle-xmark"></i>
                <p>No tienes propiedades en tu carrito.</p>
            </div>`;
        footer.style.display = 'none';
        return;
    }

    lista.innerHTML = carrito.map((p, i) => `
        <div class="carrito-item">
            <img src="${p.img}" alt="${p.titulo}">
            <div class="carrito-item-info">
                <p class="ci-titulo">${p.titulo}</p>
                <p class="ci-precio">${p.precio}</p>
                <p class="ci-ciudad"><i class="fa-solid fa-location-dot"></i> ${p.ciudad}</p>
            </div>
            <button class="ci-eliminar" onclick="eliminarDelCarrito(${i})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    footer.style.display = 'block';
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

function enviarWhatsApp() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) return;

    const mensaje = carrito.map((p, i) =>
        `${i + 1}. ${p.titulo} — ${p.precio} (${p.ciudad})`
    ).join('\n');

    const texto = encodeURIComponent(
        `Hola! Estoy interesado en las siguientes propiedades:\n\n${mensaje}\n\n¿Me pueden dar más información?`
    );

    window.open(`https://wa.me/+573103989930?text=${texto}`, '_blank');
}

function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('carrito-contador');
    if (!contador) return;
    contador.textContent = carrito.length;
    contador.style.display = carrito.length > 0 ? 'flex' : 'none';
}

// Actualizar contador al cargar cualquier página
document.addEventListener('DOMContentLoaded', actualizarContador);