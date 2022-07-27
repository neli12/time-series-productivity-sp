library(plm)

list.files()

data_join <- read.csv("dat_join.csv", sep = ';')[,-2]
data_join$CD_MUN <- as.factor(data_join$CD_MUN)
summary(data_join)
str(data_join)

data_join_pdata <- pdata.frame(data_join, index=c("CD_MUN","YEAR"))


f1 <- value ~ AET + NDVI + NPP + TMIN + TMMX + PR

m1 <- plm(f1, data = data_join_pdata, model = "random", random.method = "walhus",
          effect = "twoways")

summary(m1)
