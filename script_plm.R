list.files()

https://github.com/ysd2004/spatialcropyieldJAAE

data_join <- read.csv("dat_join.csv", sep = ';')[,-2]
data_join$CD_MUN <- as.factor(data_join$CD_MUN)
summary(data_join)
str(data_join)

data_join_pdata <- pdata.frame(data_join, index=c("CD_MUN","YEAR"))


f1 <- value ~ AET + NDVI + NPP + TMIN + TMMX + PR

m1 <- plm(f1, data = data_join_pdata, model = "random", random.method = "walhus",
          effect = "twoways")

summary(m1)

str(pdata)

head(pdata$stco)

data("Grunfeld")
str(data_join)
p <- plm(inv ~ value + capital,
         data = Grunfeld, model = "pooling")

wi <- plm(inv ~ value + capital,
          data = grun, model = "within", effect = "twoways")

summary(wi)
data("Wages", package = "plm")
ht <- plm(lwage ~ wks + south + smsa + married + exp + I(exp ^ 2) + 
            bluecol + ind + union + sex + black + ed |
            bluecol + south + smsa + ind + sex + black |
            wks + married + union + exp + I(exp ^ 2), 
          data = Wages, index = 595,
          random.method = "ht", model = "random", inst.method = "baltagi")
summary(ht)


am <- plm(inv ~ value + capital,
          data = grun,
          random.method = "ht", model = "random", inst.method = "am")
summary(am)

write.csv(Grunfeld, 'grunfeld.csv')


grun <- read.csv('grunfeld.csv', sep = ';')

unique(data_join$CD_MUN)

485*21
