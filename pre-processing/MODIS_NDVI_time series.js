
//Calculate average monthly NDVI for São Paulo
//Load MODIS collection and select the NDVI band
var NDVI = ee.ImageCollection('MODIS/006/MOD13A1')
             .select('NDVI')
             .filterBounds(geometry);

//Create two list for months and years
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(2016, 2020);

// Map filtering and reducing across year-month combinations and convert to ImageCollection
var yrMo = ee.ImageCollection.fromImages(
  years.map(function (y) {
        return months.map(function (m) {
            return NDVI
              .filter(ee.Filter.calendarRange(y, y, 'year'))
              .filter(ee.Filter.calendarRange(m, m, 'month'))
              .mean()
              .set('year',y)
              .set('month',m);
        });
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
                      description: 'NDVI_2016-2020',
                      region: geometry,
                      crs: 'EPSG:4326'})