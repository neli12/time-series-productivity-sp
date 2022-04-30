//Load and filter collection
var LST = ee.ImageCollection('MODIS/061/MOD11A1')
                  .filter(ee.Filter.date('2016-01-01', '2020-12-01'))
                  .filterBounds(geometry)
                  .select('LST_Day_1km');
print(LST);

// Plot map
var LST_vis = {min: 13000.0, max: 16500.0, palette: [
  '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};

Map.addLayer(LST, LST_vis, 'Land Surface Temperature');
    
//Create two list for months and years
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(2016, 2020);

// Map filtering and reducing across year-month combinations and convert to ImageCollection
var yrMo = ee.ImageCollection.fromImages(
  years.map(function (y) {
        return months.map(function (m) {
            return LST
              .filter(ee.Filter.calendarRange(y, y, 'year'))
              .filter(ee.Filter.calendarRange(m, m, 'month'))
              .mean()
              .set('year',y)
              .set('month',m);
        });
    }).flatten());
print("yrMo",yrMo);

//Convert ImageCollection to bands and clip by geometry
var LST_clip = yrMo.toBands()
                   .clip(geometry)
                   
print(LST_clip);

//Export image to Drive
Export.image.toDrive({image: LST_clip,
                      description: 'LST_2016-2020',
                      region: geometry,
                      crs: 'EPSG:4326'})