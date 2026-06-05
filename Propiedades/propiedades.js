console.log('✅ propiedades.js cargado');

const botones = document.querySelectorAll('.ver-btn');
console.log('🔍 Botones encontrados:', botones.length);

botones.forEach((btn, i) => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('🖱️ Clic en botón', i);

        const card = this.closest('.prop-card');
        console.log('📦 Card encontrada:', card);
        console.log('📝 Datos:', card?.dataset);

        if (!card?.dataset?.titulo) {
            console.warn('⚠️ La tarjeta no tiene data-titulo');
            alert('Tarjeta sin datos configurados.');
            return;
        }

        const datos = {
            titulo:       card.dataset.titulo,
            precio:       card.dataset.precio,
            ciudad:       card.dataset.ciudad,
            img:          card.dataset.img,
            habitaciones: card.dataset.habitaciones,
            banos:        card.dataset.banos,
            area:         card.dataset.area,
            descripcion:  card.dataset.descripcion
        };

        console.log('💾 Guardando en localStorage:', datos);
        localStorage.setItem('propiedadSeleccionada', JSON.stringify(datos));
        window.location.href = '/Propiedades/detalle.html';
    });
});