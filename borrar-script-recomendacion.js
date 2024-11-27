const { ipcRenderer } = require('electron');
const { mostrarMensaje } = require('./mensaje');

// Función para eliminar una recomendación

async function eliminarRecomendacion(recomendacionId) {
    try {
        const respuesta = await ipcRenderer.invoke('eliminar-recomendacion', recomendacionId);

        if (respuesta.success) {
            mostrarMensaje(`La recomendación ha sido eliminada correctamente.`);
            setTimeout(() => {
                location.reload(); 
            }, 2000);
        } else {
            console.error('Error al eliminar la recomendación:', respuesta.error);
            mostrarMensaje('Error al eliminar la recomendación.');
        }
    } catch (error) {
        console.error('Error de comunicación con el backend:', error);
        mostrarMensaje('Error de comunicación con el backend.');
    }
}

module.exports = { eliminarRecomendacion };

