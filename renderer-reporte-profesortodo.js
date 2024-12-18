const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el id del profesor desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idProfesor = urlParams.get('id');  // Obtener el ID del profesor

    if (idProfesor) {
        // Si existe el idProfesor, buscar los reportes del profesor
        obtenerReportesProfesor(idProfesor);
    } else {
        console.error('No se encontró el ID del profesor en la URL');
    }

    async function obtenerReportesProfesor(idProfesor) {
        try {
            const respuesta = await ipcRenderer.invoke('obtener-reporte-profesor', idProfesor);

            if (respuesta.success) {
                localStorage.setItem('reportesProfesor', JSON.stringify(respuesta.data));
                mostrarReportes(respuesta.data);
            } else {
                console.error('Error al obtener reportes:', respuesta.error);
            }
        } catch (error) {
            console.error('Error al obtener los reportes:', error);
        }
    }

    function mostrarReportes(reportes) {
        const tableBody = document.getElementById('id-render-reporte');
        const contenedorInfo = document.querySelector('.contenedor-prof-info');

        tableBody.innerHTML = '';  
        contenedorInfo.innerHTML = '';  

        if (reportes.length > 0) {
            // Obtener información única del profesor (de la primera fila)
            const { nombre, departamento_academico } = reportes[0];

            // Agregar información del profesor al contenedor
            contenedorInfo.innerHTML = `
                <p><strong>Profesor:</strong> ${nombre || 'Profesor eliminado'}</p>
                <p><strong>Departamento:</strong> ${departamento_academico || 'N/A'}</p>
            `;

            // Llenar la tabla con los reportes
            reportes.forEach(row => {
                const fecha = new Date(row.fecha);
                const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.autor}</td>
                    <td>${row.titulo}</td>
                    <td>${fechaFormateada}</td>
                `;
                tableBody.appendChild(tr);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="4">No se encontraron reportes para este profesor.</td></tr>';
            contenedorInfo.innerHTML = '<p></p>';
        }
    }
});
