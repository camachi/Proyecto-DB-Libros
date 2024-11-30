const { ipcRenderer } = require('electron');

// Referencias al DOM
const inputBuscar = document.getElementById('input-buscar');
const botonBuscar = document.getElementById('btn-buscar');

// Función para cargar profesores con filtro
async function cargarProfesores(filtro = '') {
    try {
        const profesores = await ipcRenderer.invoke('obtener-profesores', filtro);
        mostrarProfesores(profesores);
    } catch (error) {
        console.error('Error al cargar profesores:', error);
    }
}

// Función para mostrar los profesores en la tabla
function mostrarProfesores(profesores) {
    const cuerpoTabla = document.getElementById('id-render-profesores');
    cuerpoTabla.innerHTML = ''; // Limpiar contenido anterior

    if (profesores.length === 0) {
        cuerpoTabla.innerHTML = '<tr><td colspan="5">No se encontraron profesores</td></tr>';
        return;
    }

    profesores.forEach(profesor => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${profesor.idprofesores}</td>
            <td>${profesor.nombre}</td>
            <td>${profesor.departamento_academico}</td>
            <td><button class="edit_button" data-id="${profesor.idprofesores}" onclick="botonEditarProfesores(this)">Edit</button></td>
            <td><button type="button" class="delete_button" data-id="${profesor.idprofesores}">Delete</button></td>
        `;

        cuerpoTabla.appendChild(fila);
    });
}

// Evento para búsqueda
botonBuscar.addEventListener('click', () => {
    const filtro = inputBuscar.value.trim(); // Capturar el texto del input
    cargarProfesores(filtro); // Llamar a la función con el filtro
});

// Cargar profesores al inicio
cargarProfesores();

// Función para redirigir al editar
function botonEditarProfesores(button) {
    const profesorId = button.dataset.id;
    if (profesorId) {
        localStorage.setItem('profesorId', profesorId);
        window.location.href = 'professor.html';
    } else {
        console.error('No se encontró el ID del profesor');
    }
}
