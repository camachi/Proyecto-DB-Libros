const { ipcRenderer } = require('electron');

async function cargarProfesores() {
    try {
        const profesores = await ipcRenderer.invoke('obtener-profesores');
        mostrarProfesores(profesores); // Mostrar todos los profesores inicialmente
    } catch (error) {
        console.error('Error al cargar profesores:', error);
    }
}

// Función para mostrar los profesores en la tabla
function mostrarProfesores(profesores) {
    console.log('Profesores obtenidos:');
    const cuerpoTabla = document.getElementById('id-render-profesores-reporte');
    cuerpoTabla.innerHTML = ''; // Limpiar la tabla antes de llenarla

    profesores.forEach(profesor => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${profesor.idprofesores}</td>
            <td>${profesor.nombre}</td>
            <td>${profesor.departamento_academico}</td>
            <td><button class="reporte_button" data-id="${profesor.idprofesores}" data-action="fecha">Reporte</button></td>
            <td><button class="reporte_button" data-id="${profesor.idprofesores}" data-action="todos">Reporte</button></td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    // Agregar eventos a los botones de reporte
    const botonesReporte = document.querySelectorAll('.reporte_button');
    botonesReporte.forEach(boton => {
        boton.addEventListener('click', async (e) => {
            const idProfesor = e.target.getAttribute('data-id');
            const accion = e.target.getAttribute('data-action');
            console.log('Botón presionado para el ID Profesor:', idProfesor, 'Acción:', accion);

            try {
                if (accion === 'fecha') {
                    window.location.href = `reporte-profesor-fecha.html?id=${idProfesor}`;
                } else if (accion === 'todos') {
                    window.location.href = `reporte-profesortodo.html?id=${idProfesor}`;
                }
            } catch (error) {
                console.error('Error en la solicitud al main:', error);
            }
        });
    });
}

// Función para filtrar profesores por nombre, departamento o id (exacto)
function filtrarProfesores(profesores, textoBusqueda) {
    return profesores.filter(profesor => {
        // Buscar por nombre, departamento o id exacto
        return profesor.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
               profesor.departamento_academico.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
               profesor.idprofesores.toString() === textoBusqueda; // Filtro exacto por id
    });
}

// Manejar la búsqueda de profesores
const searchButton = document.querySelector('.search_button');
const searchInput = document.querySelector('.input');

searchButton.addEventListener('click', async () => {
    const textoBusqueda = searchInput.value.trim(); // Obtener el texto de búsqueda
    try {
        const profesores = await ipcRenderer.invoke('obtener-profesores');
        const profesoresFiltrados = filtrarProfesores(profesores, textoBusqueda); // Filtrar los profesores
        mostrarProfesores(profesoresFiltrados); // Mostrar los resultados filtrados
    } catch (error) {
        console.error('Error al cargar los profesores para la búsqueda:', error);
    }
});

// Cargar los profesores al cargar la página
cargarProfesores();
