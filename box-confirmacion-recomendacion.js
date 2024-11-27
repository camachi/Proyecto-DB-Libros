const { eliminarRecomendacion } = require('./borrar-script-recomendacion.js');

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-confirmacion');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const btnCancelar = document.getElementById('btn-cancelar');

    // Función para mostrar el modal de confirmación
    
    function mostrarModal(recomendacionId) {
        modal.style.display = 'flex';

        
        btnConfirmar.onclick = async () => {
            modal.style.display = 'none';
            eliminarRecomendacion(recomendacionId);
        };

        
        btnCancelar.onclick = () => {
            modal.style.display = 'none';
        };
    }

    //este scrip depende de la clase en el boton delete 
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete_button_recomendacion')) {
            const recomendacionId = e.target.dataset.id; 
            mostrarModal(recomendacionId);
        }
    });
});

