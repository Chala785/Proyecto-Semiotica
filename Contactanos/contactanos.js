// ─── VALIDACIÓN DEL FORMULARIO DE CONTACTO CON JQUERY ───────────────────────

// jQuery 1: Al cargar el documento, inicializar el formulario
$(document).ready(function () {

    // jQuery 2: Al hacer clic en el botón "Enviar información", validar campos
    $("#btn-enviar").on("click", function () {

        // Limpiar errores previos antes de cada validación
        limpiarErrores();

        let valido = true;

        // Obtener valores de los campos
        const nombres   = $.trim($("#campo-nombres").val());
        const apellidos = $.trim($("#campo-apellidos").val());
        const correo    = $.trim($("#campo-correo").val());
        const telefono  = $.trim($("#campo-telefono").val());
        const mensaje   = $.trim($("#campo-mensaje").val());
        const terminos  = $("#campo-terminos").is(":checked");

        // Validar: Nombres no vacío
        if (nombres === "") {
            mostrarError("#campo-nombres", "El nombre es obligatorio.");
            valido = false;
        }

        // Validar: Apellidos no vacío
        if (apellidos === "") {
            mostrarError("#campo-apellidos", "El apellido es obligatorio.");
            valido = false;
        }

        // Validar: Correo con formato válido (expresión regular)
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo === "") {
            mostrarError("#campo-correo", "El correo es obligatorio.");
            valido = false;
        } else if (!regexCorreo.test(correo)) {
            mostrarError("#campo-correo", "Ingresa un correo válido (ej: nombre@correo.com).");
            valido = false;
        }

        // Validar: Teléfono solo números y mínimo 7 dígitos
        const regexTel = /^[0-9]{7,15}$/;
        if (telefono === "") {
            mostrarError("#campo-telefono", "El teléfono es obligatorio.");
            valido = false;
        } else if (!regexTel.test(telefono)) {
            mostrarError("#campo-telefono", "Solo números, mínimo 7 dígitos.");
            valido = false;
        }

        // Validar: Mensaje no vacío y mínimo 10 caracteres
        if (mensaje === "") {
            mostrarError("#campo-mensaje", "El mensaje es obligatorio.");
            valido = false;
        } else if (mensaje.length < 10) {
            mostrarError("#campo-mensaje", "El mensaje debe tener al menos 10 caracteres.");
            valido = false;
        }

        // Validar: Términos y condiciones aceptados
        if (!terminos) {
            mostrarError("#campo-terminos", "Debes aceptar los términos y condiciones.");
            valido = false;
        }

        // jQuery 3: Si todo es válido, mostrar mensaje de éxito con animación jQuery
        if (valido) {
            $("#form-exito").fadeIn(400);
            // Limpiar el formulario después de enviar
            $("#campo-nombres, #campo-apellidos, #campo-correo, #campo-telefono").val("");
            $("#campo-mensaje").val("");
            $("#campo-terminos").prop("checked", false);

            // Ocultar el mensaje de éxito después de 4 segundos
            setTimeout(function () {
                $("#form-exito").fadeOut(400);
            }, 4000);
        }
    });

    // Quitar error en tiempo real cuando el usuario empieza a escribir
    $(".form-input, .form-textarea").on("input", function () {
        $(this).removeClass("campo-error");
        $(this).next(".error-msg").remove();
    });

});

// ─── FUNCIONES AUXILIARES ────────────────────────────────────────────────────

// Función: mostrar mensaje de error debajo de un campo
function mostrarError(selector, mensaje) {
    $(selector).addClass("campo-error");
    $(selector).after('<span class="error-msg">' + mensaje + '</span>');
}

// Función: limpiar todos los errores del formulario
function limpiarErrores() {
    $(".campo-error").removeClass("campo-error");
    $(".error-msg").remove();
}
