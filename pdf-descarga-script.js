const html2pdf = require("html2pdf.js");
const { mostrarMensaje } = require('./mensaje');
document.getElementById("downloadPDF").addEventListener("click", () => {
    const element = document.querySelector(".contenido_db_renderer");

    // Configuración de html2pdf ajustada
    const options = {
        margin: 0.5, // Márgenes en pulgadas
        filename: "reporte.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
            scale: 2, // Aumenta la resolución para evitar cortes
            scrollX: 0, // Evita problemas con desplazamientos horizontales
            scrollY: 0 
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generar y descargar el PDF
    mostrarMensaje("PDF descargado!");
    html2pdf().set(options).from(element).save();
});
