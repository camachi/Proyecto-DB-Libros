const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idProfesor = urlParams.get('id'); 

    const contenedorInfo = document.querySelector('.contenedor-prof-info');
    const inputYear = document.getElementById('inputYear');
    const searchButton = document.getElementById('searchButton');
    const tableBody = document.getElementById('id-render-reporte-por-fecha');

    if (!idProfesor) {
        contenedorInfo.innerHTML = '<p>Error: No se proporcionó un ID de profesor válido.</p>';
        return;
    }

    // Cargar la información del profesor
    try {
        const profesor = await ipcRenderer.invoke('obtener-informacion-profesor', idProfesor);
        if (profesor) {
            contenedorInfo.innerHTML = `
                <p><strong>Nombre:</strong> ${profesor.nombre}</p>
                <p><strong>Departamento:</strong> ${profesor.departamento_academico}</p>
            `;
        } else {
            contenedorInfo.innerHTML = '<p>No se encontró información del profesor.</p>';
        }
    } catch (error) {
        console.error('Error al cargar la información del profesor:', error);
        contenedorInfo.innerHTML = '<p>Error al cargar la información del profesor.</p>';
    }

   
    function formatearFecha(fecha) {
        const dateObj = new Date(fecha);
        const dia = String(dateObj.getDate()).padStart(2, '0');
        const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
        const anio = dateObj.getFullYear();
        return `${dia}/${mes}/${anio}`;
    }

    
    searchButton.addEventListener('click', async () => {
        const ano = inputYear.value.trim(); 
        if (!ano) {
            alert('Por favor, ingrese un año.');
            return;
        }

        try {
            const response = await ipcRenderer.invoke('obtener-reporte-por-fecha', { idProfesor, ano });
            tableBody.innerHTML = ''; 

            if (response.success && response.data.length > 0) {
                response.data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.id_recomendacion || 'ID no disponible'}</td> <!-- Aquí usamos id_recomendacion -->
                        <td>${row.autor}</td>
                        <td>${row.titulo}</td>
                        <td>${formatearFecha(row.fecha)}</td>
                    `;
                    tableBody.appendChild(tr);
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="4">No se encontraron resultados para el año ingresado.</td></tr>';
            }
        } catch (error) {
            console.error('Error al buscar reportes:', error);
            tableBody.innerHTML = '<tr><td colspan="4">Error al buscar los reportes.</td></tr>';
        }
    });
});
