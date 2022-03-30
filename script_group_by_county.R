list.files()

dat <- read.csv("population_SP_2021.csv", sep = ";")

dat$mun_id <- as.factor(dat$mun_id)
dat$Valor <- as.numeric(dat$Valor)
str(dat)

dat_ag <- aggregate(dat$Valor, by=list(dat$mun_id), FUN = sum)
colnames(dat_ag) <- c("ID", 'POP_2021')

write.csv(dat_ag, "dat_group.csv", row.names = FALSE)
