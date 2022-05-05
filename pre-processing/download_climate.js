// Load image collection from TERRACLIMATE
var dataset = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
                  .filter(ee.Filter.date('2000-01-01', '2020-12-31'))
                  .filterBounds(geometry);                 
print(dataset);
                  
var tmmx = dataset.select('tmmx');
var tmin = dataset.select('tmmn');
var aet = dataset.select('aet');
var pr = dataset.select('pr');
var soil = dataset.select('soil');

//Create a list of years
var years = ee.List.sequence(2000, 2020);

// Map filtering and reducing across year-month combinations and convert to ImageCollection
// T max
var tmmx_years = ee.ImageCollection.fromImages(
  years.map(function (y) {
            return tmmx
              .filter(ee.Filter.calendarRange(y, y, 'year'))
              .mean()
              .set('year',y)
    }).flatten());
print("tmmx_years", tmmx_years);

// T min                    
var tmin_years = ee.ImageCollection.fromImages(
  years.map(function (y) {
            return tmin
              .filter(ee.Filter.calendarRange(y, y, 'year'))
              .mean()
              .set('year',y)
    }).flatten());
print("tmin_years", tmin_years);


// aet
var aet_years = ee.ImageCollection.fromImages(
  years.map(function (y) {
            return aet
              .filter(ee.Filter.calendarRange(y, y, 'year'))
              .mean()
              .set('year',y)
    }).flatten());
print("aet_years", aet_years);

// pr                    
var pr_years = ee.ImageCollection.fromImages(
  years.map(function (y) {
            return pr
              .filter(ee.Filter.calendarRange(y, y, 'year'))
              .mean()
              .set('year',y)
    }).flatten());
print("pr_years", pr_years);

// Soil
var soil_years = ee.ImageCollection.fromImages(
  years.map(function (y) {
            return soil
              .filter(ee.Filter.calendarRange(y, y, 'year'))
              .mean()
              .set('year',y)
    }).flatten());
print("soil_years", soil_years);


//To bands and cliping 
var tmmx_bands = tmmx_years.toBands()
                     .clip(geometry)                  

var tmin_bands = tmin_years.toBands()
                     .clip(geometry)
                     
var aet_bands = aet_years.toBands()
                     .clip(geometry)
                     
var pr_bands = pr_years.toBands()
                     .clip(geometry)
                     
var soil_bands = soil_years.toBands()
                     .clip(geometry)
                                                                                   
print(tmmx_bands)
print(tmin_bands)
print(aet_bands)
print(pr_bands)
print(soil_bands)

//Export scene to drive
Export.image.toDrive({image: tmmx_bands, 
                      description: "tmmx_bands", region: geometry,
                      crs: 'EPSG:4326', maxPixels: 1835012515})
                      
Export.image.toDrive({image: tmin_bands, 
                      description: "tmin_bands", region: geometry,
                      crs: 'EPSG:4326', maxPixels: 1835012515})
                      
Export.image.toDrive({image: aet_bands, 
                      description: "aet_bands", region: geometry,
                      crs: 'EPSG:4326', maxPixels: 1835012515})
                      
Export.image.toDrive({image: pr_bands, 
                      description: "pr_bands", region: geometry,
                      crs: 'EPSG:4326', maxPixels: 1835012515})
                      
Export.image.toDrive({image: soil_bands, 
                      description: "soil_bands", region: geometry,
                      crs: 'EPSG:4326', maxPixels: 1835012515})
