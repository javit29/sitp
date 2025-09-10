var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([51.5, -0.09]).addTo(map);

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map Leaflet con GeoJSON</title>
    
    <!-- Incluir Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    
    <!-- Incluir Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    
    <style>
        #map {
            height: 500px;
            width: 100%;
        }
    </style>
</head>
<body>
    <h1>Mi Map con GeoJSON</h1>
    
    <!-- Contenedor para el map -->
    <div id="map"></div>
    
    <script>
        // Inicializar el mapa
        // Crear un mapa centrado en una ubicación específica con un nivel de zoom
        var map = L.map('map').setView([40.4168, -3.7038], 6); // Coordenadas de España
        
        // Añadir capa base de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        /**
         * FUNCIÓN PARA CARGAR GEOJSON EN EL MAPA
         * @param {string} url - La URL del archivo GeoJSON a cargar
         * @param {object} options - Opciones de estilo para las features (opcional)
         */
        function cargarGeoJSON(url, options = {}) {
            /*
            PASO 1: Usamos fetch() para obtener el archivo GeoJSON
            fetch() es una función moderna de JavaScript para hacer peticiones HTTP
            */
            fetch(url)
                .then(response => {
                    /*
                    PASO 2: Verificamos si la respuesta es exitosa (código 200)
                    Si hay error, mostramos mensaje en consola
                    */
                    if (!response.ok) {
                        throw new Error('Error al cargar el archivo: ' + response.status);
                    }
                    /*
                    PASO 3: Convertimos la respuesta a formato JSON
                    .json() convierte el texto del archivo a un objeto JavaScript
                    */
                    return response.json();
                })
                .then(geojsonData => {
                    /*
                    PASO 4: Una vez tenemos los datos en formato JSON,
                    los añadimos al mapa usando L.geoJSON()
                    */
                    L.geoJSON(geojsonData, {
                        /*
                        Opciones de estilo (puedes personalizar colores, grosor, etc.)
                        Estas son opcionales, si no se proporcionan, se usan los valores por defecto
                        */
                        style: {
                            color: options.color || '#3388ff',    // Color del borde
                            weight: options.weight || 2,          // Grosor de la línea
                            opacity: options.opacity || 1,        // Transparencia
                            fillColor: options.fillColor || '#3388ff', // Color de relleno
                            fillOpacity: options.fillOpacity || 0.2   // Transparencia del relleno
                        },
                        
                        /*
                        Función que se ejecuta cuando se hace clic en una feature
                        Muestra un popup con información
                        */
                        onEachFeature: function(feature, layer) {
                            if (feature.properties) {
                                // Crear contenido para el popup
                                let popupContent = "<b>Información:</b><br>";
                                
                                // Añadir todas las propiedades al popup
                                for (let key in feature.properties) {
                                    popupContent += key + ": " + feature.properties[key] + "<br>";
                                }
                                
                                // Asignar el popup a la capa
                                layer.bindPopup(popupContent);
                            }
                        }
                    }).addTo(map);
                    
                    console.log('GeoJSON cargado exitosamente!');
                })
                .catch(error => {
                    /*
                    PASO 5: Manejo de errores
                    Si algo falla en el proceso, mostramos el error en consola
                    */
                    console.error('Error:', error);
                });
        }

        // EJEMPLOS DE USO:

        // Ejemplo 1: Cargar un GeoJSON con estilo por defecto
        // cargarGeoJSON('ruta/a/tu/archivo.geojson');

        // Ejemplo 2: Cargar un GeoJSON con estilo personalizado
        // cargarGeoJSON('ruta/a/tu/archivo.geojson', {
        //     color: 'red',
        //     weight: 3,
        //     fillColor: 'yellow'
        // });

        // Ejemplo 3: Cargar un GeoJSON de ejemplo desde internet
        // Descomenta la siguiente línea para probar:
        // cargarGeoJSON('https://raw.githubusercontent.com/leaflet-maps-course/leaflet-geojson/main/barcelona-districts.geojson');

    </script>
</body>
</html>