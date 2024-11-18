const { ipcRenderer } = require('electron');
const { mostrarMensaje} = require('./mensaje')
const profesorId = localStorage.getItem('profesorId');

// Obtener elementos del formulario y el botón
const form = document.getElementById('profesorEditForm');
const submitButton = document.getElementById('submitEdit');

// Función para cargar datos del profesor
async function cargarDatosProfesor(id) {
    const profesores = await ipcRenderer.invoke('obtener-profesores'); 
    const profesor = profesores.find(prof => prof.id === parseInt(id));
    if (profesor) {
        
        form.nombre.value = profesor.nombre;
        form.departamento.value = profesor.departamento_academico;
        form.programa.value = profesor.programa_academico;
    }
}


cargarDatosProfesor(profesorId);


submitButton.addEventListener('click', async () => {
    
    const formData = new FormData(form);


    const nombre = formData.get('nombre').trim();
    const departamento = formData.get('departamento').trim();
    const programa = formData.get('programa').trim();
    console.log('Datos antes de enviar:', { nombre, departamento, programa });
    
    if (nombre && departamento && programa) {
        // Enviar datos al proceso principal para actualizar
        const response = await ipcRenderer.invoke('actualizar-profesor', {
            id: profesorId,
            nombre,
            departamento,
            programa
        });

        if (response.success) {
            mostrarMensaje('Profesor actualizado correctamente!');
            
            
        } else {
            console.error('Error al actualizar el profesor:', response.error);
        }
    } else {
        mostrarMensaje('Complete todos los campos');
    }
});
