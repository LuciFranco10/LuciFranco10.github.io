let map;
let marker;
let geocoder;
let autocomplete;
let directionsService;
let directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: -3.1038021636483992, lng: -60.01193867541264 }, 
        mapTypeControl: false,
    });
    geocoder = new google.maps.Geocoder();

    const inputText = document.getElementById("addressInput");
    const submitButton = document.getElementById("geocodeButton");
    const clearButton = document.getElementById("clearButton");

    marker = new google.maps.Marker({ map });

    
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    
    autocomplete = new google.maps.places.Autocomplete(inputText);
    autocomplete.bindTo("bounds", map);

    
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            map.setCenter(place.geometry.location);
            marker.setPosition(place.geometry.location);
            marker.setMap(map);
        } else {
            alert("Por favor, selecione um lugar da lista de sugestões.");
        }
    });

    submitButton.addEventListener("click", () => {
        if (inputText.value.trim() === "") {
            alert("Por favor, insira um endereço válido.");
            return;
        }
        geocode({ address: inputText.value });
    });

    clearButton.addEventListener("click", clear);
}

function clear() {
    if (marker) {
        marker.setMap(null);
    }
    map.setCenter({ lat: -3.1038021636483992, lng: -60.01193867541264 }); 
    map.setZoom(12);
    document.getElementById("addressInput").value = ""; 
}

function geocode(request) {
    clear();
    geocoder.geocode(request)
        .then((result) => {
            const { results } = result;

            if (results && results.length > 0) {
                const location = results[0].geometry.location;
                map.setCenter(location);
                marker.setPosition(location);
                marker.setMap(map);
                map.setZoom(15); 
            } else {
                alert("Nenhum resultado encontrado para o endereço.");
            }
        })
        .catch((e) => {
            alert("Geocode não foi bem-sucedido pelo seguinte motivo: " + e);
        });
}

function calculateRoute() {
    const start = { lat: -3.1038021636483992, lng: -60.01193867541264 }; 
    const end = document.getElementById("addressInput").value;

    if (!end) {
        alert("Por favor, insira um endereço para calcular a rota.");
        return;
    }

    directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
        if (status === "OK") {
            directionsRenderer.setDirections(response);
        } else {
            alert("Erro ao calcular a rota: " + status);
        }
    });
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            map.setCenter(pos);
            marker.setPosition(pos);
            marker.setMap(map);
            map.setZoom(15); 
        }, () => {
            handleLocationError(true);
        });
    } else {
       
        handleLocationError(false);
    }
}

function handleLocationError(browserHasGeolocation) {
    alert(browserHasGeolocation ?
          'Erro: O serviço de geolocalização falhou.' :
          'Erro: Seu navegador não suporta geolocalização.');
}


document.addEventListener('DOMContentLoaded', function () {
    const voltarBtn = document.getElementById('voltar');
        
    voltarBtn.addEventListener('click', function () {
       
        window.location.href = 'menu.html'; 
    });
});



window.initMap = initMap;
