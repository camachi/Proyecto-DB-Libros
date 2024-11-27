const { ipcRenderer } = require('electron');


async function cargarRecomendaciones() {
    try {
        const response = await ipcRenderer.invoke('obtener-recomendaciones');
        console.log('Respuesta desde backend:', response);

        if (response.success) {
            const recomendaciones = response.data;
            console.log('Recomendaciones:', recomendaciones); 

            const tbody = document.getElementById('recommendations-body'); 

            
            tbody.innerHTML = '';

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
            console.error('Error al obtener recomendaciones:', response.error);
        }
    } catch (error) {
        console.error('Error en el frontend:', error);
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
document.addEventListener('DOMContentLoaded', cargarRecomendaciones);
