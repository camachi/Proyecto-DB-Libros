const { ipcRenderer } = require('electron');
const { mostrarMensaje} = require('./mensaje')

// Función para eliminar un profesor
async function eliminarProfesor(profesorId) {
    try {
        const respuesta = await ipcRenderer.invoke('eliminar-profesor', profesorId);

        if (respuesta.success) {
            mostrarMensaje(`El profesor ha sido eliminado correctamente.`);
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            console.error('Error al eliminar el profesor:', respuesta.error);
            mostrarMensaje('Este profesor tiene recomendaciones asociadas. Elimine las recomendaciones antes de borrar al profesor.');
            setTimeout(() => {
                location.reload();
            }, 4000);
        }
    } catch (error) {
        console.error('Error de comunicación con el backend:', error);
        mostrarMensaje('Error de comunicación con el backend:');
    }
}

module.exports = { eliminarProfesor };