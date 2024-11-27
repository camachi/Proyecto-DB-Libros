const { ipcRenderer } = require('electron');
const { mostrarMensaje } = require('./mensaje');

document.addEventListener('DOMContentLoaded', async () => {
    const recomendacionId = localStorage.getItem('recomendacionId');
    if (recomendacionId) {
        try {
           
            const recomendacion = await ipcRenderer.invoke('obtener-recomendacion', recomendacionId);

            if (recomendacion) {
                console.log('Recomendación obtenida:', recomendacion);

                
                if (recomendacion.titulo) {
                    document.getElementById('titulo').value = recomendacion.titulo;
                } else {
                    console.log('El campo titulo está vacío o es nulo');
                }

                if (recomendacion.autor) {
                    document.getElementById('autor').value = recomendacion.autor;
                } else {
                    console.log('El campo autor está vacío o es nulo');
                }

                if (recomendacion.fecha) {
                    const fecha = new Date(recomendacion.fecha);  
                    const fechaFormateada = fecha.toISOString().split('T')[0];  
                    document.getElementById('fecha').value = fechaFormateada;
                } else {
                    console.log('El campo fecha está vacío o es nulo');
                }

                
                const profesores = await ipcRenderer.invoke('obtener-profesores');
                const opcionesSelect = document.getElementById('opciones');
                profesores.forEach(profesor => {
                    const option = document.createElement('option');
                    option.value = profesor.idprofesores;
                    option.textContent = profesor.nombre;

                   
                    if (profesor.idprofesores == recomendacion.id_profesor) {
                        option.selected = true;
                    }

                    opcionesSelect.appendChild(option);
                });
            } else {
                mostrarMensaje('Recomendación no encontrada.');
            }
        } catch (error) {
            console.error('Error al obtener recomendación:', error);
            mostrarMensaje('Error al obtener la recomendación.');
        }
    } else {
        mostrarMensaje('ID de recomendación no encontrado.');
    }

    
    document.getElementById('save-button').addEventListener('click', async () => {
        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const idProfesor = document.getElementById('opciones').value;
        const fecha = document.getElementById('fecha').value;

        if (titulo && autor && idProfesor && fecha) {
            try {
                
                const saveButton = document.getElementById('save-button');
                saveButton.disabled = true;

              
                mostrarMensaje('Recomendación actualizada correctamente.');

                
                await ipcRenderer.invoke('actualizar-recomendacion', recomendacionId, titulo, autor, idProfesor, fecha);

                
                setTimeout(() => {
                    saveButton.disabled = false;  
                   
                    window.location.href = 'editar.html';  
                }, 2000);
                
            } catch (error) {
                console.error('Error al actualizar la recomendación:', error);
                mostrarMensaje('Error al actualizar la recomendación.');
                
                
                const saveButton = document.getElementById('save-button');
                saveButton.disabled = false;
            }
        } else {
            mostrarMensaje('Todos los campos son obligatorios.');
        }
    });
});
