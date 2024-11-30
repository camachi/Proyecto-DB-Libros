const { ipcRenderer } = require('electron');

async function cargarReporteProfesores() {
    try {
        const response = await ipcRenderer.invoke('obtener-reporte-profesores');

        if (response.success) {
            const data = response.data;

          
            const table = document.getElementById('id-render-reporte');
            table.innerHTML = ''; 

          
            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th>Recomendación ID</th>
                    <th>Autor</th>
                    <th>Título</th>
                    <th>Fecha</th>
                    <th>Profesor</th>
                    <th>Departamento</th>
                </tr>
            `;
            table.appendChild(thead);

            
            const tbody = document.createElement('tbody');

           
            data.forEach(row => {
                const fecha = new Date(row.fecha);
                const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id_recomendacion}</td>
                    <td>${row.autor}</td>
                    <td>${row.titulo}</td>
                    <td>${fechaFormateada}</td>
                    <td>${row.nombre_profesor || 'Profesor eliminado'}</td>
                    <td>${row.departamento_profesor || 'N/A'}</td>
                `;
                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
        } else {
            console.error('Error al cargar el reporte:', response.error);

         
            const table = document.getElementById('id-render-reporte');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th colspan="6">Error al cargar los datos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="6">${response.error}</td>
                    </tr>
                </tbody>
            `;
        }
    } catch (error) {
        console.error('Error en el frontend:', error);

        
        const table = document.getElementById('id-render-reporte');
        table.innerHTML = `
            <thead>
                <tr>
                    <th colspan="6">Error inesperado</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="6">Error al cargar los datos.</td>
                </tr>
            </tbody>
        `;
    }
}


document.addEventListener('DOMContentLoaded', cargarReporteProfesores);
