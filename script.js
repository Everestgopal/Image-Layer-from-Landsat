require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/ImageryLayer",
  "esri/layers/support/RasterFunction"
], (Map, MapView, ImageryLayer, RasterFunction) => {
  /***************************************
   * Set up popup template of image layer
   **************************************/
  const imagePopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "Data from {SensorName} satellite",
    content: `
      Rendered RGB values: <b>{Raster.ServicePixelValue} </b>
<br>Original values (B, G, R, NIR): <b>{Raster.ItemPixelValue} </b>
      `
  };
 
  /*******************************************************************
   * Create image layer with server defined raster function templates
   ******************************************************************/
  const ndviRFT = new RasterFunction({
    functionName: "NDVI Raw",
    variableName: "Raster"
  });
 
  const layer = new ImageryLayer({
    url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
    rasterFunction: ndviRFT,
    popupTemplate: imagePopupTemplate
  });
 
  /*************************
   * Add image layer to map
   ************************/
  const map = new Map({
    basemap: "hybrid",
    layers: [layer]
  });
 
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: {
      // Set the coordinates to Chicago, Midwest USA
      x: -87.6298,
      y: 41.8781,
      spatialReference: 4326  // Use WGS 1984 coordinate system
    },
    zoom: 10,
    popup: {
      actions: []
    }
  });
});