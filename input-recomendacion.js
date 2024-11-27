const { ipcRenderer } = require('electron');
const { mostrarMensaje } = require('./mensaje');


async function cargarProfesoresEnSelect() {
    try {
        const profesores = await ipcRenderer.invoke('obtener-profesores');
        const selectElement = document.getElementById('opciones');

        
        selectElement.innerHTML = '<option value="" disabled selected>Seleccione profesor...</option>';

      
        profesores.forEach(profesor => {
            const option = document.createElement('option');
            option.value = profesor.idprofesores;
            option.textContent = profesor.nombre;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los profesores en el select:', error);
    }
}


function inicializarFormulario() {
    const submitButton = document.getElementById('rbtn'); 
    const form = document.getElementById('recomendacionForm'); 
    submitButton.addEventListener('click', () => {
        console.log('Botón Enviar presionado');

       
        const autor = form['autor'].value.trim();
        const titulo = form['titulo'].value.trim();
        const idProfesor = form['opciones'].value; 
        const fecha = form['fecha'].value;

        
        if (autor && titulo && idProfesor && fecha) {
            ipcRenderer.invoke('agregar-recomendacion', { autor, titulo, idProfesor, fecha })
                .then(response => {
                    if (response.success) {
                        console.log('Recomendación agregada exitosamente');
                        mostrarMensaje('Recomendación agregada exitosamente');
                        form.reset(); 
                    } else {
                        console.error('Error al agregar recomendación:', response.error);
                        mostrarMensaje('Hubo un error al agregar la recomendación');
                    }
                })
                .catch(error => {
                    console.error('Error en el proceso de comunicación:', error);
                    mostrarMensaje('Error en el proceso de comunicación');
                });
        } else {
            
            mostrarMensaje('Complete todos los campos');
            console.error('Campos incompletos, no se puede agregar la recomendación.');
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    cargarProfesoresEnSelect(); 
    inicializarFormulario();   
});
