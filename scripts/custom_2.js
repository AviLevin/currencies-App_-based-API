

function getCoinAjax2(coinId, createTime) {
  $.ajax({
    url: "https://api.coingecko.com/api/v3/coins/" + coinId,
    type: "GET",
    success: function(responseCoin) {
      coinItem = {
        id: coinId,
        usd: responseCoin.market_data.current_price.usd,
        eur: responseCoin.market_data.current_price.eur,
        ils: responseCoin.market_data.current_price.ils,
        time: createTime,
        imgSrc: responseCoin.image.small
      };

      CheckAndSaveToLocal(coinId);

      $("#" + coinId).html(`
                <div class="card">
                <img src="${responseCoin.image.small}" alt="">
                <ul>Price another valute
                    <li>UDS:${responseCoin.market_data.current_price.usd}</li>
                    <li>EUR:${responseCoin.market_data.current_price.eur}</li>
                    <li>ILS:${responseCoin.market_data.current_price.ils}</li>
                </ul>
                </div>`);
    }
  });
}

function getCoinAjax3(coinsSpecial1) {
  var multiUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms="; //&tsyms=USD";
  for (let index = 0; index < coinsSpecial1.length; index++) {
    multiUrl += coinsSpecial1[index].toUpperCase() + ",";
  }
  multiUrl += "&tsyms=USD";
  console.log(multiUrl);


}

function CheckAndSaveToLocal(coinId) {
  if (coinsArray1.length == 0) {
    coinsArray1.push(coinItem);
    localStorage.setItem("coinsArray1", JSON.stringify(coinsArray1));
    console.log(coinsArray1);
  } else {
    var isIs = false;
    for (var i = 0; i < coinsArray1.length; i++) {
      if (coinsArray1[i]["id"] == coinId) {
        coinsArray1[i] = coinItem;
        isIs = true;
      }
    }

    if (isIs == false) {
      coinsArray1.push(coinItem);
      localStorage.setItem("coinsArray1", JSON.stringify(coinsArray1));
    }
    console.log(coinsArray1);
  }
}

function checkIsInLocal(coinId) {
  if (coinsArray1.length == 0) {
    return false;
  } else {
    for (var i = 0; i < coinsArray1.length; i++) {
      if (coinsArray1[i]["id"] == coinId) {
        $("#" + coinId).html(`

                         <div class="card">
                         <img src="${coinsArray1[i].imgSrc}" alt="">
                         <ul>Price another valute
                             <li>UDS:${coinsArray1[i].usd}</li>
                             <li>EUR:${coinsArray1[i].eur}</li>
                             <li>ILS:${coinsArray1[i].ils}</li>
       
                         </ul>
                         </div>`);
      } else {
        return false;
      }
    }
  }
}

function saveCoinsToLocal() {
  if (localStorage !== undefined) {
    localStorage.setItem("coinsArray1", JSON.stringify(coinsArray1));
  } else {
    // Sorry! No Web Storage support..
  }
}

function getCoinsFromLocal() {
  if (localStorage !== undefined) {
    coinsArray1 = JSON.parse(localStorage.getItem("coinsArray1"));
  } else {
    // Sorry! No Web Storage support..
  }
}


//       graph    //


function MYgraf() {
  console.log(coinsSpecial1);
  getCoinAjax3(coinsSpecial1);
  var options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Currencies LIve report"
    },
    subtitles: [
      {
        text: "LIVE"
      }
    ],
    axisX: {
      title: "Time"
    },
    axisY: {
      title: "Price in USD",
      titleFontColor: "#4F81BC",
      lineColor: "#4F81BC",
      labelFontColor: "#4F81BC",
      tickColor: "#4F81BC",
      includeZero: false
    },

    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [
      {
        type: "spline",
        name: "EUR",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0 Units",
        dataPoints: [
          { x: new Date(2016, 0, 1), y: 120 },
          { x: new Date(2016, 1, 1), y: 135 },
          { x: new Date(2016, 2, 1), y: 144 },
          { x: new Date(2016, 3, 1), y: 103 },
          { x: new Date(2016, 4, 1), y: 93 },
          { x: new Date(2016, 5, 1), y: 129 },
          { x: new Date(2016, 6, 1), y: 143 },
          { x: new Date(2016, 7, 1), y: 156 },
          { x: new Date(2016, 8, 1), y: 122 },
          { x: new Date(2016, 9, 1), y: 106 },
          { x: new Date(2016, 10, 1), y: 137 },
          { x: new Date(2016, 11, 1), y: 142 }
        ]
      },
      {
        type: "spline",
        name: "RUB",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0 Units",
        dataPoints: [
          { x: new Date(2016, 0, 1), y: 130 },
          { x: new Date(2016, 1, 1), y: 145 },
          { x: new Date(2016, 2, 1), y: 154 },
          { x: new Date(2016, 3, 1), y: 163 },
          { x: new Date(2016, 4, 1), y: 103 },
          { x: new Date(2016, 5, 1), y: 139 },
          { x: new Date(2016, 6, 1), y: 153 },
          { x: new Date(2016, 7, 1), y: 166 },
          { x: new Date(2016, 8, 1), y: 132 },
          { x: new Date(2016, 9, 1), y: 116 },
          { x: new Date(2016, 10, 1), y: 147 },
          { x: new Date(2016, 11, 1), y: 152 }
        ]
      },

      {
        type: "spline",
        name: "ILS",
        // axisYType: "secondary",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "$#,##0.#",
        dataPoints: [
          { x: new Date(2016, 0, 1), y: 190 },
          { x: new Date(2016, 1, 1), y: 200 },
          { x: new Date(2016, 2, 1), y: 273 },
          { x: new Date(2016, 3, 1), y: 200 },
          { x: new Date(2016, 4, 1), y: 202 },
          { x: new Date(2016, 5, 1), y: 290 },
          { x: new Date(2016, 6, 1), y: 304 },
          { x: new Date(2016, 7, 1), y: 325 },
          { x: new Date(2016, 8, 1), y: 202 },
          { x: new Date(2016, 9, 1), y: 272 },
          { x: new Date(2016, 10, 1), y: 335 },
          { x: new Date(2016, 11, 1), y: 325 }
        ]
      }
    ]
  };
  $("#chartContainer").CanvasJSChart(options);

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }
}
