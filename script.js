// Initialize and add the map
function initMap() {
  //
  //
  //
  //
  //
  //
  //
  // The location of Uluru
  const myLocation = {
    lat: 44.441054203343604,
    lng: 26.05136625245236,
  };

  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: myLocation,
  });

  const locatiaActuala = new google.maps.Marker({
    position: { lat: 44.441054203343604, lng: 26.05136625245236 },
    map: map,
    draggable: true,
    icon: 'images/walk.png',
  });

  // creaza noi markere
  const markers = [
    ['Sala 1 ', 44.44413, 26.04909, 'images/gym.png', 'Program de la 9-22'],
    ['Sala 2 ', 44.44365, 26.05572, 'images/gym.png', 'Program de la 10-20'],
    ['Sala 3 ', 44.43719, 26.05402, 'images/gym.png', 'Program non-stop'],
    ['Sala 4 ', 44.43224, 26.02451, 'images/gym.png', 'Program de la 5-20'],
    ['Sala 5', 44.44131, 26.06145, 'images/gym.png', 'Program de la 10 la 24'],
    ['Sala 6', 44.43137, 26.05293, 'images/gym.png', 'Program de la 7-19'],
    ['Sala 7', 44.42855, 26.04467, 'images/gym.png', 'Program non-stop'],
    ['Sala 8', 44.43193, 26.03377, 'images/gym.png', 'Program de la 12-03'],
    ['Sala 9', 44.42873, 26.04803, 'images/gym.png', 'Program non-stop'],
    ['Sala 10', 44.45312, 26.05215, 'images/gym.png', 'Program de la 4 la 24'],
  ];

  for (let i = 0; i < markers.length; i++) {
    const currMarker = markers[i];

    const marker = new google.maps.Marker({
      position: { lat: currMarker[1], lng: currMarker[2] },
      map: map,
      draggable: false,
      icon: currMarker[3],
    });

    const contentInfo = `
    <h3 id="firstHeading" class="firstHeading">${currMarker[0]}</h3> 
    <h5>${currMarker[4]}</h5>`;

    const infowindow = new google.maps.InfoWindow({
      content: contentInfo,
    });

    marker.addListener('click', () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  }
}

window.initMap = initMap;
