
<img src = "https://img.shields.io/github/last-commit/neli12/time-series-productivity-sp"> <img src = "https://img.shields.io/github/languages/count/neli12/time-series-productivity-sp"> <img src = "https://img.shields.io/github/license/neli12/time-series-productivity-sp?color=green"> <img src = "https://img.shields.io/github/watchers/neli12/time-series-productivity-sp?style=social">

# Predição da produtividade da cana-de-açúcar nos municípios do Estado de São Paulo

Este repositório contém os principais passos para analisar séries temporais da produtividade de cana-de-açúcar no Estado de São Paulo. Faz parte de um projeto final necessário para a obtenção do título de MBA em Data Science and Analytics pela Universidade de São Paulo. Neste projeto, mostrarei como usei dados públicos disponíveis para entender melhor como foi a produtividade da cana-de-açúcar nos últimos 21 anos (2000-2020) e como esses dados podem ser usados para prever produtividades futuras.

Os primeiros passos consistiram em reunir todos os dados necessários. Produtividade, produtividade e área plantada foram obtidos da plataforma [SIDRA](https://sidra.ibge.gov.br/tabela/1612) do IBGE (Instituto Brasileiro de Geografia e Estatística). Variáveis climáticas e de sensoriamento remoto foram obtidas e processadas na plataforma do [Google Earth Engine](https://earthengine.google.com/). O TERRACLIMATE foi utilizado para obtenção da umidade do solo, temperatura mínima e máxima, precipitação e evapotranspiração. A temperatura da superfície terrestre (LST), o Índice de Vegetação por Diferença Nomalizada (NDVI) e a Produtividade Primária Líquida (NPP) foram obtidos do MODIS (Moderate Resolution Imaging Spectroradiometer), que possui dados diários cuja média foi calculada para cada ano. Os scripts usados para coletar e pré-processar os dados são descritos na pasta `pre-processing`.  

No arquivo `Análise e limpeza de dados.ipynb` está o código que eu utilizei para processar os dados, desde carregar as tabelas, até plotar algunos dados para ter uma ideia de como os dados variam em todo o estado. Um dos primeiros resultados é a figura embaixo, que representa a produtividade média da cana-de-açucar de todos os municípios para todos os anos. 

![yield data](https://github.com/neli12/time-series-productivity-sp/blob/main/plot_average_st_yield_ii.png)  

Em breve mais atualizações!
