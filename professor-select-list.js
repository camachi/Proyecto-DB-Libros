const { ipcRenderer } = require('electron');

// Función para cargar los profesores en el <select>
async function cargarProfesoresEnSelect() {
    try {
        // Obtener la lista de profesores desde el backend
        const profesores = await ipcRenderer.invoke('obtener-profesores');

        // Buscar el elemento <select> en el DOM
        const selectElement = document.getElementById('opciones');

        // Limpiar cualquier opción previa
        selectElement.innerHTML = '<option value="" disabled selected>Seleccione profesor...</option>';
        // Crear opciones dinámicamente basadas en los profesores
        profesores.forEach(profesor => {
            const option = document.createElement('option');
            option.value = profesor.idprofesores; // Asignar el ID como valor
            option.textContent = profesor.nombre; // Mostrar el nombre como texto
            selectElement.appendChild(option); // Agregar la opción al <select>
        });
    } catch (error) {
        console.error('Error al cargar los profesores en el select:', error);
    }
}

// Llamar a la función para cargar los profesores al cargar la página
window.onload = cargarProfesoresEnSelect;
