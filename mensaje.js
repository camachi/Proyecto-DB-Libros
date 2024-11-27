function mostrarMensaje(mensaje) {
    
    let contenedor = document.getElementById('alerta-contenedor');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'alerta-contenedor';
        document.body.appendChild(contenedor);
    }

    // Crear el mensaje
    const alerta = document.createElement('div');
    alerta.className = 'alerta';
    alerta.textContent = mensaje;

   
    contenedor.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 6000); // Puedes ajustar el tiempo que dura la alerta en pantalla
}
module.exports = { mostrarMensaje };