
// Load shapefile
var counties = ee.FeatureCollection('users/neli92/counties')
print(counties);


// Import the Landsat 8 BOA image collection for year 2016
var l8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
           .filterBounds(geometry)
           .filterDate('2016-01-01', '2016-12-31')
           .filterMetadata('CLOUD_COVER', 'less_than', 10);
           
print(l8);
Map.addLayer(geometry);

// Create a function to calculate NDVI and apply to the image collection
var NDVI = function(image) {
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  return image.addBands(ndvi);
}

var image_with_NDVI = l8.map(NDVI);
print(image_with_NDVI);


// Make a "greenest" pixel composite.
var greenest = image_with_NDVI.qualityMosaic('NDVI').select('SR_B2', 'SR_B3', 'SR_B4',
'SR_B5', 'SR_B6', 'SR_B7')
print(greenest);


//Export image to drive - if needed
Export.image.toDrive({image: greenest, description: 'greenest', region: geometry, 
scale: 30, maxPixels: 710624025
})

// Display the result.
var visParams = {bands: ['SR_B4', 'SR_B3', 'SR_B2'], max: 10000};
Map.addLayer(greenest, visParams, 'Greenest pixel composite');


// Add reducer output to the Features in the collection.
var greenest_mean = greenest.reduceRegions({
  collection: counties,
  reducer: ee.Reducer.mean(),
  scale: 30,
});

var greenest_median = greenest.reduceRegions({
  collection: counties,
  reducer: ee.Reducer.median(),
  scale: 30,
});

//Plot the resulting shapefiles
Map.addLayer(greenest_mean);
Map.addLayer(greenest_median);

//Export to drive
Export.table.toDrive({
  collection: greenest_mean,
  description:'greenest_mean',
  fileFormat: 'KML'
});

Export.table.toDrive({
  collection: greenest_median,
  description:'greenest_median',
  fileFormat: 'KML'
});
