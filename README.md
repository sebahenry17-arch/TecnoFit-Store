📌 Uso
Registro (index.html)

Formulario con nombre, correo, contraseña y teléfono.

Botón + Añadir Dispositivo para vincular dispositivos.

Validaciones:

Nombre solo letras y espacios, máx. 80 caracteres.

Correo válido solo @duoc.cl o @profesor.duoc.cl.

Contraseña con mayúscula, minúscula, número y caracter especial.

Teléfono opcional, 9 dígitos.

Los datos se guardan en localStorage.

Login (login.html)

Ingreso de correo y contraseña.

Validación contra usuarios guardados en localStorage.

Si coincide, se guarda la sesión en usuarioActual.

Inicio (inicio.html)

Muestra saludo con el nombre del usuario.

Lista los dispositivos vinculados.

Botón Logout que borra la sesión y redirige al login.

Logout

Elimina usuarioActual de localStorage.

Redirige automáticamente a login.html.

🛠️ Tecnologías
HTML5

CSS3

JavaScript (con uso de localStorage)

Git & GitHub

IDEs: WebStorm y Visual Studio Code (con extensión Antigravity)

📂 Estructura del proyecto
index.html → Registro de usuario

login.html → Inicio de sesión

inicio.html → Página principal con saludo

asset/script.js → Lógica de registro, validaciones, login y logout

asset/estilos.css → Estilos responsivos y diseño visual

🎯 Flujo completo
Registro → crea usuario en localStorage.

Login → valida correo y contraseña.

Inicio → muestra saludo y dispositivos.

Logout → borra sesión y redirige al login.

