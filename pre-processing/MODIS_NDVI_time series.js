
//Calculate average monthly NDVI for São Paulo
//Load MODIS collection and select the NDVI band
var NDVI = ee.ImageCollection('MODIS/006/MOD13A1')
             .select('NDVI')
             .filterDate("2000-01-01", "2020-12-31")
             .filterBounds(geometry);

//Create two list for months and years
var years = ee.List.sequence(2000, 2020);

// Map filtering and reducing across year-month combinations and convert to ImageCollection
var yrMo = ee.ImageCollection.fromImages(
  years.map(function (y) {
            return NDVI
              .filter(ee.Filter.calendarRange(y, y, 'year'))
              .mean()
              .set('year',y)
    }).flatten());
print("yrMo",yrMo);

//Plot image
Map.addLayer(yrMo, {min: 3598, max: 9800,
                   palette: ['#4c971d', '#fcff43', '#ff5919']})

//Convert ImageCollection to bands and clip by geometry
var NDVI_image = yrMo.toBands()
                     .clip(geometry)
                     
print(NDVI_image);

//Export image to Drive
Export.image.toDrive({image: NDVI_image,
                      description: 'NDVI_2000-2020',
                      region: geometry,
                      crs: 'EPSG:4326'})
