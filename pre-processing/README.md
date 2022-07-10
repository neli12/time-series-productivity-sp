## Preprocessing of climatic and remote sensing data

In this repository you'll find the scripts used to obtain the data for this project. At first, all of the data was downloaded from the Google Earth Engine platform and further processing were conducted in QGIS.

## Scripts
- `download_climate.js`: GEE script to download TERRACLIMATE data. I used the following variables:
    - tmmx: maximum temperature
    - tmin: minimum temperature
    - soil: soil moisture
    - aet: actual evapotranspiration
    - pr: precipitation accumulation
- `MODIS_NDVI_time series.js`: download NDVI time series from MODIS in GEE.
- `NPP_MODIS.js`: download Net Primary Productivity time series from MODIS in GEE. 
- `LST_MODIS.js`: download LST time series from MODIS in GEE.
- `join_csv.ipynb`: join csv files by a column. 
