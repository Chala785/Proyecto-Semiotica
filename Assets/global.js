document.addEventListener("DOMContentLoaded", () => {

    // Navbar
    fetch("/Components/navbar.html")
        .then(response => response.text())
        .then(data => {

            document.getElementById("navbar").innerHTML = data;

            // Activar menú hamburguesa después de cargar el navbar
            const menuToggle = document.getElementById("menu-toggle");
            const navMenu = document.getElementById("nav-menu");

            if (menuToggle && navMenu) {
                menuToggle.addEventListener("click", () => {
                    navMenu.classList.toggle("active");
                });
            }

            // ← AGREGA ESTO: ahora que el navbar ya existe en el DOM
            actualizarContador();
        });

    // Footer
    fetch("/Components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

});