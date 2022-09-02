let map, origin;
let locatiaActuala;
document
  .querySelector('.permission-granted-button')
  .addEventListener('click', () => {
    navigator.geolocation.watchPosition(
      position => {
        origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // console.log(origin);
        map.setCenter(origin);
        locatiaActuala = new google.maps.Marker({
          position: origin,
          map: map,
          draggable: true,
          icon: 'images/walk.png',
        });
      },
      () => {
        handleLocationError(true, yourLocation, map.getCenter());
      }
    );
  });
function initMap() {
  //locatia mea
  origin = {
    lat: 44.44116,
    lng: 26.05178,
  };

  // constantele de calculare a distantei si map-ul
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: origin,
  });

  directionsRenderer.setMap(map);

  /// LOCATIA MEA ACTUALA

  // CREAREA DE MAI MULTE MARKERE DE HARTA DIFERITE + POP-UP URI
  const markers = [
    {
      pozitie: {
        lat: 45.1556,
        lng: 29.66486,
      },
      program: '9-22',
      id: 1,
    },
    {
      pozitie: {
        lat: 44.44365,
        lng: 26.05572,
      },
      program: '9-22',
      id: 2,
    },
    {
      pozitie: {
        lat: 44.43719,
        lng: 26.05402,
      },
      program: 'non-stop',
      id: 3,
    },
    {
      pozitie: {
        lat: 44.43224,
        lng: 26.02451,
      },
      program: '9-22',
      id: 4,
    },
    {
      pozitie: {
        lat: 44.44131,
        lng: 26.06145,
      },
      program: '9-22',
      id: 5,
    },
    {
      pozitie: {
        lat: 44.43137,
        lng: 26.05293,
      },
      program: '9-22',
      id: 6,
    },
    {
      pozitie: {
        lat: 44.42855,
        lng: 26.04467,
      },
      program: '9-22',
      id: 7,
    },
    {
      pozitie: {
        lat: 44.43193,
        lng: 26.03377,
      },
      program: '9-22',
      id: 8,
    },
    {
      pozitie: {
        lat: 44.42873,
        lng: 26.04803,
      },
      program: '9-22',
      id: 9,
    },
    {
      pozitie: {
        lat: 44.45312,
        lng: 26.05215,
      },
      program: '9-22',
      id: 10,
    },
  ];

  // Creaza markerele pe  mapa si le face butonul care  ne arata traseul parcurs
  for (let i = 0; i < markers.length; i++) {
    const currMarker = markers[i];

    const marker = new google.maps.Marker({
      position: { lat: currMarker.pozitie.lat, lng: currMarker.pozitie.lng },
      map: map,
      draggable: false,
      icon: 'images/gym.png',
    });

    const contentInfo = `
    <h3 id="firstHeading" class="firstHeading" >Sala ${currMarker.id}</h3> 
    <h5 class='headingContent'>Program: ${currMarker.program}</h5>
    <button id='sala-${currMarker.id}' class="btn">Get Direction -></button>
    `;

    const infowindow = new google.maps.InfoWindow({
      content: contentInfo,
    });

    marker.addListener('click', () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
      setTimeout(() => {
        document
          .getElementById(`sala-${markers[i].id}`)
          .addEventListener('click', () => {
            calculateAndDisplayRoute(
              directionsService,
              directionsRenderer,
              origin,
              markers[i].pozitie
            );
          });
      });
    });
  }

  // create lista de sali
  for (let i = 0; i < markers.length; i++) {
    const getdata = markers[i];
    document.getElementById('containerRight').innerHTML += `
    <ul class='lista'>
    <li>
    <span class='name'>Sala</span>
    <span class='number'>${[i + 1]}</span>
    <span class='string'>Program: ${getdata.program}</span>
    </li>
    </ul>
    `;
  }
  /**
   *
   * Function who is able to calculate my route and write  the distance
   */
  function calculateAndDisplayRoute(
    directionsService,
    directionsRenderer,
    yourLocation,
    destination
  ) {
    directionsService
      .route({
        origin: new google.maps.LatLng(yourLocation.lat, yourLocation.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then(response => {
        directionsRenderer.setDirections(response);

        const route = response.routes[0];
        const summaryPanel = document.getElementById('directions-panel');

        summaryPanel.innerHTML = '';

        //For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
          const routeSegment = i + 1;

          summaryPanel.innerHTML +=
            'Punctul de plecare este: ' + route.legs[i].start_address + '<br>';
          summaryPanel.innerHTML +=
            ' Punctul de sosire este: ' + route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML +=
            'Distanta este de: ' + route.legs[i].distance.text;
        }
      })
      .catch(e => window.alert('Directions request failed due to ' + status));
  }
}

window.initMap = initMap;

// [END maps_directions_waypoints]
