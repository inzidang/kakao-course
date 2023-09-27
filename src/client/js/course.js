const locationMap = document.getElementById("location-map");
let map;
let markers = [];
let isMapDrawn = false;
let userLatitude;
let userLongitude;


// console.log(locationMap)
const drawMap = (latitude, longitude) => {
    const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level : 3
    };
    map = new kakao.maps.Map(locationMap, options);
    map.setZoomable(false);
}

const deleteMarkers = () => {
    for (let i=0 ; i < markers.length; i++) {
       markers[i].setMap(null);
    }
    markers = [];
}

const addUserMarker = () => {
    let marker = new kakao.maps.Marker({
        map : map,
        position : new kakao.maps.LatLng(userLatitude, userLongitude)
    });
    // marker.setMap(map);
    markers.push(marker);

}

const addCourseMarker = () => {
    let markerImage = "/file/map_not_done.png" ;
    let markerSize = new kakao.maps.Size(24, 35);

    const image = new kakao.maps.MarkerImage(markerImage, markerSize);
    const position = new kakao.maps.LatLng(35.87571634861952, 128.681469239788);
    new kakao.maps.Marker({
        map : map,
        position : position,
        title : "영진",
        image : image
    })
}


const configurationLocationWathch = () => {
    if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
    deleteMarkers();

        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;
        if(!isMapDrawn) { // !false; => true
            // console.log("지도그려짐");
            drawMap(userLatitude, userLongitude)
            isMapDrawn = true;
        }
        // 유저 마커
        addUserMarker();
        panTo(userLatitude, userLongitude);
        
        
        
    })
}
}



drawMap(35.87571634861952, 128.681469239788)
addCourseMarker();
configurationLocationWathch();
