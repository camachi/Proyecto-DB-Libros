const { ipcRenderer } = require('electron');
const { mostrarMensaje } = require('./mensaje');
const profesorId = localStorage.getItem('profesorId');


const form = document.getElementById('profesorEditForm');
const submitButton = document.getElementById('submitEdit');


async function cargarDatosProfesor(id) {
    try {
        const profesor = await ipcRenderer.invoke('obtener-profesor-por-id', id);
        if (profesor) {
            form.nombre.value = profesor.nombre;
            form.departamento.value = profesor.departamento_academico;
        } else {
            mostrarMensaje('Profesor no encontrado');
        }
    } catch (error) {
        console.error('Error al cargar los datos del profesor:', error);
        mostrarMensaje('Error al cargar los datos del profesor');
    }
}

cargarDatosProfesor(profesorId);

submitButton.addEventListener('click', async () => {
    const formData = new FormData(form);
    const nombre = formData.get('nombre').trim();
    const departamento = formData.get('departamento').trim();

    console.log('Datos antes de enviar:', { nombre, departamento });

    if (nombre && departamento) {
        try {
            
            submitButton.disabled = true;

            
            const response = await ipcRenderer.invoke('actualizar-profesor', {
                id: profesorId,
                nombre,
                departamento
            });

            if (response.success) {
                mostrarMensaje('Profesor actualizado correctamente!');

                setTimeout(() => {
                    window.location.href = 'edit-professor.html';  
                }, 3000); 

            } else {
                console.error('Error al actualizar el profesor:', response.error);
                mostrarMensaje('Error al actualizar el profesor');
            }
        } catch (error) {
            console.error('Error al procesar la actualización:', error);
            mostrarMensaje('Hubo un error al actualizar el profesor');
        } finally {
            
            submitButton.disabled = false;
        }
    } else {
        mostrarMensaje('Complete todos los campos');
    }
});
