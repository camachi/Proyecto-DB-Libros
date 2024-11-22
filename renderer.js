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
    cuerpoTabla.innerHTML = ''; 

    profesores.forEach(profesor => {
        const fila = document.createElement('tr'); 

        
        fila.innerHTML = `
            <td>${profesor.idprofesores}</td>
            <td>${profesor.nombre}</td>
            <td>${profesor.departamento_academico}</td>
            <td>${profesor.programa_academico}</td>
            <td><button class="edit_button" data-id="${profesor.idprofesores}" onclick="botonEditarProfesores(this)">Edit</button></td>
            <td><button type="button" class="delete_button" data-id="${profesor.idprofesores}">Delete</button></td>
        `;

       
        cuerpoTabla.appendChild(fila);
    });
}



cargarProfesores();

//funcion para boton edit ya que no se puede usar <a> y enviar data-id a la vez 
function botonEditarProfesores(button) {
    const profesorId = button.dataset.id; 
    if (profesorId) {
        localStorage.setItem('profesorId', profesorId); // Guarda el ID en localStorage
        
        window.location.href = 'professor.html'; 
    } else {
        console.error('No se encontró el ID del profesor');
    }
}
