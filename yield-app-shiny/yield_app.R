# load the shiny package
library(shiny)
library(rgdal)
library(DT)
library(dygraphs)
library(xts)
library(leaflet)
library(raster)
library(leaflet)

# in ui


# in server()
data <- read.csv("data/all_data.csv", sep = ';')
summary(data)
map <- readOGR("data/shapefile/SP_Municipios_2021_encoding.shp", encoding =  'UTF-8')

ui <- fluidPage(
  titlePanel(p("Time series sugarcane yield in São Paulo",
               style = "color:#3474A7")),
  
  fluidRow(
    column(4,
           selectInput(
             inputId = "variableselected",
             label = 'Select variable',
             choices = c('YIELD', 'AP', 'NDVI', 'LST', 'tmmx', 'tmin', 'aet',
                         'pr', 'soil', 'ndvi_St', 'lst_st', 'tmin_st', 'tmmx_st',
                         'aet_St', 'pr_st', 'soil_st')
           ),
           selectInput(
             inputId = 'yearselected',
             label = "Select year",
             choices = 2000:2020)
           ),
    column(8,
           leafletOutput(outputId = 'map')
           )
  ),
  
  fluidRow(
    column(6,
           dygraphOutput(outputId = 'timetrend')),
    column(6,
           DTOutput(outputId = "table"))
  )
)




# server()
server <- function(input, output) {
  output$table <- renderDT(data)
  
  output$timetrend <- renderDygraph({
    dataxts <- NULL
    counties <- unique(data$MUN)
    for (l in 1:length(counties)) {
      datacounty <- data[data$MUN == counties[l], ]
      dd <- xts(
        datacounty[, input$variableselected],
        as.Date(paste0(datacounty$YEAR, "-01-01"))
        )
      dataxts <- cbind(dataxts, dd)
    }
    
    colnames(dataxts) <- counties
    
    dygraph(dataxts) %>%
      dyHighlight(highlightSeriesBackgroundAlpha = 0.2) -> d1
    
    d1$x$css <- "
    .dygraph-legend > span{display:none;}
    .dygraph-legend > span.highlight { display:inline; }
    "
    d1
  })
  
  output$map <- renderLeaflet({
    
    datafiltered <- data[which(data$YEAR == input$yearselected), ]
    ordercounties <- match(map@data$NM_MUN, datafiltered$MUN)
    map@data <- datafiltered[ordercounties, ]
    
    map$variableplot <- as.numeric(
      map@data[, input$variableselected]
    )
    
    pal <- colorBin('YlOrRd', domain = map$variableplot, bins = 7)
    labels <- sprintf("%s: %g", map$MUN, map$variableplot) %>%
      lapply(htmltools::HTML)
    
    l <- leaflet(map) %>%
      addTiles() %>%
      addPolygons(
        fillColor = ~pal(variableplot),
        stroke = TRUE,
        color = "black",
        weight = 1,
        fillOpacity = 0.7,
        opacity = 1,
        label = labels
      ) %>%
      leaflet::addLegend(
        pal = pal, values = ~variableplot,
        opacity = 0.7, title = NULL
      )
    
  })
}

# shinyApp()
shinyApp(ui = ui, server = server)


