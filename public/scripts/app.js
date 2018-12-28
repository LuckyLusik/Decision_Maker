$(document).ready(function() {
  var addChoice = 0;
  let numChoices = document.getElementsByClassName("choice_rank");
  let starNumber = "";
  let starDig = "";
  let choiceNumber = "";


  $("#addchoice").click(function() {
    if (addChoice === 0){
      $(".newchoice3").slideDown("slow");
      addChoice += 1;
    } else {
      if (addChoice === 1){
      $(".newchoice4").slideDown("slow");
      $("#rem3").css('visibility', 'hidden');
      addChoice += 1;
      } else {
        if (addChoice === 2){
          $(".newchoice5").slideDown("slow");
          $("#rem4").css('visibility', 'hidden');
          addChoice += 1;
          $("#addchoice").attr("disabled", "disabled");
        }
      }
    }
  });

    console.log("choice clicked", document.getElementsByClassName("choice_rank"))
    
    $(".choice_rank").click(function(event) {
      starNumber = event.target.id;
      starDig = starNumber.slice(8);
      choiceNumber = starNumber.slice(2, 3);
      for (let i = 1; i <= numChoices.length; i++) {
        $(`.class${starDig}`).addClass("taken");
        $(`#ch${i}-star${starDig}`).attr("disabled", "disabled");
      }
      if (event.target.value) {
        $(`.block${choiceNumber}`).css("pointer-events" , "none");
      }
    });
    // on submit  it auto shows as red. Need code to check blank fields to show red only.
    $("#poll-info").submit(function(event) {
      event.preventDefault();
      if (document.getElementById("name-adm").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter your name!</p>`);
        $("#name-adm").addClass("redd");
      }
      if (document.getElementById("email-admin").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter an email!</p>`);
        $("#email-admin").addClass("redd");
      }
      if (document.getElementById("end-date").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter an end date!</p>`);
        $("#end-date").addClass("redd");
      }
      if (document.getElementById("end-time").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter an end time!</p>`);
        $("end-time").addClass("redd");
      }
      if (document.getElementById("poll-title").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter a poll title!</p>`);
        $("#poll-title").addClass("redd");
      }
      if (document.getElementById("choice1").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter a title for choice one!</p>`);
        $("#choice1").addClass("redd");
      }
      if (document.getElementById("choice2").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter a title for choice two!</p>`);
        $("#choice2").addClass("redd");
      }
      $(".alert, .alert-danger").slideDown("slow");
      
    });

    $("#poll-info").on("click", function() {
      $(".alert, .alert-danger").slideUp("slow", function(){
        $(".rank-ch").remove();
      });
      $("input").removeClass("redd");
    });
    
    // when someone starts typing, red is removed
    // $("#poll-info").on( "keyup", function() {
    //   $(".alert, .alert-danger").slideUp("slow");
    //   $("input").removeClass("redd");
    // });

   $("#reset-btn").click(function(event) {
     console.log('Reset Button: ', numChoices.length)
    for (let i = 1; i <= numChoices.length; i++) {
      $(`.class${i}`).removeClass("taken");
      $(`.block${i}`).css("pointer-events" , "auto");
      $(`.block${i}`).attr("value" , "");
      $( ".rating input" ).prop( "checked", false );
      for (let j = 1; j <= numChoices.length; j++){
        $(`#ch${i}-star${j}`).removeAttr("disabled");
      }
    }
  });


  $("#rem3").click(function() {
    $(".newchoice3").slideUp("slow");
    addChoice -= 1;
  });

  $("#rem4").click(function() {
    $(".newchoice4").slideUp("slow");
    $("#rem3").css('visibility', 'visible');
    addChoice -= 1;
  });

  $("#rem5").click(function() {
    $(".newchoice5").slideUp("slow");
    $("#rem4").css('visibility', 'visible');
    addChoice -= 1;
    $("#addchoice").removeAttr("disabled");
  });

  $("#formData").on("submit", function(event) {
      event.preventDefault();
      const numBlocks = document.getElementsByClassName("choice_rank")  
      let allRatingsCompleted = false;
      for (let j = 0; j <= numBlocks.length; j++) {
        for (let i = 0; i <= numBlocks.length; i++) {
            $(`#ch${i}-star${j}`).removeAttr("disabled");
        } 
      }
      serialized = $('#formData').serializeArray();
      let voteValue= {};
      let checkedChoice = false;
      // let voteDuplicate = false;
      const shortUrl = location.pathname.split('/vl/');
      const remove = shortUrl.shift();
      const voterNameText = voteValue[serialized[0].voter-name];
      
      if (document.getElementById("voter-name").value === "") {
        $("#check-rank-form").append(`<p class="rank-ch">Please, enter your name!</p>`);
        $("input").addClass("redd");
      }
      for (let z = 1; z <= numChoices.length; z++) {
        for (let x = 1; x <= numChoices.length; x++) {
          if ($(`#ch${z}-star${x}`).prop("checked")) {
            checkedChoice = true;
          }
        }
        if (checkedChoice === false) {
          $("#check-rank-form").append(`<p class="rank-ch">Please, rank Choice #${z}!</p>`);
          $(".alert, .alert-danger").slideDown("slow");
        }
        checkedChoice = false;
      }
      // if (voterNameText === ""){
      //   console.log('vote clear triggered - Blank Name');
      //   $(".alert, .alert-danger").slideDown("slow");
      // };
      console.log('formData: ',shortUrl, serialized)

      
      // for(let x = 0; x <= numBlocks.length; x++){
      //   if (document.getElementsByClassName("block1").style['pointer-events']="auto") {
      //     return "there is incomplete field"
      //   } 
      // }
      
      // Validation Form of votes:
  
  // $("#formData").submit(function(event) {
  //   event.preventDefault();
  //   if (document.getElementById("voter-name").value === "") {
  //     $("#check-rank-form").append(`<p class="rank-ch">Please, enter your name!</p>`);
  //     $("input").addClass("redd");
  //   }
  //   for (let z = 1; z <= numChoices.length; z++) {
  //     for (let x = 1; x <= numChoices.length; x++) {
  //       if ($(`#ch${z}-star${x}`).prop("checked")) {
  //         checkedChoice = true;
  //       }
  //     }
  //     if (checkedChoice === false) {
  //       $("#check-rank-form").append(`<p class="rank-ch">Please, rank Choice #${z}!</p>`);
  //       $(".alert, .alert-danger").slideDown("slow");
  //     }
  //     checkedChoice = false;
  //   }
  // });

  
     
      
      // $.ajax(
      //   '/render/voteSubmission',
      //   {method: 'POST',
      //   data: { serialized,
      //   shortUrl,
      //   }
      // })
  });

  $("#formData").on("click", function() {
    $(".alert, .alert-danger").slideUp("slow", function(){
      $(".rank-ch").remove();
    });
    $("input").removeClass("redd");
  });
       

});
