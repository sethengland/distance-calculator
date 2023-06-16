function calculateDistanceAddresses() {
  var pointA = document.getElementById("addressA").value;
  var pointB = document.getElementById("addressB").value;

  if (pointA === "" || pointB === "") {
    alert("Please enter both addresses.");
    return;
  }

  getCoordinates(pointA, function (latitudeA, longitudeA) {
    if (!(latitudeA && longitudeA)) {
      alert("Unable to get coordinates for Address A.");
      return;
    }

    getCoordinates(pointB, function (latitudeB, longitudeB) {
      if (!(latitudeB && longitudeB)) {
        alert("Unable to get coordinates for Address B.");
        return;
      }
      var distance = calculateAirDistance(latitudeA, longitudeA, latitudeB, longitudeB);

      document.getElementById("resultByAddress").textContent = "Distance: " + distance.toFixed(2) + " km";
    });
  });
}


function getCoordinates(address, callback) {
  var geocodingAPIKey = `4b08bae187cfa6236d10f3dc7b4ec4c2`
  var geocodingEndpoint = `http://api.positionstack.com/v1/forward?access_key=${encodeURIComponent(geocodingAPIKey)}&query=${address}`;
  fetch(geocodingEndpoint)
    .then(response => response.json())
    .then(data => {
      if (data.data && data.data.length > 0) {
        var result = data.data[0];
        var latitude = result.latitude
        var longitude = result.longitude
        callback(latitude, longitude);
      } else {
        callback(null);
      }
    })
    .catch(error => {
      console.error("Error fetching coordinates:", error);
      callback(null);
    });
}
function calculateDistanceCoords() {
  var pointA = document.getElementById("pointA").value;
  var pointB = document.getElementById("pointB").value;

  if (pointA === "" || pointB === "") {
    alert("Please enter both points.");
    return;
  }

  var coordinatesA = pointA.split(",");
  var coordinatesB = pointB.split(",");
  
  if (coordinatesA.length !== 2 || coordinatesB.length !== 2) {
    alert("Invalid input. Please enter latitude and longitude separated by a comma.");
    return;
  }
  
  var latitudeA = parseFloat(coordinatesA[0]);
  var longitudeA = parseFloat(coordinatesA[1]);
  
  var latitudeB = parseFloat(coordinatesB[0]);
  var longitudeB = parseFloat(coordinatesB[1]);
  
  if (isNaN(latitudeA) || isNaN(longitudeA) || isNaN(latitudeB) || isNaN(longitudeB)) {
    alert("Invalid input. Please enter valid latitude and longitude values.");
    return;
  }

  var distance = calculateAirDistance(latitudeA, longitudeA, latitudeB, longitudeB);

  document.getElementById("resultByCoords").textContent = "Distance: " + distance.toFixed(2) + " km";
}
function calculateAirDistance(lat1, lon1, lat2, lon2) {
  var earthRadius = 6371; // in kilometers

  var latDiff = toRadians(lat2 - lat1);
  var lonDiff = toRadians(lon2 - lon1);

  var a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
  
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  var distance = earthRadius * c;
  
  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
  