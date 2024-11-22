const { eliminarProfesor } = require('./borrar-script.js');

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-confirmacion');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const btnCancelar = document.getElementById('btn-cancelar');

   
    function mostrarModal(profesorId) {
        modal.style.display = 'flex';

        // Botón "Sí" para confirmar la eliminación
        btnConfirmar.onclick = async () => {
            modal.style.display = 'none';
            eliminarProfesor(profesorId);
        };

        
        btnCancelar.onclick = () => {
            modal.style.display = 'none';
        };
    }

    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete_button')) {
            const profesorId = e.target.dataset.id; 
            mostrarModal(profesorId);
        }
    });

    
});
