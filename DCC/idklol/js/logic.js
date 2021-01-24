//https://gist.github.com/nickpeihl/b6d09258bed0cafdd653de2278f96c17

var map = L.map("map").setView([37.8, -96], 3);

var satellitemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY,
  }
).addTo(map);

var streetsmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  }
).addTo(map);

var darkmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY,
  }
).addTo(map);

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Satellite Map": satellitemap,
  "Streets Map": streetsmap,
  "Dark Map": darkmap,
};

L.control.layers(baseMaps).addTo(map);

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML =
    "<h4>US Population Density</h4>" +
    (props
      ? "<b>" +
        props.name +
        "</b><br />" +
        props.Health +
        " people / mi<sup>2</sup>"
      : "Hover over a state");
};

info.addTo(map);

// get color depending on population density value
function getColorHealth(d) {
  //console.log(typeof d3.max(d, (dd) => +dd.value()));
  return d > 1.3
    ? "#4a8ccf"
    : d > 1.1
    ? "#4a8ccf"
    : d > 0.9
    ? "#E31A1C"
    : d > 0.7
    ? "#FC4E2A"
    : d > 0.5
    ? "#FD8D3C"
    : d > 0.3
    ? "#FEB24C"
    : d > 0.1
    ? "#FED976"
    : "#000000";
}

//Overall border and color styling
function style(feature) {
  //console.log(feature);
  return {
    weight: 2,
    opacity: 1,
    color: "white", //border color
    dashArray: "3",
    fillOpacity: 0.7,
    fillColor: getColorHealth(feature.properties.Health),
  };
  console.log(feature);
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.9,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}

geojson = L.geoJson(statesData, {
  style: style, //A Function defining the Path options for styling GeoJSON lines and polygons, called internally when data is added
  onEachFeature: onEachFeature, //A Function that will be called once for each created Feature, after it has been created and styled
}).addTo(map);

map.attributionControl.addAttribution(
  'Population data &copy; <a href="http://census.gov/">US Census Bureau</a>'
);

var legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
    labels = [],
    from,
    to;

  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<i style="background:' +
        getColorHealth(from + 1) +
        '"></i> ' +
        from +
        (to ? "&ndash;" + to : "+")
    );
  }

  div.innerHTML = labels.join("<br>");
  return div;
};

legend.addTo(map);
