function initMap() {
  var myLatLng = { lat: 37.66164748749921, lng: 126.99324712753936 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: myLatLng,
    disableDefaultUI: true,
    zoomControl: true
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map,
    icon: "https://img.icons8.com/doodle/50/000000/mountain--v1.png",
  });

}
