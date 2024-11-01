const { ipcRenderer } = require('electron');

// Función para cargar y mostrar profesores
async function cargarProfesores() {
    try {
        const profesores = await ipcRenderer.invoke('obtener-profesores');
        mostrarProfesores(profesores);
    } catch (error) {
        console.error('Error al cargar profesores:', error);
    }
}

// Función para mostrar los profesores en la tabla
function mostrarProfesores(profesores) {
    console.log('Profesores obtenidos:', profesores); 
    const cuerpoTabla = document.getElementById('id-render-profesores');
    cuerpoTabla.innerHTML = ''; // Limpiar el cuerpo de la tabla antes de agregar nuevos elementos

    profesores.forEach(profesor => {
        const fila = document.createElement('tr'); // Crear una nueva fila

        // Crear celdas para cada dato
        fila.innerHTML = `
            <td>${profesor.idprofesores}</td>
            <td>${profesor.nombre}</td>
            <td>${profesor.departamento_academico}</td>
            <td>${profesor.programa_academico}</td>
            <td><a href="professor.html"><button class="edit_button">Edit</button></a></td>
            <td><a href=""><button class="delete_button">Delete</button></a></td>
        `;

        // Agregar la fila al cuerpo de la tabla
        cuerpoTabla.appendChild(fila);
    });
}


// Cargar los profesores al inicio
cargarProfesores();

