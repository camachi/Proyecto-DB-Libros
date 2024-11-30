const { ipcRenderer } = require('electron');
const { mostrarMensaje } = require('./mensaje'); 

async function cargarReporteRecomendacionesFecha() {
    const year = document.getElementById('inputYear').value.trim();

    if (!year) {
        return; 
    }

    try {
        const response = await ipcRenderer.invoke('obtener-reporte-recomendaciones-fecha', year);

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

            if (data.length === 0) {
                
                mostrarMensaje("No se encontraron resultados para el año especificado.");
                return; 
            }

           
            const tbody = document.createElement('tbody');

          
            data.forEach(row => {
                const fecha = new Date(row.fecha);
                const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

                const tr = document.createElement('tr');
                
                
                const tdIdRecomendacion = document.createElement('td');
                tdIdRecomendacion.textContent = row.id_recomendacion;
                tr.appendChild(tdIdRecomendacion);
                
                const tdAutor = document.createElement('td');
                tdAutor.textContent = row.autor;
                tr.appendChild(tdAutor);

                const tdTitulo = document.createElement('td');
                tdTitulo.textContent = row.titulo;
                tr.appendChild(tdTitulo);
                
                const tdFecha = new Date(row.fecha);
                const tdFechaElemento = document.createElement('td');
                tdFechaElemento.textContent = fechaFormateada;
                tr.appendChild(tdFechaElemento);
                
                const tdProfesor = document.createElement('td');
                tdProfesor.textContent = row.nombre_profesor || 'Profesor eliminado';
                tr.appendChild(tdProfesor);
                
                const tdDepartamento = document.createElement('td');
                tdDepartamento.textContent = row.departamento_profesor || 'N/A';
                tr.appendChild(tdDepartamento);

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

document.getElementById('searchButton').addEventListener('click', cargarReporteRecomendacionesFecha);


