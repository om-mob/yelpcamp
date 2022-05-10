console.log(coordinates);
mapboxgl.accessToken = `${mapboxToken}`;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/satellite-v9", // style URL
  // other styles: streets-v11, satellite-v9, light-v10, dark-v10, outdoors-v11
  center: coordinates, // starting position [lng, lat]
  zoom: 2, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h6>${campground.title}</h6>`)
  )
  .addTo(map);
