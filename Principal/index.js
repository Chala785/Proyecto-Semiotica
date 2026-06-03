// MENU HAMBURGUESA
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// TABS HERO
const tabBtns = document.querySelectorAll(".tab-btn");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

// CARRUSEL TESTIMONIOS
(function () {
    const track = document.getElementById('carrusel-track');
    const dotsWrap = document.getElementById('carrusel-dots');
    if (!track) return;

    const cards = track.querySelectorAll('.test-card');
    let current = 0;
    let autoTimer;

    // Crear dots
    cards.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => { goTo(i); resetAuto(); });
        dotsWrap.appendChild(d);
    });

    function goTo(n) {
        current = (n + cards.length) % cards.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
            d.classList.toggle('active', i === current)
        );
    }

    function startAuto() {
        autoTimer = setInterval(() => goTo(current + 1), 5000);
    }

    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }

    document.getElementById('prev').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    document.getElementById('next').addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    startAuto();
})();