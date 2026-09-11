console.log("Script cargado correctamente.");

document.addEventListener("DOMContentLoaded", () => {
    const addDeviceBtn = document.getElementById("addDevice");
    const dispositivosDiv = document.getElementById("dispositivos");

    if (addDeviceBtn && dispositivosDiv) {
        addDeviceBtn.addEventListener("click", () => {
            const deviceContainer = document.createElement("div");
            deviceContainer.classList.add("device");

            deviceContainer.innerHTML = `
        <label>Tipo de Dispositivo</label>
        <select>
          <option value="">Seleccione...</option>
          <option value="audifonos">Audífonos</option>
          <option value="smartwatch">Smartwatch</option>
          <option value="banda">Banda Fitness</option>
        </select>

        <label>Número de Serie</label>
        <input type="text" placeholder="Ej: 12345ABC">

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