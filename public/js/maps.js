//Option 1 With the apikey only

let platform = new H.service.Platform({
  'apikey': '0oNJeGPBU67gEfSAiO1uaYCyBRuj7fPa3RYP7sFVZik'
  });

//Option 2 with 
  // let platform = new H.service.Platform({
  //   'app_id': '5hhGXL2XcevVZ4FevAS3',
  //   'app_key': '0oNJeGPBU67gEfSAiO1uaYCyBRuj7fPa3RYP7sFVZik'
  // });
  


function landmarkGeocode() {
  let title = document.querySelector('h1').textContent;
  var geocoder = platform.getGeocodingService(),
    landmarkGeocodingParameters = {
      searchtext: title,
      jsonattributes : 1
    };

  geocoder.search(
    landmarkGeocodingParameters,
    showMap,
    (e) => console.log(e)
  );
}
function showMap(result) { 
  let location = result.response.view[0].result[0].place.locations[0].displayPosition;
  // Obtain the default map types from the platform object:
  let defaultLayers = platform.createDefaultLayers();
  let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.raster.normal.map,
    {
      zoom: 15,
      center: { lat: location.latitude, lng: location.longitude },
      engineType: H.map.render.RenderEngine.EngineType.P2D
    });
    let marker = new H.map.Marker({lat: location.latitude, lng: location.longitude });
    map.addObject(marker);
 // Create the default UI:
 var ui = H.ui.UI.createDefault(map, defaultLayers);
 }

// Instantiate (and display) a map object:

landmarkGeocode();
