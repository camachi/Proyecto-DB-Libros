const { ipcRenderer } = require('electron');
const { mostrarMensaje } = require('./mensaje');



window.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submitPROF');
  const form = document.getElementById('profesorForm');

  submitButton.addEventListener('click', () => {
    const nombre = form['nombre'].value.trim();
    const departamento = form['departamento'].value.trim();
    const programa = form['programa'].value.trim();

    if (nombre && departamento && programa) {
      ipcRenderer.invoke('agregar-profesor', { nombre, departamento, programa })
        .then(response => {
          if (response.success) {
            
            console.log('Profesor agregado exitosamente');
            mostrarMensaje('Profesor agregado exitosamente');
            form.reset();
          } else {
            
            console.error('Error al agregar profesor:', response.error);
          }
        })
        .catch(error => {
          console.error('Error en el proceso de comunicación:', error);
        });
    } else {
      mostrarMensaje('Complete todos los campos');
      console.error('Error al agregar profesor:', response.error);
      
    }
  });
});

