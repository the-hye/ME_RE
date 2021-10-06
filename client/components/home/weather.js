

// weather.js
const tmpinfo = document.querySelector(".js-tmpinfo"); //온도
const descriptionNow = document.querySelector(".js-description"); // 표현
const weatherIcon = document.querySelector(".js-weatherIcon"); // ICON

//지도 
const test = document.querySelector(".js-test"); 
const currentlocation = document.querySelector(".js-currentlocation");

const API_KEY = "c818c84362888f7fc2272fd080711580";
const COORDS = "coords";
 
function getWeather(lat, lng) {

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
  )
  
    .then(function (response) { // .then = fetch가 완료 된 후 실행됨
      return response.json(); // json형태로 변환   
    })

    .then(function (json) { // 받아온 날씨정보
      const temperature = Math.round(json.main.temp); // json에서 온도받아옴 Math.round로 소숫점 부분 반올림
      tmpinfo.innerText = `${temperature}` + "°C" ; // html로 넣어줌
      
      

      //날씨정보는 array로 넘어오는데 현재 날씨가 배열의 마지막 이므로 length-1을 통해 최신날씨를 가져온다.
      const weathers = json.weather[json.weather.length -1]; // 날씨정보 표현 josndptj 받아오기
      
      descriptionNow.innerText = `${weathers.main}` ; // html로 날씨정보 표현 
      weatherIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`; // html로 날씨정보 표현 아이콘

    });
}
 
function saveCoords(coordsObj) { // localStorage에 저장
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
 
function handleGeoSucces(position) { // 요청 수락
  const latitude = position.coords.latitude; 
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj); // localStorage에 저장 함수
}
 
function handleGeoError() { // 요청 거절
  console.log("Not allowed.");
}
 
function askForCoords() { // 사용자 위치 요청 (요청 수락, 요청 거절)
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}


function loadCoords() {

  const loadedCoords = localStorage.getItem(COORDS); // localStorage에서 위치정보 가져옴
  // test.innerText = `${loadedCoords}`;

  if (loadedCoords === null) { // 위치 정보가 없으면
    askForCoords(); // 위치 정보 요청 함수
 

  } else {
    const parseCoords = JSON.parse(loadedCoords); // json형식을 객체 타입으로 바꿔서 저장
    getWeather(parseCoords.latitude, parseCoords.longitude); // 날씨 요청 함수
    //여기에 있는 latitude, longitude 이걸 각각 주면 될듯 한데..
    const geocodeToAddress = (parseCoords.latitude +','+parseCoords.longitude);
  }
}

loadCoords();


// 맵초기화..
function initMap() {
  const geocoder = new google.maps.Geocoder();
  // 클릭이벤트발생시
  document.getElementById("submit").addEventListener("click", () => {
    geocodeLatLng(geocoder);
  });
}

//클릭이벤트 발생시
function geocodeLatLng(geocoder) {
  //주소가지고오기
  const loadedCoords = localStorage.getItem(COORDS); // localStorage에서 위치정보 가져옴
  // test.innerText = `${loadedCoords}`;
  // window.alert(loadedCoords);
  if (loadedCoords === null) { // 위치 정보가 없으면
    askForCoords(); // 위치 정보 요청 함수
  } else {
    const parseCoords = JSON.parse(loadedCoords); // json형식을 객체 타입으로 바꿔서 저장
    const geocodeToAddress = (parseCoords.latitude +','+parseCoords.longitude);//주소로 갈 친구들
    // const input = document.getElementById("latlng").value;// , 으로 나뉜 좌표 가져오기
    const latlngStr = geocodeToAddress.split(",", 2);
    const latlng = {
      lat: parseFloat(latlngStr[0]),
      lng: parseFloat(latlngStr[1]),
    };
   
    geocoder //좌표를 주소로 변환
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          //주소 보여주기
          // window.alert(response.results[0].formatted_address );
          currentlocation.textContent = (response.results[0].address_components[2].short_name
           + " " + response.results[0].address_components[1].short_name);
            //.\u00A0 은 빈칸이다
          // test2.innerText = response.results[0].formatted_address; 
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }
}