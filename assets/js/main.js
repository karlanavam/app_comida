$(document).ready(cargarPagina);


var cargarPagina = function() {
    $("get-location").click(obtenerUbicacion);

function obtenerUbicacion() {
    if (navigator.geolocation.getCurrentPosition(
    mostrarPosicion))
    
}