## Preprocessing of climatic and remote sensing data

## Scripts
- `download_climate.js`: GEE script to download TERRACLIMATE data. I used the following variables:
    - tmmx: maximum temperature
    - tmin: minimum temperature
    - soil: soil moisture
    - aet: actual evapotranspiration
    - pr: precipitation accumulation
- `MODIS_NDVI_time series.js`: download NDVI time series from MODIS in GEE. 
- `LST_MODIS.js`: download LST time series from MODIS in GEE. 
- `script_zonal_statistics.R`: calculate mean raster values inside a polygon from multiple rasters.
