var coinsArray1 = [];
var coinsSpecial1= [];
var allCoins1 = [];



// =====================================



function saveCoinsToLocal1() {
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

  }
}

$(document).ready(function() {
  console.log(allCoins1);


  
$(document).ajaxStart(function(){
  $('.loader').css("display", "block");
});


$(document).ajaxComplete(function(){
  $(".loader").css("display", "none");
});




  $.ajax({
    url: "https://api.coingecko.com/api/v3/coins/list",
    type: "GET",
    success: function(response) {
      for (let index = 0; index < 14; index++) {
        let coinItem = {
          id: response[index].id,
          symbol: response[index].symbol,
          name: response[index].name
        };
        allCoins1.push(coinItem);

        $("#output").append(`
                    <div class="card col-sm-6 col-md-4 col-lg-3 col-xl-2">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-sm-8">
                        <p class="card-header">${response[index].symbol}</p>
                        </div>
                        <div class="col-sm-4">
                        <label class="switch">
                         <input type="checkbox" class="toggle-group" data-group="${
                           response[index].symbol
                         }">
                        <span class="slider round"></span>
                        </label>
                        </div>
                        </div>

                        </div>
                        <div class="card-body">
                            <p class="card-text">${response[index].name}</p>
                            <button class="btn btn-info moreInfoBtn" data-id="${
                              response[index].id
                            }">More info.....</button>
                        </div>
                        <div class="moreInfo" id="${response[index].id}">
                        </div>
                        <div class="spinner-border spinner-border-sm" id="wait"></div>
                    </div>
                    `);
      }


      $(".chkToggle").bootstrapToggle();
      $(".moreInfo").hide("slow");

      $(".moreInfoBtn").on("click", function() {
        $(this).text(function(i, text) {
          return text === "More info....."
            ? ".....less info"
            : "More info.....";
        });

        var createTime = Date.now();
        var coinId = $(this).attr("data-id");
      

        $(".moreInfo").hide(1000);
        $(this)
          .parent()
          .parent()
          .children(".moreInfo")
          .html("");
        $("#" + coinId).slideToggle(1000);

        getCoinAjax2(coinId, createTime);

        $(document).ajaxStart(function() {
          $("#wait").css("display", "block");
        });

        $(document).ajaxComplete(function() {
          $("#wait").css("display", "none");
        });
      });

      $(".toggle-group").on("click", function() {
        var coinSpecialId1 = $(this).attr("data-group");
        console.log(coinSpecialId1);

        // console.log(coinsSpecial);
        if (coinsSpecial1.length < 5 && $(this).is(":checked")) {
          coinsSpecial1.push(coinSpecialId1);
          console.log(coinsSpecial1);
        } else if (coinsSpecial1.length <= 5 && !$(this).is(":checked")) {
          for (var i = 0; i < coinsSpecial1.length; i++) {
            if (coinsSpecial1[i] === coinSpecialId1 ){
              coinsSpecial1.splice(i, 1);
              console.log(coinsSpecial1);
            }
          }
        } else if (coinsSpecial1.length >= 5 && $(this).is(":checked")) {
       
          $(".modal-body").html("");
          for (let index = 0; index < coinsSpecial1.length; index++) {
           
            $(".modal-body").append(`<div class="row">
                        <div class=" col-sm-9">
                      <span class="modal-item">${coinsSpecial1[index]}</span> 
                      </div> 
                      <div class=" col-sm-3">
                      
                      <label class="switch">
                     <input type="checkbox" checked class="delete-coin" data-id="${
                       coinsSpecial1[index]
                     }" data-group="${coinsSpecial1[index]}">
                     <span class="slider round"></span>
                        </label></div>
                        </div>
                            
                        
`);
            $(".delete-coin").on("click", function() {
              let coinSpecialIdDelete = $(this).attr("data-id");

              if (!$(this).is(":checked")) {
                for (var i = 0; i < coinsSpecial1.length; i++) {
                  if (coinsSpecial1[i] === coinSpecialIdDelete) {
                    coinsSpecial1.splice(i, 1);
                    console.log(coinsSpecial1);
                    $(
                      'input[type="checkbox"][data-group="' +
                        coinSpecialIdDelete +
                        '"]'
                    ).prop("checked", false);
                  }
                }
              } else if ($(this).is(":checked") && coinsSpecial1.length < 5) {
                if (
                  coinsSpecial1[coinsSpecial1.length - 1] !== coinSpecialIdDelete
                ) {
                  coinsSpecial1.push(coinSpecialIdDelete);
                  $(
                    'input[type="checkbox"][data-group="' +
                      coinSpecialIdDelete +
                      '"]'
                  ).prop("checked", true);

                  console.log(coinsSpecial1);
                }
              }
            });
          }
          $("#myModal").modal();

          return false;
        }
      });
    }
  });



    // search filters!!//

  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#output .card").filter(function() {
      $(this).toggle($(this).html().toLowerCase().indexOf(value) > -1)
    });
  });





  
}); //end


// ==========================//




