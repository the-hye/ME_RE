// import { Loader } from "@googlemaps/js-api-loader"

// const loader = new Loader({
//     apiKey: "AIzaSyAklIBFObvvk5RMIRvuG3-tiWTCAwJskxo",
//     version: "weekly",
//     ...additionalOptions,
//   });

//   loader.load().then(() => {
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom: 8,
//     });
//   });

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    mapId: 'f65a864350b0263f'
  });
}