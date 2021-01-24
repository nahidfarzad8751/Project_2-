var geoData = "./data/myfile.geojson";
createFeatures(geoData);

function createMap(earthquakes) {
  // Creating map object
  var myMap = L.map("map", {
    center: [0, -0],
    zoom: 3,
  });

  // Adding tile layer
  var streetmap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      //id: "mapbox/satellite-v9",
      //id: "mapbox/dark-v10",
      //id: "mapbox/pirates",
      //id: "mapbox/streets-v8"
      accessToken: API_KEY,
    }
  ); //.addTo(myMap);

  // Adding tile layer
  var satellitemap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      //id: "mapbox/streets-v11",
      id: "mapbox/satellite-v9",
      //id: "mapbox/dark-v10",
      //id: "mapbox/pirates",
      //id: "mapbox/streets-v8"
      accessToken: API_KEY,
    }
  ); //.addTo(myMap);

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Satellite Map": satellitemap,
    ASD: idklol, //????????????????????????????????????
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {};

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: false,
    })
    .addTo(myMap);

  // Load in geojson data
  var geoData = "./data/myfile.geojson";
  var geojson;

  console.log(Math.random());
  //Scale = chroma.scale(["lightyellow", "navy"]).domain([1, 100000], 7, "log");
  // Grab data with d3
  var idklol = d3.json(geoData, function (data) {
    // Create a new choropleth layer
    console.log(data);
    geojson = L.choropleth(data, {
      // Define what  property in the features to use
      //valueProperty: "Happiness_Rank",
      valueProperty: "Happiness_Score",
      // valueProperty: "Family",
      //valueProperty: "Health",
      // valueProperty: "Freedom",
      // valueProperty: "Generosity",
      //valueProperty: "Trust",
      // Set color scale
      //https://gka.github.io/palettes/#/9|s|4a8ccf,42fca1,990000|ffffe0,ff005e,93003a|0|1
      //https://gka.github.io/chroma.js/
      scale: [
        "#990000",
        "#bc3f47",
        "#bc5f5c",
        "#b97b71",
        "#b49585",
        "#abad96",
        "#a0c6a3",
        "#94dea6",
        "#95f766",
      ],
      //scale: Scale,
      //Number of breaks in step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // /Border color: "black"
        color: "#000000",
        weight: 2,
        fillOpacity: 0.75,
      },
      //
      // Binding a pop-up to each layer
      onEachFeature: function (feature, layer) {
        //console.log(L.choropleth.valueProperty);
        layer.bindPopup(
          "Country Name: " +
            feature.properties.name +
            "<br>World Happiness:<br>" +
            "" +
            feature.properties.Happiness_Score
        );
      },
    }).addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      var div = L.DomUtil.create("div", "info legend"); // creates html element with tagname div and class name info and legend
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];

      // Add min & max
      var legendInfo =
        "<h1>World Happiness</h1>" +
        '<div class="labels">' +
        '<div class="min">' +
        limits[0] +
        "</div>" +
        '<div class="max">' +
        limits[limits.length - 1] +
        "</div>" +
        "</div>";

      div.innerHTML = legendInfo;

      limits.forEach(function (limit, index) {
        labels.push(
          '<li style="background-color: ' + colors[index] + '"></li>'
        );
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);
  });
}

createMap();
