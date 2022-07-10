//Load image collection and select the Npp band
var NPP = ee.ImageCollection("MODIS/006/MOD17A3HGF")
                  .filter(ee.Filter.date('2000-01-01', '2021-12-31'))
                  .filterBounds(geometry)
                  .select('Npp')
print(NPP);

var years = ee.List.sequence(2000, 2021);

// Map filtering and reducing across year-month combinations and convert to ImageCollection
var yrMo = ee.ImageCollection.fromImages(
  years.map(function (y) {
            return NPP
              .filter(ee.Filter.calendarRange(y, y, 'year'))
              .mean()
              .set('year',y)
    }).flatten());
print("yrMo",yrMo);

//Convert ImageCollection to bands and clip by geometry
var NPP_clip = yrMo.toBands()
                   .clip(geometry)
                   
print(NPP_clip);

//Export image to Drive
Export.image.toDrive({image: NPP_clip,
                      description: 'NPP_2000-2021',
                      region: geometry,
                      crs: 'EPSG:4326'})