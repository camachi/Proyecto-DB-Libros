const { eliminarProfesor } = require('./borrar-script.js');

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-confirmacion');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const btnCancelar = document.getElementById('btn-cancelar');

   
    function mostrarModal(profesorId) {
        modal.style.display = 'flex';

       
        btnConfirmar.onclick = async () => {
            modal.style.display = 'none';
            eliminarProfesor(profesorId);
        };

        
        btnCancelar.onclick = () => {
            modal.style.display = 'none';
        };
    }

    //este scrip depende de la clase en el boton delete 
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete_button')) {
            const profesorId = e.target.dataset.id; 
            mostrarModal(profesorId);
        }
    });

    
});
