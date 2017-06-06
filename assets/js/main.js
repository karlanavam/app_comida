/*Ubicación laboratoria: 19.4176387,-99.167004*/

// Obtiene ubicación actual
var obtenerUbicacion = function (e) {
	if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(mostrarPosicion);
	} else {
		alert("Actualice su navegador");
	}
};

var mostrarPosicion = function (posicion) {

	var coordenadas = {
		lat: posicion.coords.latitude, 
		lng: posicion.coords.longitude
	};
    
	mostrarMapa(coordenadas);
};

// Código de la API pero en una función
var mostrarMapa = function (coordenadas) {
	var map = new google.maps.Map($('#map')[0], {
      zoom: 16,
      center: coordenadas
    });
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: map
    });
}

var restaurantes = [
    {
        "nombre": "La Chilanguita",
        "direccion": "Av de los Insurgentes Sur 895, Nápoles, 03840 Ciudad de México, CDMX",
        "categoria": "mexicana",
        "coordenadas": {
            lng: -99.1884862, 
		    lat: 19.4142741
        }
    },
    {
        "nombre": "La Casa de Toño",
        "direccion": "Avenida Patriotismo 229, San Pedro de los Pinos, 03800 Benito Juarez, CDMX",
        "categoria": "mexicana",
        "coordenadas": {
            lng: -99.182696, 
		    lat: 19.3970436
        }
    },
    {
        "nombre": "Sushi Itto",
        "direccion": "Av de los Insurgentes Sur 746, Col del Valle Centro, 03100 Ciudad de México, CDMX",
        "categoria": "oriental",
        "coordenadas": {
            lng: -99.1750627, 
		    lat: 19.39181
        }
    },
    {
        "nombre": "Moshi Moshi",
        "direccion": "Félix Cuevas 374 Local 107, Benito Juárez, Del Valle, Tlacoquemecatl del Valle, 03200 Ciudad de México, CDMX",
        "categoria": "oriental",
        "coordenadas": {
            lng: -99.1750115, 
		    lat: 19.3728328
        }
    },
    {
        "nombre": "Italianni's",
        "direccion": "Av Insurgentes Sur 729, Benito Juarez, Nápoles, 03810 Ciudad de México, CDMX",
        "categoria": "Italiana",
        "coordenadas": {
            lng: -99.17541, 
		    lat: 19.3923816
        }
    },
    {
        "nombre": "Olive garden",
        "direccion": "Av. Popocatepetl 546 Local J-11, Benito Juárez, Xoco, 03340 Ciudad de México, CDMX",
        "categoria": "italiana",
        "coordenadas": {
            lng: -99.2083713, 
		    lat: 19.3889858
        }
    }
];

var plantilla = '<article class="item-restaurante">' +
        '<div class="col s12 m12">' +
            '<div class="card horizontal">' +
                '<div class="card-image">' +
                    '<img src="http://via.placeholder.com/200x200">' +
                '</div>' +
                '<div class="card-stacked">' +
                    '<div class="card-content">' +
                        '<h4>__nombre__</h4>' +
                         '<h6>Dirección: __direccion__</h6>' +
                      '<p>Comida __categoria__</p>' +
                    '</div>' +
                '<div class="card-action">' +
                  '<a href="#" data-lat="__lat__" data-lng="__lng__" class="cambiarMapa">Ver mapa</a>' +
               '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
     '</article>';

var mostrarRestaurantes = function (restaurantes) {
	var plantillaFinal = "";
	restaurantes.forEach(function (comer) {
		plantillaFinal += plantilla.replace("__nombre__", comer.nombre)
                             .replace("__direccion__", comer.direccion)
                             .replace("__categoria__", comer.categoria)
                            .replace("__lat__", comer.coordenadas.lat)
                            .replace("__lng__", comer.coordenadas.lng);
	});
	$("#lista-restaurantes").html(plantillaFinal);
}

var filtrarRestaurantes = function (e) {
	e.preventDefault();
	var criterioBusqueda = $("#search").val().toLowerCase();
	var contactosFiltrados = restaurantes.filter(function (restaurantes) {
		return restaurantes.nombre.toLowerCase().indexOf(criterioBusqueda) >= 0;
	});
	mostrarContactos(contactosFiltrados);
};

function cambiarUbicacion() {
  var latitud = $(this).data("lat");
  var longitud = $(this).data("lng");

  var coordenadas = {
    lat: latitud,
    lng: longitud
  };

  console.log(coordenadas);
  mostrarMapa(coordenadas);
}

function cargarPagina() {
    obtenerUbicacion();
    mostrarRestaurantes(restaurantes);
    $('.cambiarMapa').click(cambiarUbicacion);
}

$(document).ready(cargarPagina);


/*
darle una clase al elemento .restaurante y también ponerle el atributo data-lat data-long

agregar data-log y data-lat en la plantilla, poner una clase para remplazar en el each.

en funcion cargarPagina:
meter la funion: cambiarUbicación();

function cambiar ubicación() {
    
}


*/

