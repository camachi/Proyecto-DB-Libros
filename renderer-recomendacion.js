const { ipcRenderer } = require('electron');
const { mostrarMensaje } = require('./mensaje');


// Función para cargar las recomendaciones
async function cargarRecomendaciones() {
    try {
        const response = await ipcRenderer.invoke('obtener-recomendaciones', '');
        console.log('Respuesta desde backend:', response);

        if (response) {
            const recomendaciones = response;
            console.log('Recomendaciones:', recomendaciones);

            const tbody = document.getElementById('recommendations-body');
            tbody.innerHTML = ''; // Limpiar las filas anteriores

            recomendaciones.forEach(recomendacion => {
                const fecha = new Date(recomendacion.fecha);
                const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${recomendacion.id}</td>
                    <td>${recomendacion.autor}</td>
                    <td>${recomendacion.titulo}</td>
                    <td>${recomendacion.profesor}</td>
                    <td>${fechaFormateada}</td>
                    <td><button class="edit_button" data-id="${recomendacion.id}" onclick="botonEditarRecomendacion(this)">Edit</button></td>
                    <td><button type="button" class="delete_button_recomendacion" data-id="${recomendacion.id}">Delete</button></td>
                `;
                tbody.appendChild(row);
            });
        } else {
            console.error('Error al obtener recomendaciones');
        }
    } catch (error) {
        console.error('Error en el frontend:', error);
    }
}

// Función para buscar recomendaciones por texto (autor, título o fecha)
async function buscarRecomendaciones() {
    const query = document.getElementById('search-input').value.trim(); // Obtener el valor del input de búsqueda

    try {
        // Si el input está vacío, cargamos todas las recomendaciones
        if (query === "") {
            return cargarRecomendaciones();
        }

        // Llamar al backend para obtener recomendaciones filtradas
        const response = await ipcRenderer.invoke('obtener-recomendaciones', query);
        console.log('Resultados de la búsqueda:', response);

        const tbody = document.getElementById('recommendations-body');
        tbody.innerHTML = ''; // Limpiar las filas anteriores

        if (response.length > 0) {
            response.forEach(recomendacion => {
                const fecha = new Date(recomendacion.fecha);
                const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${recomendacion.id}</td>
                    <td>${recomendacion.autor}</td>
                    <td>${recomendacion.titulo}</td>
                    <td>${recomendacion.profesor}</td>
                    <td>${fechaFormateada}</td>
                    <td><button class="edit_button" data-id="${recomendacion.id}" onclick="botonEditarRecomendacion(this)">Edit</button></td>
                    <td><button type="button" class="delete_button_recomendacion" data-id="${recomendacion.id}">Delete</button></td>
                `;
                tbody.appendChild(row);
            });
        } else {
            
            mostrarMensaje("No se encontraron recomendaciones para este término de búsqueda.");
        }
    } catch (error) {
        console.error('Error al buscar recomendaciones:', error);
    }
}
function botonEditarRecomendacion(button) {
    const recomendacionId = button.dataset.id;  
    if (recomendacionId) {
        localStorage.setItem('recomendacionId', recomendacionId); 
        window.location.href = 'recomendacion.html';  
    } else {
        console.error('No se encontró el ID de la recomendación');
    }
}

// Evento para buscar recomendaciones cuando el usuario hace clic en el botón de búsqueda
document.querySelector('.search_button').addEventListener('click', buscarRecomendaciones);

// Evento para cargar las recomendaciones al iniciar
document.addEventListener('DOMContentLoaded', cargarRecomendaciones);

