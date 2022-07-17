<img src = "https://img.shields.io/github/last-commit/neli12/time-series-productivity-sp"> <img src = "https://img.shields.io/github/languages/count/neli12/time-series-productivity-sp"> <img src = "https://img.shields.io/github/license/neli12/time-series-productivity-sp?color=green"> <img src = "https://img.shields.io/github/watchers/neli12/time-series-productivity-sp?style=social">

# Prediction of sugarcane productivity in the municipalities of the State of São Paulo

For a description in portuguese, see the README_pt.md file.

This repository contains the main steps to analyze time series of sugarcane productivity in the State of São Paulo. It is part of a final project necessary to obtain an MBA in Data Science and Analytics from the University of São Paulo. In this project, I will show how I used publicly available data to better understand how sugarcane productivity has been over the last 21 years (2000-2020) and how this data can be used to predict future sugarcane yields.

The first steps consisted of gathering all the necessary data. Productivity, planted area and other relevant datasets were obtained from the [SIDRA platform](https://sidra.ibge.gov.br/tabela/1612) platform of the IBGE (Brazilian Institute of Geography and Statistics). Weather and remote sensing variables were obtained and processed on the [Google Earth Engine platform](https://earthengine.google.com/) platform. TERRACLIMATE was used to obtain soil moisture, minimum and maximum temperature, precipitation and evapotranspiration. The land surface temperature (LST), the Nomalized Difference Vegetation Index (NDVI) and the Net Primary Productivity (NPP) were obtained from MODIS (Moderate Resolution Imaging Spectroradiometer), which has daily data whose average was calculated for each year. The scripts used to collect and preprocess the data are described in the `pre-processing` folder.

In the file `Data analysis and cleaning.ipynb` is the code I used to process the data, from loading the tables, to plotting some data to get an idea of how the data varies across the state. One of the first results is the figure below, which represents the average sugarcane productivity of all municipalities for all years.

![yield data](https://github.com/neli12/time-series-productivity-sp/blob/main/plot_average_st_yield_ii.png)
