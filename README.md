<img src = "https://img.shields.io/github/last-commit/neli12/time-series-productivity-sp"> <img src = "https://img.shields.io/github/languages/count/neli12/time-series-productivity-sp"> <img src = "https://img.shields.io/github/license/neli12/time-series-productivity-sp?color=green"> <img src = "https://img.shields.io/github/watchers/neli12/time-series-productivity-sp?style=social">

# Time series analysis of sugarcane productivity in São Paulo State
This repository hold the steps followed to analyse and conduct time series analysis of past sugarcane productivity in the State of São Paulo. It is part of a final project required to obtain the title of MBA in Data Science and Analytics from the University of São Paulo. In this project, I will show how I used public available data to better understand how was the productivity of sugarcane in the past 21 years (2000-2020) and how this data can be used to predict future yields.  

The first steps consisted in gathering all the necessary data. Yield, productivity and planted area were retrieved from the [SIDRA platform](https://sidra.ibge.gov.br/tabela/1612) of IBGE (Instituto Brasileiro de Geografia e Estatística). Climatic and remote sensing variables were obtained and processed in the [Google Earth Engine platform](https://earthengine.google.com/). TERRACLIMATE was used to obtain soil moisture, minimum and maximum temperature, precipitation and evapotranspiration. Land surface temperature (LST) and the Nomalized Difference Vegetation Index (NDVI) were obtained from MODIS (Moderate Resolution Imaging Spectroradiometer), which has daily data that were averaged for each year. The scripts used for gathering and pre-processing the data is described in `pre-processing` folder.  

All the data for each county is stored in the all_data csv file. With this file, I am running some data exploratory data analysis. You can find more in the script `Time series yield EDA.ipynb`. After analyzing some data, I came with the figure below, which display the average and standard deviation of sugarcane yield over the years (20) years.

![yield data]([https://github.com/neli12/time-series-productivity-sp/blob/main/plot_average_st_yield_ii.png])
