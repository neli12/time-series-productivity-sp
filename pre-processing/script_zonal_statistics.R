## Load libraries
library(raster)
library(rgdal)

## Set working directory
setwd("C:/Users/FREY/Documents")
list.files()

## Load raster and shapefile
comb <- stack('combined.tif')
shp <- shapefile('SP_Municipios_2021.shp')
plot(comb)

## Unstack
comb_stack <- unstack(comb)


#extract raster cell mean within each polygon area
for (i in 1:length(comb_stack)){
  ex1 <- extract(comb, shp, fun=mean, na.rm=TRUE, df=TRUE)
}

#write to a CSV file
write.csv(df, file = "extrac_by_polygon.csv")