console.log("Script cargado correctamente.");

// Guardado local en el navegador con localStorage

const datosGuardados = localStorage.getItem('usuarios');
let usuarios;
let idUsuario = 0;
if (datosGuardados) {
    usuarios = new Map(JSON.parse(datosGuardados));
    idUsuario = usuarios.size;
} else {
    usuarios = new Map();
}


// Botón "Añadir Dispositivo" en el registro de usuario

document.addEventListener("DOMContentLoaded", () => {
    const addDeviceBtn = document.getElementById("addDevice");
    const dispositivosDiv = document.getElementById("dispositivos");

    if (addDeviceBtn && dispositivosDiv) {
        addDeviceBtn.addEventListener("click", () => {
            const deviceContainer = document.createElement("div");
            deviceContainer.classList.add("device");

            deviceContainer.innerHTML = `
        <label>Tipo de Dispositivo</label>
        <select class="device-type">
          <option value="">Seleccione...</option>
          <option value="Smartwatch">Smartwatch</option>
          <option value="Banda Deportiva">Banda Deportiva</option>
          <option value="Ciclocomputador">Ciclocomputador</option>
          <option value="Audífonos">Audífonos</option>
        </select>

        <label>Número de Serie</label>
        <input type="text" class="device-serial" placeholder="Ej: ABCDEFGHIJKL">

        <button type="button" class="removeDevice">Eliminar</button>
      `;

            dispositivosDiv.appendChild(deviceContainer);

            // Botón eliminar
            deviceContainer.querySelector(".removeDevice").addEventListener("click", () => {
                dispositivosDiv.removeChild(deviceContainer);
            });
        });
    }
});



// Validación del registro de usuario

const inputNombre = document.getElementById('nombre');
const inputCorreo = document.getElementById('correo');
const inputContrasena = document.getElementById('password');
const inputConfirmContrasena = document.getElementById('confirmPassword');
const inputTelefono = document.getElementById('telefono');

const formRegistro = document.getElementById('registroForm');


function validarCampos() {
    // trim() quita los espacios en los extremos del texto
    let nombreCompleto = inputNombre.value.trim();
    let correo = inputCorreo.value.trim();
    let contrasena = inputContrasena.value.trim();
    let confirmarContrasena = inputConfirmContrasena.value.trim();
    let telefono = inputTelefono.value.trim();

    // Nombre:
    if (nombreCompleto === "") {
        alert("El nombre no puede estar vacío.");
        return false;
    }

    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ\s]+$/;
    if (!regexNombre.test(nombreCompleto)) {
        alert("El nombre solo puede contener letras y espacios.")
        return false;
    }

    if (nombreCompleto.length > 80) {
        alert("El nombre no puede superar los 80 caracteres.")
        return false;
    }

    // Correo:
    // La 'i' final valida el correo escrito en mayúsculas o minúsculas 
    const regexCorreo = /^[a-zñ]+@duoc\.cl$/i;
    const regexCorreoProfes = /^[a-zñ]+@profesor\.duoc\.cl$/i;
    // Si no es duoc.cl NI profesor.duoc.cl, se detiene
    if (!regexCorreo.test(correo) && !regexCorreoProfes.test(correo)) {
        alert("El correo ingresado no es válido.");
        return false;
    }

    // Determinamos si el correo existe
    let correoExistente = false
    // Estructura del forEach para los mapas: (valor, clave) => {}
    // Usamos solo el valor
    usuarios.forEach((datosUsuario) => {
        // [1] corresponde al correo en el Array
        if (datosUsuario[1] === correo) {
            correoExistente = true;
        }
    })

    // Si existe, se detiene
    if (correoExistente) {
        alert("El correo ya se encuentra registrado. Pruebe con uno diferente.");
        return false;
    }

    if (correo.length > 60) {
        alert("El correo no puede superar los 60 caracteres.")
        return false;
    }

    // COntraseña:
    const regexContra = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regexContra.test(contrasena)) {
        alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.");
        return false;
    }

    // Validar la contraseña:
    if (confirmarContrasena !== contrasena) {
        alert("Las contraseñas no coinciden.")
        return false;
    }

    // Teléfono (opcional):
    if (telefono !== "") {
        
        const regexTelefono = /^[0-9\s]{9,11}$/;
        if (!regexTelefono.test(telefono)) {
            alert("El teléfono ingresado no es válido. Debe tener exactamente 9 dígitos sin código de país.");
            return false;
            // +56 9 1234 5678: False
            // +56912345678: False

            // 912345678: True

            // 12345678: False
        }
    }
    return true;
}



// Validación de los dispositivos del usuario (opcional)

function validarDispositivos() {
    // Guardamos todos los elementos de la clase '.device'
    let listaDispositivos = document.querySelectorAll('#dispositivos .device');

    // Aquí se guardarán los dispositivos que pasen la validación
    // Para registrarlos finalmente
    let serialesUsuario = new Map(); // (clave, valor) -> (serial, tipo)

    // Verificaremos si algún dispositivo está duplicado
    let posicionesSeriales = new Map(); // (serial, número de dispositivo)


    // Si hay dispositivos:
    if (listaDispositivos.length > 0) {

        const regexSerial = /^[a-zA-Z]{12}$/;

        // Primero iteramos en los dispositivos del registro del usuario
        for (let i = 0; i < listaDispositivos.length; i++) {
            
            // Cada uno de los dispositivos (cambiando 'i')
            const tipo = listaDispositivos[i].querySelector('.device-type').value;
            const numeroSerie = listaDispositivos[i].querySelector('.device-serial').value.trim();
            const serialMayuscula = numeroSerie.toUpperCase();

            const numDisp = i + 1; // Para mostrar el número de dispositivo en el alert

            if (tipo === "") {
                alert(`Debe seleccionar un tipo de dispositivo en el dispositivo #${numDisp}.`);
                return false;
            }

            if (numeroSerie === "") {
                alert(`Debe ingresar un número de serie en el dispositivo #${numDisp}.`);
                return false;
            }

            if (!regexSerial.test(numeroSerie)) {
                alert(`El número de serie en el dispositivo #${numDisp} no es válido. Debe tener exactamente 12 letras.`);
                return false;
            }


            // Validamos que no se repitan los números de serie entre los dispositivos que añadió el ususario
            if (serialesUsuario.has(serialMayuscula)) {
                // Se obtiene el valor del serial, el cual es el número de dispositivo
                const dispositivoAnterior = posicionesSeriales.get(serialMayuscula);
                
                alert(`El dispositivo #${numDisp} tiene el mismo número de serie que el dispositivo #${dispositivoAnterior}.`);
                return false;
            }


            // Ahora validaremos que no se repitan los números de serie en la BD simulada (Map de usuarios)
            let serialExistente = false;

            usuarios.forEach((datosUsuario) => {
                // [4] corresponde al Map de dispositivos en el Array
                let dispositivosUsuarios = datosUsuario[4];

                if (dispositivosUsuarios) {
                    // Clonamos el Map para validar si hay duplicados en el registro general
                    const mapRegistrados = new Map(dispositivosUsuarios);
                    if (mapRegistrados.has(serialMayuscula)) {
                        serialExistente = true;
                    }
                }
            });

            if (serialExistente) {
                alert(`El número de serie ${numeroSerie} ya está vinculado a otra cuenta.`)
                return false;
            }

            // 'numDisp' es el número que va aumentando para mostrarlo en el alert
            posicionesSeriales.set(serialMayuscula, numDisp);
            serialesUsuario.set(serialMayuscula, tipo); // Guardamos el serial y el tipo en el Map
        }
    }

    return serialesUsuario;
}


if (formRegistro) {
    formRegistro.addEventListener('submit', (evento) => {
        
        evento.preventDefault(); // Evita que el formulario se envíe automáticamente
        
        // Si los datos pasan las validaciones:
        if (validarCampos()) {

            // Recibimos el Map
            const dispositivos = validarDispositivos();

            if (dispositivos === false) {
                return; // Se detiene el 'submit' del <form> si alguna validación da 'false'
            }

            idUsuario++;

            usuarios.set(idUsuario, [
                inputNombre.value.trim(),
                inputCorreo.value.trim(),
                inputContrasena.value.trim(),
                inputTelefono.value.trim(),
                // Resultado: [[serial1, tipo1], [serial2, dispositivo2], ...]
                Array.from(dispositivos.entries())
            ]);

            // Guardamos en localStorage, nuevamente con Array.from()
            localStorage.setItem('usuarios', JSON.stringify(Array.from(usuarios.entries())));

            console.log(`Usuario registrado con éxito: ${usuarios.get(idUsuario)}`);
            alert("¡Registro exitoso!");

            // Guardamos otro localStorage con el nombre del usuario como valor
            // Formato de la función setItem(clave, valor)
            localStorage.setItem('usuarioActual', inputNombre.value.trim());

            window.location.href = "inicio-logout.html";
        }
    });
}



// Validación del inicio de sesión

const formLogin = document.getElementById('loginForm');

function validarSesion() {
    let correoIngresado = inputCorreo.value.trim();
    let contrasenaIngresada = inputContrasena.value.trim();
    let usuarioRegistrado = false;
    // Variable para guardar el nombre por fuera
    let nombreUsuarioActual = "";

    usuarios.forEach((datosUsuario) => {
        if (datosUsuario[1] === correoIngresado && datosUsuario[2] === contrasenaIngresada) {
            usuarioRegistrado = true;
            // Se rellena la variable
            nombreUsuarioActual = datosUsuario[0];
        }
    })

    if (usuarioRegistrado) {
        alert("¡Bienvenido al sistema!");

        // Se setea en local
        localStorage.setItem('usuarioActual', nombreUsuarioActual);

        window.location.href = "inicio-logout.html";
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

if (formLogin) {
    formLogin.addEventListener('submit', (evento) => {
        evento.preventDefault();

        validarSesion();
    });
}



// Mostrar el nombre en el Inicio

const spanNombre = document.getElementById('nombreUsuario');

if (spanNombre) {

    // Si no es null, va a insertar el nombre del usuario recién registrado
    // Por la clave y devuelve el valor en la constante
    const usuarioConectado = localStorage.getItem('usuarioActual');

    if (usuarioConectado){
        spanNombre.textContent = usuarioConectado;
    } else {
        alert('Debes iniciar sesión para acceder a esta página.')
        window.location.href = "login.html"
    };
}



// Cerrar sesión completa del usuarioActual

const btnLogout = document.getElementById('btnLogout')

if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('usuarioActual');
        alert('Sesión cerrada correctamente.')
    });
}